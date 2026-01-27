import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { getLevelsByWorld } from '../src/data/levels';
import { StatusBar } from 'expo-status-bar';

export default function LevelSelectScreen() {
  const router = useRouter();
  const currentWorld = useGameStore((state) => state.currentWorld);
  const setCurrentLevel = useGameStore((state) => state.setCurrentLevel);
  const progress = useGameStore((state) => state.progress);

  if (!currentWorld) {
    router.replace('/world-select');
    return null;
  }

  const levels = getLevelsByWorld(currentWorld.id);

  const handleLevelSelect = (level: typeof levels[0]) => {
    setCurrentLevel(level);
    router.push('/game');
  };

  const getLevelStatus = (levelId: string) => {
    const levelProgress = progress[levelId];
    if (!levelProgress) return { completed: false, stars: 0 };
    return {
      completed: levelProgress.completed,
      stars: levelProgress.stars || 0
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.worldName}>{currentWorld.name}</Text>
          <Text style={styles.worldSubtitle}>{currentWorld.subtitle}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.levelsContainer}
        showsVerticalScrollIndicator={false}
      >
        {levels.map((level) => {
          const status = getLevelStatus(level.id);
          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                status.completed && styles.completedCard
              ]}
              onPress={() => handleLevelSelect(level)}
            >
              <View style={styles.levelInfo}>
                <Text style={styles.levelNumber}>Level {level.levelNumber}</Text>
                <Text style={styles.levelName}>{level.name}</Text>
                <Text style={styles.levelPar}>Par: {level.parMoves}</Text>
              </View>
              {status.completed && (
                <View style={styles.starsContainer}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.star,
                        i < status.stars && styles.starFilled
                      ]}
                    >
                      ⭐
                    </Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f'
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  backButton: {
    padding: 8
  },
  backButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '600'
  },
  headerInfo: {
    flex: 1
  },
  worldName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4
  },
  worldSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  },
  levelsContainer: {
    padding: 20,
    gap: 15
  },
  levelCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  completedCard: {
    borderColor: 'rgba(0, 212, 255, 0.5)'
  },
  levelInfo: {
    flex: 1
  },
  levelNumber: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4
  },
  levelName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  levelPar: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4
  },
  star: {
    fontSize: 20,
    opacity: 0.3
  },
  starFilled: {
    opacity: 1
  }
});
