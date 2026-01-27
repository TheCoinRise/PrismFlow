import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';
import { GameBoard } from '../src/components/GameBoard';
import { InventoryBar } from '../src/components/InventoryBar';
import { useEffect } from 'react';
import { LightEngine } from '../src/utils/lightEngine';

export default function GameScreen() {
  const router = useRouter();
  const currentLevel = useGameStore((state) => state.currentLevel);
  const moveCount = useGameStore((state) => state.moveCount);
  const placedPieces = useGameStore((state) => state.placedPieces);
  const setLightBeams = useGameStore((state) => state.setLightBeams);
  const setTargetStates = useGameStore((state) => state.setTargetStates);
  const resetLevel = useGameStore((state) => state.resetLevel);
  const completeLevel = useGameStore((state) => state.completeLevel);

  useEffect(() => {
    if (!currentLevel) {
      router.replace('/menu');
      return;
    }

    // Calculate light beams and target states
    const result = LightEngine.calculate(currentLevel, placedPieces);
    setLightBeams(result.beams);
    setTargetStates(result.targetStates);

    // Check if level is complete
    const allSatisfied = Object.values(result.targetStates).every(
      state => state.satisfied
    );
    if (allSatisfied && Object.keys(placedPieces).length > 0) {
      completeLevel(moveCount);
      // Show completion screen
      setTimeout(() => {
        router.replace('/level-select');
      }, 2000);
    }
  }, [currentLevel, placedPieces, moveCount]);

  if (!currentLevel) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.levelName}>{currentLevel.name}</Text>
          <Text style={styles.moveCount}>Moves: {moveCount}</Text>
        </View>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetLevel}
        >
          <Text style={styles.resetButtonText}>↻</Text>
        </TouchableOpacity>
      </View>

      <GameBoard level={currentLevel} />

      <InventoryBar />
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  backButton: {
    padding: 8
  },
  backButtonText: {
    color: '#00d4ff',
    fontSize: 24,
    fontWeight: '600'
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center'
  },
  levelName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  moveCount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  },
  resetButton: {
    padding: 8
  },
  resetButtonText: {
    color: '#ff6b35',
    fontSize: 24,
    fontWeight: '600'
  }
});
