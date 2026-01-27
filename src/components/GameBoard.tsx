import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { Level, Position } from '../types/game';
import { GameCell } from './GameCell';

interface GameBoardProps {
  level: Level;
}

export function GameBoard({ level }: GameBoardProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const placedPieces = useGameStore((state) => state.placedPieces);
  const selectedPiece = useGameStore((state) => state.selectedPiece);
  const placePiece = useGameStore((state) => state.placePiece);
  const removePiece = useGameStore((state) => state.removePiece);
  const rotatePiece = useGameStore((state) => state.rotatePiece);

  // Calculate cell size based on available space
  // Reserve space for header (~100px) and inventory bar (~100px)
  const availableHeight = screenHeight - 200;
  const availableWidth = screenWidth - 40; // padding
  
  const maxCellWidth = availableWidth / level.gridSize.width;
  const maxCellHeight = availableHeight / level.gridSize.height;
  const cellSize = Math.min(maxCellWidth, maxCellHeight, 60); // Max 60px per cell

  const handleCellPress = (position: Position) => {
    const key = `${position.x},${position.y}`;
    const existingPiece = placedPieces[key];
    
    if (existingPiece) {
      // Rotate existing piece
      rotatePiece(position);
    } else if (selectedPiece) {
      // Place new piece
      placePiece(position, selectedPiece);
    }
    // If no piece selected, do nothing (user needs to select from inventory first)
  };

  const handleCellLongPress = (position: Position) => {
    removePiece(position);
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.grid,
        {
          width: cellSize * level.gridSize.width,
          height: cellSize * level.gridSize.height
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
                cellSize={cellSize}
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
    borderColor: 'rgba(0, 212, 255, 0.3)',
    overflow: 'hidden'
  }
});
