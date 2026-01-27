import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const loadProgress = useGameStore((state) => state.loadProgress);

  useEffect(() => {
    const initialize = async () => {
      await loadProgress();
      // Simulate splash screen delay
      setTimeout(() => {
        router.replace('/menu');
      }, 2000);
    };
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/PrismFlowLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200
  }
});
