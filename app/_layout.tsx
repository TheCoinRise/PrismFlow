import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useGameStore } from '../src/store/gameStore';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme } from '@react-navigation/native';

export default function RootLayout() {
  const loadProgress = useGameStore((state) => state.loadProgress);

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0a0a0f' },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="world-select" />
        <Stack.Screen name="level-select" />
        <Stack.Screen name="game" />
        <Stack.Screen name="shop" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="how-to-play" />
      </Stack>
    </>
  );
}
