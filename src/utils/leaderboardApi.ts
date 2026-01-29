import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.leaderboardApiUrl || 'https://your-leaderboard-api.com';

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

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Submit a score when a level is completed
   */
  async submitScore(data: SubmitScoreData): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit score: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      // Silently fail - don't block gameplay if leaderboard is down
    }
  }

  /**
   * Get the global leaderboard (top N players)
   */
  async getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/leaderboard?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
      }

      const data = await response.json();
      return data.entries || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  /**
   * Get a specific user's rank and stats
   */
  async getUserRank(username: string): Promise<LeaderboardEntry | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/leaderboard/user/${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // User not found
        }
        throw new Error(`Failed to fetch user rank: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user rank:', error);
      return null;
    }
  }
}

export const leaderboardAPI = new LeaderboardAPI();
