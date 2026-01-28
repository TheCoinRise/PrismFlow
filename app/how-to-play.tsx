import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PieceIcon } from '../src/components/PieceIcon';
import { PieceType } from '../src/types/game';

export default function HowToPlayScreen() {
  const router = useRouter();

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
        <Text style={styles.title}>How to Play</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal</Text>
          <Text style={styles.sectionText}>
            Guide colored light beams from sources to targets. All targets must receive the correct color to complete the level.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          <Text style={styles.sectionText}>
            • Tap empty cell: Place selected piece{'\n'}
            • Tap placed piece: Rotate it{'\n'}
            • Long press: Remove piece{'\n'}
            • Tap inventory: Select piece to place
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pieces</Text>
          <View style={styles.piecesList}>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.MIRROR_FORWARD} size={30} />
              <Text style={styles.pieceText}>Mirror (/): Reflects light</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.MIRROR_BACKWARD} size={30} />
              <Text style={styles.pieceText}>Mirror (\): Reflects light</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.PRISM} size={30} />
              <Text style={styles.pieceText}>Prism: Splits white into RGB</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.COMBINER} size={30} />
              <Text style={styles.pieceText}>Combiner: Merges colors</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.FILTER_RED} size={30} />
              <Text style={styles.pieceText}>Filter (R): Only red passes</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.FILTER_GREEN} size={30} />
              <Text style={styles.pieceText}>Filter (G): Only green passes</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.FILTER_BLUE} size={30} />
              <Text style={styles.pieceText}>Filter (B): Only blue passes</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.SPLITTER} size={30} />
              <Text style={styles.pieceText}>Splitter: Splits beam into two</Text>
            </View>
            <View style={styles.pieceItem}>
              <PieceIcon type={PieceType.TELEPORTER} size={30} />
              <Text style={styles.pieceText}>Teleporter: Warps light to paired teleporter</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Mixing</Text>
          <Text style={styles.sectionText}>
            • Red + Green = Yellow{'\n'}
            • Red + Blue = Magenta{'\n'}
            • Green + Blue = Cyan{'\n'}
            • Red + Green + Blue = White
          </Text>
        </View>
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
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700'
  },
  content: {
    padding: 20,
    gap: 25
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20
  },
  sectionTitle: {
    color: '#00d4ff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24
  },
  piecesList: {
    gap: 12
  },
  pieceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 8
  },
  pieceText: {
    color: '#fff',
    fontSize: 16,
    flex: 1
  }
});
