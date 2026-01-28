export type ThemeId = 'default' | 'neon' | 'sunset' | 'void';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  price: number; // in gems
  colors: {
    background: string;
    card: string;
    accent: string;
    accentSecondary: string;
    text: string;
    mutedText: string;
    danger: string;
  };
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  default: {
    id: 'default',
    name: 'Prism Classic',
    description: 'Deep space with cyan accents',
    price: 0,
    colors: {
      background: '#0a0a0f',
      card: 'rgba(255, 255, 255, 0.05)',
      accent: '#00d4ff',
      accentSecondary: 'rgba(124, 58, 237, 0.5)',
      text: '#ffffff',
      mutedText: 'rgba(255, 255, 255, 0.6)',
      danger: '#ff3b30'
    }
  },
  neon: {
    id: 'neon',
    name: 'Neon Grid',
    description: 'Electric teal and magenta glow',
    price: 150,
    colors: {
      background: '#020617',
      card: 'rgba(15, 118, 110, 0.28)',
      accent: '#22d3ee',
      accentSecondary: '#e879f9',
      text: '#f9fafb',
      mutedText: 'rgba(148, 163, 184, 0.9)',
      danger: '#fb7185'
    }
  },
  sunset: {
    id: 'sunset',
    name: 'Solar Flare',
    description: 'Warm oranges and deep purples',
    price: 150,
    colors: {
      background: '#1f172a',
      card: 'rgba(251, 113, 133, 0.22)',
      accent: '#fb923c',
      accentSecondary: '#6366f1',
      text: '#fefce8',
      mutedText: 'rgba(253, 224, 171, 0.9)',
      danger: '#f97316'
    }
  },
  void: {
    id: 'void',
    name: 'Event Horizon',
    description: 'Near-black with subtle violet',
    price: 200,
    colors: {
      background: '#02010a',
      card: 'rgba(76, 29, 149, 0.3)',
      accent: '#a855f7',
      accentSecondary: '#22c55e',
      text: '#f9fafb',
      mutedText: 'rgba(148, 163, 184, 0.9)',
      danger: '#ef4444'
    }
  }
};

export function getThemeColors(themeId: ThemeId) {
  return THEMES[themeId]?.colors ?? THEMES.default.colors;
}

