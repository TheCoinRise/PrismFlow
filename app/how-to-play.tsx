import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

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
          <Text style={styles.sectionText}>
            • Mirror (/): Reflects light{'\n'}
            • Mirror (\\): Reflects light{'\n'}
            • Prism: Splits white into RGB{'\n'}
            • Combiner: Merges colors{'\n'}
            • Filter (R/G/B): Only that color passes{'\n'}
            • Splitter: Splits beam into two{'\n'}
            • Teleporter: Warps light to paired teleporter
          </Text>
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
  }
});
