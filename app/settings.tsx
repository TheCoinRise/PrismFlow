import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const settings = useGameStore((state) => state.settings);
  const gems = useGameStore((state) => state.gems);
  const progress = useGameStore((state) => state.progress);
  const completedLevels = useGameStore((state) => state.completedLevels);
  const updateSettings = useGameStore((state) => state.updateSettings);
  const [username, setUsername] = useState(settings.username);

  // Calculate stats
  const totalStars = Object.values(progress).reduce((sum, p) => sum + (p.stars || 0), 0);
  const completedCount = completedLevels.size;

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    updateSettings({ username: text });
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset All Progress',
      'Are you sure you want to reset all progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('prismflow_save');
                // Reset store
                useGameStore.setState({
                  progress: {},
                  gems: 0,
                  completedLevels: new Set(),
                  moveCount: 0,
                  placedPieces: {},
                  lightBeams: [],
                  targetStates: {},
                  inventory: [],
                  selectedPiece: null,
                  currentLevel: null,
                  currentWorld: null
                });
                Alert.alert('Success', 'All progress has been reset.');
              } catch (error) {
                Alert.alert('Error', 'Failed to reset progress.');
              }
            }
        }
      ]
    );
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Username Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
            placeholder="Enter your username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            maxLength={20}
          />
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Gems</Text>
              <Text style={styles.progressValue}>💎 {gems}</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Levels</Text>
              <Text style={styles.progressValue}>{completedCount} / 80</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Stars</Text>
              <Text style={styles.progressValue}>⭐ {totalStars}</Text>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: '#767577', true: '#00d4ff' }}
              thumbColor={settings.soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={settings.vibrationEnabled}
              onValueChange={(value) => updateSettings({ vibrationEnabled: value })}
              trackColor={{ false: '#767577', true: '#00d4ff' }}
              thumbColor={settings.vibrationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetProgress}
          >
            <Text style={styles.resetButtonText}>Reset All Progress</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>Version 3.0</Text>
          <View style={styles.linkRow}>
            <Text style={styles.aboutText}>Created by </Text>
            <TouchableOpacity onPress={() => openLink('https://x.com/thecoinrise')}>
              <Text style={styles.link}>CoinRise</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkRow}>
            <Text style={styles.aboutText}>Built with </Text>
            <TouchableOpacity onPress={() => openLink('https://factoryapp.dev')}>
              <Text style={styles.link}>App Factory</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f'
  },
  header: {
    paddingVertical: 15,
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
    padding: 20,
    gap: 15
  },
  sectionTitle: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  progressItem: {
    alignItems: 'center',
    gap: 8
  },
  progressLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  },
  progressValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  resetButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.5)',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center'
  },
  resetButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600'
  },
  aboutText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  link: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});
