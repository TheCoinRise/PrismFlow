import { World } from '../types/game';

export const WORLDS: World[] = [
  {
    id: 1,
    name: 'Reflection',
    subtitle: 'Master the mirrors',
    icon: '🔺',
    color: '#6366f1',
    locked: false
  },
  {
    id: 2,
    name: 'Spectrum',
    subtitle: 'Split the light',
    icon: '🌈',
    color: '#22c55e',
    locked: false
  },
  {
    id: 3,
    name: 'Filter',
    subtitle: 'Control wavelengths',
    icon: '🎨',
    color: '#f59e0b',
    locked: false
  },
  {
    id: 4,
    name: 'Splitter',
    subtitle: 'Divide and conquer',
    icon: '⚡',
    color: '#3bffff',
    locked: false
  },
  {
    id: 5,
    name: 'Teleport',
    subtitle: 'Warp through space',
    icon: '🌀',
    color: '#ff3bff',
    locked: false
  },
  {
    id: 6,
    name: 'Mastery',
    subtitle: 'Combine all elements',
    icon: '⭐',
    color: '#ff6b35',
    locked: false
  },
  {
    id: 7,
    name: 'Challenge',
    subtitle: 'Test your skills',
    icon: '🔥',
    color: '#8b5cf6',
    locked: false
  },
  {
    id: 8,
    name: 'Expert',
    subtitle: 'Ultimate puzzles',
    icon: '💎',
    color: '#ec4899',
    locked: false
  }
];

export const getWorldById = (id: number): World | undefined => {
  return WORLDS.find(w => w.id === id);
};
