import { View, Text, StyleSheet } from 'react-native';
import { PieceType } from '../types/game';

interface PieceIconProps {
  type: PieceType;
  size?: number;
}

export function PieceIcon({ type, size = 40 }: PieceIconProps) {
  const getIcon = () => {
    switch (type) {
      case PieceType.MIRROR_FORWARD:
        return '/';
      case PieceType.MIRROR_BACKWARD:
        return '\\';
      case PieceType.PRISM:
        return '◊';
      case PieceType.COMBINER:
        return '⊕';
      case PieceType.FILTER_RED:
        return 'R';
      case PieceType.FILTER_GREEN:
        return 'G';
      case PieceType.FILTER_BLUE:
        return 'B';
      case PieceType.SPLITTER:
        return '⚡';
      case PieceType.TELEPORTER:
        return '🌀';
      default:
        return '?';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { fontSize: size }]}>{getIcon()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: '#fff',
    fontWeight: '700'
  }
});
