import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';

export default function MenuScreen() {
  const router = useRouter();
  const gems = useGameStore((state) => state.gems);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/PrismFlowLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Bend light. Solve puzzles.</Text>
        </View>

        <View style={styles.gemsBar}>
          <Text style={styles.gemsText}>💎 {gems}</Text>
        </View>

        <View style={styles.menuButtons}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/world-select')}
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/shop')}
          >
            <Text style={styles.buttonText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/leaderboard')}
          >
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/how-to-play')}
          >
            <Text style={styles.buttonText}>How to Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Created by{' '}
            <Text style={styles.link}>CoinRise</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  tagline: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 1
  },
  gemsBar: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  gemsText: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: '600'
  },
  menuButtons: {
    width: '100%',
    maxWidth: 300,
    gap: 15
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButton: {
    backgroundColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  secondaryButton: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.5)'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  footer: {
    marginTop: 40,
    alignItems: 'center'
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14
  },
  link: {
    color: '#00d4ff',
    fontWeight: '600'
  }
});
