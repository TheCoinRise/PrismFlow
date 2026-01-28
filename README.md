# PrismFlow - Build with <a href="https://factoryapp.dev">App $Factory</a> by <a href="https://x.com/thecoinrise">CoinRise</a>

A React Native mobile app port of the PrismFlow web game - a light-bending puzzle game for iOS and Android.

## Overview

PrismFlow Mobile is a complete port of the web version with all 80 levels across 8 worlds. Guide colored light beams through mirrors, prisms, filters, and other optical elements to solve puzzles.

## Features

- ✅ All 80 levels from web version
- ✅ 8 worlds with unique themes
- ✅ Complete game mechanics (mirrors, prisms, filters, splitters, teleporters, combiners)
- ✅ Light engine with real-time beam calculation
- ✅ Progress tracking and gem system
- ✅ Shop for themes
- ✅ Local leaderboard
- ✅ Settings and preferences
- ✅ Touch-optimized controls

## Tech Stack

- **Framework**: Expo SDK 54
- **Navigation**: Expo Router v6
- **State Management**: Zustand
- **Storage**: AsyncStorage
- **Platforms**: iOS & Android

## Getting Started

### Installation

```bash
cd app-factory/builds/prismflow-mobile
npm install
```

### Running

```bash
# Start Expo dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
prismflow-mobile/
├── app/                    # Expo Router screens
│   ├── index.tsx          # Splash screen
│   ├── menu.tsx           # Main menu
│   ├── world-select.tsx   # World selection
│   ├── level-select.tsx   # Level selection
│   ├── game.tsx           # Gameplay screen
│   ├── shop.tsx           # Theme shop
│   ├── leaderboard.tsx    # Leaderboard
│   ├── settings.tsx       # Settings
│   └── how-to-play.tsx    # Tutorial
├── src/
│   ├── components/         # Game components
│   │   ├── GameBoard.tsx  # Main game board
│   │   ├── InventoryBar.tsx # Piece inventory
│   │   ├── GameCell.tsx   # Grid cell component
│   │   └── Piece.tsx      # Piece component
│   ├── data/
│   │   ├── worlds.ts      # World definitions
│   │   └── levels.ts      # All 80 level definitions
│   ├── store/
│   │   └── gameStore.ts   # Zustand game state
│   ├── types/
│   │   └── game.ts        # TypeScript types
│   └── utils/
│       ├── colorMixer.ts  # Color mixing logic
│       └── lightEngine.ts # Light beam calculation
├── assets/                 # Images, icons
└── package.json
```

## Game Mechanics

### Pieces

- **Mirrors** (`/` and `\`): Reflect light beams
- **Prism**: Splits white light into RGB
- **Combiner**: Merges multiple colors
- **Filters** (R/G/B): Only allow specific colors through
- **Splitter**: Divides beam into two perpendicular beams
- **Teleporter**: Warps light to paired teleporter

### Controls

- **Tap empty cell**: Place selected piece
- **Tap placed piece**: Rotate piece
- **Long press**: Remove piece
- **Tap inventory**: Select piece to place

## Development Status

### Completed ✅
- Core game types and utilities
- Light engine calculation
- Color mixer
- Game state management
- Menu and world selection screens
- Basic game screen structure

### In Progress 🚧
- GameBoard component rendering
- InventoryBar component
- Piece rendering and animations
- Light beam visualization
- All 80 levels (currently placeholder)

### To Do 📋
- Complete level data port (all 80 levels)
- Level select screen
- Shop screen
- Leaderboard screen
- Settings screen
- How to play screen
- Asset optimization
- Sound effects
- Haptic feedback

## Notes

- This is a port from the web version in `app-factory/builds/prismflow-web/`
- All game logic and levels match the web version
- Uses local storage for progress (no backend required)
- Leaderboard is local-only (can be extended to cloud)

## License

MIT
