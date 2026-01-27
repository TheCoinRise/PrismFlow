import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { PieceType, Piece } from '../types/game';
import { PieceIcon } from './PieceIcon';

export function InventoryBar() {
  const inventory = useGameStore((state) => state.inventory);
  const selectedPiece = useGameStore((state) => state.selectedPiece);
  const setSelectedPiece = useGameStore((state) => state.setSelectedPiece);

  const handlePieceSelect = (type: PieceType) => {
    const invItem = inventory.find(i => i.type === type);
    if (invItem && invItem.count > 0) {
      setSelectedPiece({ type, rotation: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Inventory</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {inventory.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[
              styles.pieceButton,
              selectedPiece?.type === item.type && styles.selectedPiece
            ]}
            onPress={() => handlePieceSelect(item.type)}
            disabled={item.count === 0}
          >
            <PieceIcon type={item.type} size={40} />
            <Text style={styles.count}>{item.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 212, 255, 0.2)'
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10
  },
  scrollContent: {
    gap: 10
  },
  pieceButton: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  selectedPiece: {
    borderColor: '#00d4ff',
    backgroundColor: 'rgba(0, 212, 255, 0.2)'
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  }
});
