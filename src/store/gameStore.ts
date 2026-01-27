import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Level, Piece, Position, World } from '../types/game';

interface GameState {
  // Current game state
  currentScreen: 'menu' | 'worldSelect' | 'levelSelect' | 'game' | 'shop' | 'leaderboard' | 'settings' | 'howToPlay';
  currentWorld: World | null;
  currentLevel: Level | null;
  moveCount: number;
  selectedPiece: Piece | null;
  inventory: { type: Piece['type']; count: number }[];
  placedPieces: Record<string, Piece>;
  lightBeams: any[];
  targetStates: Record<string, any>;
  // Progress
  progress: Record<string, {
    completed: boolean;
    moveCount: number;
    bestMoveCount: number;
    stars: number;
  }>;
  gems: number;
  completedLevels: Set<string>;
  
  // Settings
  settings: {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    username: string;
  };
  
  // Themes
  currentTheme: string;
  unlockedThemes: string[];
  
  // Actions
  setScreen: (screen: GameState['currentScreen']) => void;
  setCurrentWorld: (world: World | null) => void;
  setCurrentLevel: (level: Level | null) => void;
  setSelectedPiece: (piece: Piece | null) => void;
  setInventory: (inventory: { type: Piece['type']; count: number }[]) => void;
  placePiece: (position: Position, piece: Piece) => void;
  removePiece: (position: Position) => void;
  rotatePiece: (position: Position) => void;
  resetLevel: () => void;
  completeLevel: (moveCount: number) => void;
  addGems: (amount: number) => void;
  updateSettings: (settings: Partial<GameState['settings']>) => void;
  unlockTheme: (themeId: string) => void;
  setTheme: (themeId: string) => void;
  setLightBeams: (beams: any[]) => void;
  setTargetStates: (states: Record<string, any>) => void;
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;
}

const STORAGE_KEY = 'prismflow_save';

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  currentScreen: 'menu',
  currentWorld: null,
  currentLevel: null,
  moveCount: 0,
  selectedPiece: null,
  inventory: [],
  placedPieces: {},
  lightBeams: [],
  targetStates: {},
  progress: {},
  gems: 0,
  completedLevels: new Set(),
  settings: {
    soundEnabled: true,
    vibrationEnabled: true,
    username: ''
  },
  currentTheme: 'default',
  unlockedThemes: ['default'],
  
  // Actions
  setScreen: (screen) => set({ currentScreen: screen }),
  
  setCurrentWorld: (world) => set({ currentWorld: world }),
  
  setCurrentLevel: (level) => {
    if (!level) {
      set({
        currentLevel: null,
        moveCount: 0,
        selectedPiece: null,
        inventory: [],
        placedPieces: {},
        lightBeams: [],
        targetStates: {}
      });
      return;
    }
    
    // Initialize inventory from level
    const inventory = level.availablePieces.map(ap => ({
      type: ap.type,
      count: ap.count
    }));
    
    // Initialize placed pieces from preplaced pieces
    const placedPieces: Record<string, Piece> = {};
    level.preplacedPieces.forEach(pp => {
      const key = `${pp.position.x},${pp.position.y}`;
      placedPieces[key] = pp.piece;
    });
    
    set({
      currentLevel: level,
      moveCount: 0,
      selectedPiece: null,
      inventory,
      placedPieces,
      lightBeams: [],
      targetStates: {}
    });
  },
  
  setSelectedPiece: (piece) => set({ selectedPiece: piece }),
  
  setInventory: (inventory) => set({ inventory }),
  
  placePiece: (position, piece) => {
    const { currentLevel, inventory, placedPieces, moveCount } = get();
    if (!currentLevel) return;
    
    const key = `${position.x},${position.y}`;
    
    // Check if cell is locked
    const isLocked = currentLevel.lockedCells.some(
      c => c.x === position.x && c.y === position.y
    );
    if (isLocked) return;
    
    // Check if already has a piece
    if (placedPieces[key]) {
      get().rotatePiece(position);
      return;
    }
    
    // Check inventory
    const invItem = inventory.find(i => i.type === piece.type);
    if (!invItem || invItem.count <= 0) return;
    
    // Place piece
    const newPlacedPieces = { ...placedPieces, [key]: piece };
    const newInventory = inventory.map(i =>
      i.type === piece.type ? { ...i, count: i.count - 1 } : i
    );
    
    set({
      placedPieces: newPlacedPieces,
      inventory: newInventory,
      moveCount: moveCount + 1
    });
  },
  
  removePiece: (position) => {
    const { placedPieces, inventory, currentLevel, moveCount } = get();
    if (!currentLevel) return;
    
    const key = `${position.x},${position.y}`;
    const piece = placedPieces[key];
    if (!piece) return;
    
    // Check if it's a preplaced piece
    const isPreplaced = currentLevel.preplacedPieces.some(
      pp => pp.position.x === position.x && pp.position.y === position.y
    );
    if (isPreplaced) return;
    
    // Remove piece and return to inventory
    const newPlacedPieces = { ...placedPieces };
    delete newPlacedPieces[key];
    
    const newInventory = inventory.map(i =>
      i.type === piece.type ? { ...i, count: i.count + 1 } : i
    );
    
    set({
      placedPieces: newPlacedPieces,
      inventory: newInventory,
      moveCount: moveCount + 1
    });
  },
  
  rotatePiece: (position) => {
    const { placedPieces, moveCount } = get();
    const key = `${position.x},${position.y}`;
    const piece = placedPieces[key];
    if (!piece) return;
    
    const newPiece = {
      ...piece,
      rotation: (piece.rotation + 1) % 4
    };
    
    set({
      placedPieces: { ...placedPieces, [key]: newPiece },
      moveCount: moveCount + 1
    });
  },
  
  resetLevel: () => {
    const { currentLevel } = get();
    if (!currentLevel) return;
    get().setCurrentLevel(currentLevel);
  },
  
  completeLevel: (moveCount) => {
    const { currentLevel, progress, gems, completedLevels } = get();
    if (!currentLevel) return;
    
    const levelId = currentLevel.id;
    const existing = progress[levelId];
    const stars = moveCount <= currentLevel.parMoves ? 3 : 
                  moveCount <= currentLevel.parMoves * 1.5 ? 2 : 1;
    
    const levelProgress = {
      completed: true,
      moveCount,
      bestMoveCount: existing ? Math.min(existing.bestMoveCount, moveCount) : moveCount,
      stars
    };
    
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    
    // Award gems
    const gemsEarned = stars * 5;
    
    set({
      progress: { ...progress, [levelId]: levelProgress },
      gems: gems + gemsEarned,
      completedLevels: newCompletedLevels
    });
    
    get().saveProgress();
  },
  
  addGems: (amount) => set((state) => ({ gems: state.gems + amount })),
  
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),
  
  unlockTheme: (themeId) => set((state) => ({
    unlockedThemes: [...state.unlockedThemes, themeId]
  })),
  
  setTheme: (themeId) => set({ currentTheme: themeId }),
  
  setLightBeams: (beams) => set({ lightBeams: beams }),
  
  setTargetStates: (states) => set({ targetStates: states }),
  
  loadProgress: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        set({
          progress: data.progress || {},
          gems: data.gems || 0,
          completedLevels: new Set(data.completedLevels || []),
          settings: data.settings || {
            soundEnabled: true,
            vibrationEnabled: true,
            username: ''
          },
          currentTheme: data.currentTheme || 'default',
          unlockedThemes: data.unlockedThemes || ['default']
        });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  },
  
  saveProgress: async () => {
    try {
      const { progress, gems, completedLevels, settings, currentTheme, unlockedThemes } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        progress,
        gems,
        completedLevels: Array.from(completedLevels),
        settings,
        currentTheme,
        unlockedThemes
      }));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }
}));
