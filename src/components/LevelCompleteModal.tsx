import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Level } from '../types/game';

interface LevelCompleteModalProps {
  visible: boolean;
  level: Level | null;
  moveCount: number;
  stars: number;
  onNext: () => void;
  onMenu: () => void;
}

export function LevelCompleteModal({
  visible,
  level,
  moveCount,
  stars,
  onNext,
  onMenu
}: LevelCompleteModalProps) {
  if (!level) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Level Complete!</Text>
          <Text style={styles.levelName}>{level.name}</Text>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Moves</Text>
              <Text style={styles.statValue}>{moveCount}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Par</Text>
              <Text style={styles.statValue}>{level.parMoves}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Stars</Text>
              <View style={styles.starsContainer}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.star,
                      i < stars && styles.starFilled
                    ]}
                  >
                    ⭐
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={onMenu}
            >
              <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={onNext}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Next Level</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modal: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#00d4ff'
  },
  title: {
    color: '#00d4ff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10
  },
  levelName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  stat: {
    alignItems: 'center',
    gap: 8
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4
  },
  star: {
    fontSize: 24,
    opacity: 0.3
  },
  starFilled: {
    opacity: 1
  },
  buttons: {
    flexDirection: 'row',
    gap: 15
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: '#00d4ff'
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  primaryButtonText: {
    color: '#000'
  }
});
