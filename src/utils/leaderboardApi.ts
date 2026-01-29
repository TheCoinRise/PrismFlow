import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.leaderboardApiUrl || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey || '';

export interface LeaderboardEntry {
  id?: string;
  username: string;
  totalStars: number;
  totalGems: number;
  completedLevels: number;
  bestMoveCount?: number;
  lastUpdated?: string;
  rank?: number;
}

export interface SubmitScoreData {
  username: string;
  levelId: string;
  moveCount: number;
  stars: number;
  gemsEarned: number;
}

class LeaderboardAPI {
  private baseUrl: string;
  private anonKey: string;

  constructor() {
    this.baseUrl = SUPABASE_URL;
    this.anonKey = SUPABASE_ANON_KEY;
  }

  /**
   * Submit a score when a level is completed
   * Uses Supabase RPC function: submit_score()
   */
  async submitScore(data: SubmitScoreData): Promise<void> {
    if (!this.baseUrl || this.baseUrl.includes('your-project')) {
      console.warn('Leaderboard API not configured. Skipping score submission.');
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/rest/v1/rpc/submit_score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.anonKey,
          'Authorization': `Bearer ${this.anonKey}`,
        },
        body: JSON.stringify({
          p_username: data.username,
          p_level_id: data.levelId,
          p_move_count: data.moveCount,
          p_stars: data.stars,
          p_gems_earned: data.gemsEarned,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit score: ${response.statusText} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      // Silently fail - don't block gameplay if leaderboard is down
    }
  }

  /**
   * Get the global leaderboard (top N players)
   * Uses Supabase REST API with ordering and limit
   */
  async getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    if (!this.baseUrl || this.baseUrl.includes('your-project')) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/rest/v1/leaderboard?select=*&order=total_stars.desc,completed_levels.desc&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
      }

      const entries: any[] = await response.json();
      
      // Map Supabase column names (snake_case) to our interface (camelCase) and add ranks
      return entries.map((entry, index) => ({
        id: entry.id,
        username: entry.username,
        totalStars: entry.total_stars || 0,
        totalGems: entry.total_gems || 0,
        completedLevels: entry.completed_levels || 0,
        bestMoveCount: entry.best_move_count,
        lastUpdated: entry.last_updated,
        rank: index + 1,
      }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  /**
   * Get a specific user's rank and stats
   * Uses Supabase REST API with username filter
   */
  async getUserRank(username: string): Promise<LeaderboardEntry | null> {
    if (!this.baseUrl || this.baseUrl.includes('your-project')) {
      return null;
    }

    try {
      // First, get the user's entry
      const userResponse = await fetch(
        `${this.baseUrl}/rest/v1/leaderboard?username=eq.${encodeURIComponent(username)}&select=*`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
      }

      const userEntries: any[] = await userResponse.json();
      if (userEntries.length === 0) {
        return null; // User not found
      }

      const userEntry = userEntries[0];

      // Get their rank by fetching all users and finding position
      // (Simpler approach - for better performance with many users, use a database function)
      const allUsersResponse = await fetch(
        `${this.baseUrl}/rest/v1/leaderboard?select=username,total_stars&order=total_stars.desc,completed_levels.desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`,
          },
        }
      );

      if (!allUsersResponse.ok) {
        // If we can't get rank, just return user data without rank
        return {
          id: userEntry.id,
          username: userEntry.username,
          totalStars: userEntry.total_stars || 0,
          totalGems: userEntry.total_gems || 0,
          completedLevels: userEntry.completed_levels || 0,
          bestMoveCount: userEntry.best_move_count,
          lastUpdated: userEntry.last_updated,
        };
      }

      const allUsers: any[] = await allUsersResponse.json();
      const rank = allUsers.findIndex(u => u.username === username) + 1;

      return {
        id: userEntry.id,
        username: userEntry.username,
        totalStars: userEntry.total_stars || 0,
        totalGems: userEntry.total_gems || 0,
        completedLevels: userEntry.completed_levels || 0,
        bestMoveCount: userEntry.best_move_count,
        lastUpdated: userEntry.last_updated,
        rank,
      };
    } catch (error) {
      console.error('Error fetching user rank:', error);
      return null;
    }
  }
}

export const leaderboardAPI = new LeaderboardAPI();
