import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '../src/store/gameStore';
import { leaderboardAPI, LeaderboardEntry } from '../src/utils/leaderboardApi';
import { useState, useEffect } from 'react';
import { getThemeColors } from '../src/utils/themes';

export default function LeaderboardScreen() {
  const router = useRouter();
  const username = useGameStore((state) => state.settings.username);
  const currentTheme = useGameStore((state) => state.currentTheme);
  const colors = getThemeColors(currentTheme);
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLeaderboard = async () => {
    try {
      const [entries, rank] = await Promise.all([
        leaderboardAPI.getLeaderboard(100),
        username ? leaderboardAPI.getUserRank(username) : Promise.resolve(null)
      ]);
      setLeaderboard(entries);
      setUserRank(rank);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, [username]);

  const onRefresh = () => {
    setRefreshing(true);
    loadLeaderboard();
  };

  const renderRankIcon = (rank: number | undefined) => {
    if (!rank) return null;
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.accent }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Global Leaderboard</Text>
      </View>

      {!username && (
        <View style={[styles.warningBox, { backgroundColor: colors.highlight + '20' }]}>
          <Text style={[styles.warningText, { color: colors.text }]}>
            Set a username in Settings to appear on the leaderboard
          </Text>
        </View>
      )}

      {userRank && (
        <View style={[styles.userRankBox, { backgroundColor: colors.accent + '20', borderColor: colors.accent }]}>
          <Text style={[styles.userRankLabel, { color: colors.accent }]}>Your Rank</Text>
          <View style={styles.userRankInfo}>
            <Text style={[styles.userRankText, { color: colors.text }]}>
              {renderRankIcon(userRank.rank)} {userRank.username}
            </Text>
            <Text style={[styles.userRankStats, { color: colors.text + 'CC' }]}>
              ⭐ {userRank.totalStars} • 💎 {userRank.totalGems} • {userRank.completedLevels}/80 levels
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.accent} style={styles.loader} />
        ) : leaderboard.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text + '80' }]}>
              No scores yet. Be the first to complete a level!
            </Text>
          </View>
        ) : (
          <>
            {leaderboard.map((entry, index) => {
              const isCurrentUser = entry.username === username;
              return (
                <View
                  key={entry.id || index}
                  style={[
                    styles.entry,
                    {
                      backgroundColor: isCurrentUser
                        ? colors.accent + '30'
                        : colors.highlight + '10',
                      borderLeftColor: colors.accent,
                      borderLeftWidth: isCurrentUser ? 3 : 0,
                    },
                  ]}
                >
                  <View style={styles.rankColumn}>
                    <Text style={[styles.rankText, { color: colors.accent }]}>
                      {renderRankIcon(entry.rank) || `#${index + 1}`}
                    </Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={[styles.usernameText, { color: colors.text }]}>
                      {entry.username}
                      {isCurrentUser && ' (You)'}
                    </Text>
                    <View style={styles.statsRow}>
                      <Text style={[styles.statText, { color: colors.text + 'CC' }]}>
                        ⭐ {entry.totalStars}
                      </Text>
                      <Text style={[styles.statText, { color: colors.text + 'CC' }]}>
                        💎 {entry.totalGems}
                      </Text>
                      <Text style={[styles.statText, { color: colors.text + 'CC' }]}>
                        {entry.completedLevels}/80
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  warningBox: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 14,
    textAlign: 'center',
  },
  userRankBox: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
  },
  userRankLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userRankInfo: {
    gap: 4,
  },
  userRankText: {
    fontSize: 18,
    fontWeight: '700',
  },
  userRankStats: {
    fontSize: 14,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  entry: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  rankColumn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoColumn: {
    flex: 1,
    gap: 6,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  statText: {
    fontSize: 14,
  },
});
