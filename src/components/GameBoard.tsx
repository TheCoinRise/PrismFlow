import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { Level, Position } from '../types/game';
import { GameCell } from './GameCell';

interface GameBoardProps {
  level: Level;
}

export function GameBoard({ level }: GameBoardProps) {
  const placedPieces = useGameStore((state) => state.placedPieces);
  const selectedPiece = useGameStore((state) => state.selectedPiece);
  const placePiece = useGameStore((state) => state.placePiece);
  const removePiece = useGameStore((state) => state.removePiece);
  const rotatePiece = useGameStore((state) => state.rotatePiece);

  const cellSize = Math.min(
    (100 / level.gridSize.width) * 0.9,
    (100 / level.gridSize.height) * 0.9
  );

  const handleCellPress = (position: Position) => {
    if (!selectedPiece) return;
    
    const key = `${position.x},${position.y}`;
    const existingPiece = placedPieces[key];
    
    if (existingPiece) {
      rotatePiece(position);
    } else {
      placePiece(position, selectedPiece);
    }
  };

  const handleCellLongPress = (position: Position) => {
    removePiece(position);
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.grid,
        {
          width: `${cellSize * level.gridSize.width}%`,
          height: `${cellSize * level.gridSize.height}%`,
          aspectRatio: level.gridSize.width / level.gridSize.height
        }
      ]}>
        {Array.from({ length: level.gridSize.height }).map((_, row) =>
          Array.from({ length: level.gridSize.width }).map((_, col) => {
            const position: Position = { x: col, y: row };
            const key = `${col},${row}`;
            const piece = placedPieces[key];
            const isLocked = level.lockedCells.some(
              c => c.x === col && c.y === row
            );
            const source = level.sources.find(
              s => s.position.x === col && s.position.y === row
            );
            const target = level.targets.find(
              t => t.position.x === col && t.position.y === row
            );

            return (
              <GameCell
                key={key}
                position={position}
                piece={piece}
                isLocked={isLocked}
                source={source}
                target={target}
                onPress={handleCellPress}
                onLongPress={handleCellLongPress}
              />
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  }
});
