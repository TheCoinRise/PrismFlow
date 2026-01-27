import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Position, Piece, Source, Target } from '../types/game';
import { PieceIcon } from './PieceIcon';

interface GameCellProps {
  position: Position;
  piece?: Piece;
  isLocked: boolean;
  source?: Source;
  target?: Target;
  onPress: (position: Position) => void;
  onLongPress: (position: Position) => void;
}

export function GameCell({
  position,
  piece,
  isLocked,
  source,
  target,
  onPress,
  onLongPress
}: GameCellProps) {
  const handlePress = () => {
    onPress(position);
  };

  const handleLongPress = () => {
    onLongPress(position);
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isLocked && styles.lockedCell,
        source && styles.sourceCell,
        target && styles.targetCell
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={isLocked && !piece}
    >
      {source && (
        <View style={[
          styles.sourceIndicator,
          { backgroundColor: `rgb(${source.color.r}, ${source.color.g}, ${source.color.b})` }
        ]}>
          <Text style={styles.directionArrow}>
            {source.direction === 'up' ? '↑' :
             source.direction === 'down' ? '↓' :
             source.direction === 'left' ? '←' : '→'}
          </Text>
        </View>
      )}
      
      {target && (
        <View style={styles.targetIndicator}>
          <View style={[
            styles.targetColor,
            { backgroundColor: `rgb(${target.requiredColor.r}, ${target.requiredColor.g}, ${target.requiredColor.b})` }
          ]} />
        </View>
      )}
      
      {piece && (
        <View style={styles.pieceContainer}>
          <PieceIcon type={piece.type} size={30} />
        </View>
      )}
      
      {isLocked && !piece && (
        <View style={styles.lockedIndicator}>
          <Text style={styles.lockedText}>🔒</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  lockedCell: {
    backgroundColor: 'rgba(100, 100, 100, 0.2)'
  },
  sourceCell: {
    borderColor: 'rgba(0, 212, 255, 0.5)'
  },
  targetCell: {
    borderColor: 'rgba(255, 215, 0, 0.5)'
  },
  sourceIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionArrow: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700'
  },
  targetIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  targetColor: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  pieceContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockedIndicator: {
    position: 'absolute',
    top: 2,
    right: 2
  },
  lockedText: {
    fontSize: 12
  }
});
