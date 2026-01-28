import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameBoard } from '../src/components/GameBoard';
import { InventoryBar } from '../src/components/InventoryBar';
import { LevelCompleteModal } from '../src/components/LevelCompleteModal';
import { useEffect, useState } from 'react';
import { LightEngine } from '../src/utils/lightEngine';
import { getLevelById, getLevelsByWorld } from '../src/data/levels';

export default function GameScreen() {
  const router = useRouter();
  const currentLevel = useGameStore((state) => state.currentLevel);
  const currentWorld = useGameStore((state) => state.currentWorld);
  const moveCount = useGameStore((state) => state.moveCount);
  const placedPieces = useGameStore((state) => state.placedPieces);
  const progress = useGameStore((state) => state.progress);
  const setLightBeams = useGameStore((state) => state.setLightBeams);
  const setTargetStates = useGameStore((state) => state.setTargetStates);
  const resetLevel = useGameStore((state) => state.resetLevel);
  const completeLevel = useGameStore((state) => state.completeLevel);
  const setCurrentLevel = useGameStore((state) => state.setCurrentLevel);
  
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completedStars, setCompletedStars] = useState(0);

  useEffect(() => {
    if (!currentLevel) {
      router.replace('/menu');
      return;
    }

    // Calculate light beams and target states whenever pieces change
    try {
      const result = LightEngine.calculate(currentLevel, placedPieces);
      setLightBeams(result.beams || []);
      setTargetStates(result.targetStates || {});

      // Check if level is complete
      const targetIds = currentLevel.targets.map(t => t.id);
      const allSatisfied = targetIds.length > 0 && targetIds.every(
        id => result.targetStates[id]?.satisfied === true
      );
      
      if (allSatisfied && Object.keys(placedPieces).length > 0 && !showCompleteModal) {
        // Calculate stars
        const stars = moveCount <= currentLevel.parMoves ? 3 : 
                      moveCount <= currentLevel.parMoves * 1.5 ? 2 : 1;
        setCompletedStars(stars);
        completeLevel(moveCount);
        setShowCompleteModal(true);
      }
    } catch (error) {
      console.error('Light engine error:', error);
      setLightBeams([]);
      setTargetStates({});
    }
  }, [currentLevel, placedPieces, moveCount, showCompleteModal]);

  const handleNextLevel = () => {
    if (!currentLevel || !currentWorld) {
      router.replace('/level-select');
      return;
    }

    const levels = getLevelsByWorld(currentWorld.id);
    const currentIndex = levels.findIndex(l => l.id === currentLevel.id);
    
    if (currentIndex < levels.length - 1) {
      const nextLevel = levels[currentIndex + 1];
      setCurrentLevel(nextLevel);
      setShowCompleteModal(false);
    } else {
      // No more levels in this world
      router.replace('/level-select');
    }
  };

  const handleMenu = () => {
    setShowCompleteModal(false);
    router.replace('/menu');
  };

  if (!currentLevel) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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

      <View style={styles.gameArea}>
        <GameBoard level={currentLevel} />
      </View>

      <InventoryBar />

      <LevelCompleteModal
        visible={showCompleteModal}
        level={currentLevel}
        moveCount={moveCount}
        stars={completedStars}
        onNext={handleNextLevel}
        onMenu={handleMenu}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f'
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  gameArea: {
    flex: 1,
    minHeight: 0 // Important for flex children
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
