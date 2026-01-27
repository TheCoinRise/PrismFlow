import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { WORLDS } from '../src/data/worlds';
import { StatusBar } from 'expo-status-bar';

export default function WorldSelectScreen() {
  const router = useRouter();
  const setCurrentWorld = useGameStore((state) => state.setCurrentWorld);

  const handleWorldSelect = (world: typeof WORLDS[0]) => {
    setCurrentWorld(world);
    router.push('/level-select');
  };

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
        <Text style={styles.title}>Select World</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.worldsContainer}
        showsVerticalScrollIndicator={false}
      >
        {WORLDS.map((world) => (
          <TouchableOpacity
            key={world.id}
            style={[
              styles.worldCard,
              { borderColor: world.color }
            ]}
            onPress={() => handleWorldSelect(world)}
            disabled={world.locked}
          >
            <Text style={[styles.worldIcon, { color: world.color }]}>
              {world.icon}
            </Text>
            <View style={styles.worldInfo}>
              <Text style={styles.worldName}>{world.name}</Text>
              <Text style={styles.worldSubtitle}>{world.subtitle}</Text>
            </View>
            {world.locked && (
              <Text style={styles.lockedText}>🔒</Text>
            )}
          </TouchableOpacity>
        ))}
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
  worldsContainer: {
    padding: 20,
    gap: 15
  },
  worldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    gap: 15
  },
  worldIcon: {
    fontSize: 40,
    width: 60,
    textAlign: 'center'
  },
  worldInfo: {
    flex: 1
  },
  worldName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4
  },
  worldSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  },
  lockedText: {
    fontSize: 24
  }
});
