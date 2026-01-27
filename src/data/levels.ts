// PrismFlow Mobile - Level Data
// Ported from web version with all 80 levels

import { Level, PieceType, COLORS, Direction } from '../types/game';

export const LEVELS: Record<string, Level> = {
    // ==================== WORLD 1: REFLECTION ====================
    'w1_l1': {
        id: 'w1_l1',
        worldId: 1,
        levelNumber: 1,
        name: 'First Light',
        gridSize: { width: 4, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 3 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 }
        ],
        parMoves: 2
    },
    'w1_l2': {
        id: 'w1_l2',
        worldId: 1,
        levelNumber: 2,
        name: 'Corner Shot',
        gridSize: { width: 4, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 3 }, direction: Direction.UP, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 0 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 1 },
            { type: PieceType.MIRROR_BACKWARD, count: 1 }
        ],
        parMoves: 2
    },
    'w1_l3': {
        id: 'w1_l3',
        worldId: 1,
        levelNumber: 3,
        name: 'Zigzag',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w1_l4': {
        id: 'w1_l4',
        worldId: 1,
        levelNumber: 4,
        name: 'Two Paths',
        gridSize: { width: 4, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 3, y: 0 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w1_l5': {
        id: 'w1_l5',
        worldId: 1,
        levelNumber: 5,
        name: 'Around the Block',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.CYAN }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w1_l6': {
        id: 'w1_l6',
        worldId: 1,
        levelNumber: 6,
        name: 'Triple Bounce',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 3 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [],
        preplacedPieces: [
            { position: { x: 2, y: 1 }, piece: { type: PieceType.MIRROR_FORWARD, rotation: 0 } }
        ],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 1 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 3
    },
    'w1_l7': {
        id: 'w1_l7',
        worldId: 1,
        levelNumber: 7,
        name: 'Cross Paths',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 4, y: 2 }, direction: Direction.LEFT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 0, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 2
    },
    'w1_l8': {
        id: 'w1_l8',
        worldId: 1,
        levelNumber: 8,
        name: 'Maze Runner',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.MAGENTA }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 0 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
            { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 3
    },
    'w1_l9': {
        id: 'w1_l9',
        worldId: 1,
        levelNumber: 9,
        name: 'Light Bridge',
        gridSize: { width: 6, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 2 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 },
            { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w1_l10': {
        id: 'w1_l10',
        worldId: 1,
        levelNumber: 10,
        name: 'Hall of Mirrors',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 4 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [
            { x: 2, y: 2 }, { x: 3, y: 2 }
        ],
        preplacedPieces: [
            { position: { x: 4, y: 0 }, piece: { type: PieceType.MIRROR_FORWARD, rotation: 0 } }
        ],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },

    // ==================== WORLD 2: SPECTRUM ====================
    'w2_l1': {
        id: 'w2_l1',
        worldId: 2,
        levelNumber: 1,
        name: 'Rainbow Split',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 3 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 2, y: 3 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 4, y: 3 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 1
    },
    'w2_l2': {
        id: 'w2_l2',
        worldId: 2,
        levelNumber: 2,
        name: 'Color Merge',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.RED },
            { id: 's2', position: { x: 4, y: 0 }, direction: Direction.DOWN, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w2_l3': {
        id: 'w2_l3',
        worldId: 2,
        levelNumber: 3,
        name: 'Cyan Creation',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.GREEN },
            { id: 's2', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 4 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w2_l4': {
        id: 'w2_l4',
        worldId: 2,
        levelNumber: 4,
        name: 'Split and Route',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },
    'w2_l5': {
        id: 'w2_l5',
        worldId: 2,
        levelNumber: 5,
        name: 'Magenta Magic',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 4 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 2, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w2_l6': {
        id: 'w2_l6',
        worldId: 2,
        levelNumber: 6,
        name: 'Prism Puzzle',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 2 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 5, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },
    'w2_l7': {
        id: 'w2_l7',
        worldId: 2,
        levelNumber: 7,
        name: 'White Out',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.RED },
            { id: 's2', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.GREEN },
            { id: 's3', position: { x: 4, y: 0 }, direction: Direction.DOWN, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 4 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w2_l8': {
        id: 'w2_l8',
        worldId: 2,
        levelNumber: 8,
        name: 'Double Split',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 4 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 6
    },
    'w2_l9': {
        id: 'w2_l9',
        worldId: 2,
        levelNumber: 9,
        name: 'Color Wheel',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 2 }, direction: Direction.UP, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 4, y: 0 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 7
    },
    'w2_l10': {
        id: 'w2_l10',
        worldId: 2,
        levelNumber: 10,
        name: 'Spectrum Master',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 5, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 8
    },

    // ==================== WORLD 3: FILTER ====================
    'w3_l1': {
        id: 'w3_l1',
        worldId: 3,
        levelNumber: 1,
        name: 'Red Filter',
        gridSize: { width: 4, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 1 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_RED, count: 1 }
        ],
        parMoves: 1
    },
    'w3_l2': {
        id: 'w3_l2',
        worldId: 3,
        levelNumber: 2,
        name: 'RGB Separation',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE },
            { id: 's2', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE },
            { id: 's3', position: { x: 4, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 2, y: 4 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 }
        ],
        parMoves: 3
    },
    'w3_l3': {
        id: 'w3_l3',
        worldId: 3,
        levelNumber: 3,
        name: 'Filter and Redirect',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 3 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 1 }
        ],
        parMoves: 3
    },
    'w3_l4': {
        id: 'w3_l4',
        worldId: 3,
        levelNumber: 4,
        name: 'Yellow from White',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w3_l5': {
        id: 'w3_l5',
        worldId: 3,
        levelNumber: 5,
        name: 'Subtract Blue',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.CYAN }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_GREEN, count: 1 }
        ],
        parMoves: 1
    },
    'w3_l6': {
        id: 'w3_l6',
        worldId: 3,
        levelNumber: 6,
        name: 'Double Filter',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE },
            { id: 's2', position: { x: 4, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 }
        ],
        parMoves: 2
    },
    'w3_l7': {
        id: 'w3_l7',
        worldId: 3,
        levelNumber: 7,
        name: 'Filter Chain',
        gridSize: { width: 6, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 2 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w3_l8': {
        id: 'w3_l8',
        worldId: 3,
        levelNumber: 8,
        name: 'Color Conversion',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.MAGENTA }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w3_l9': {
        id: 'w3_l9',
        worldId: 3,
        levelNumber: 9,
        name: 'Selective Routing',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 4 }, direction: Direction.RIGHT, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 2 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.FILTER_RED, count: 2 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 7
    },
    'w3_l10': {
        id: 'w3_l10',
        worldId: 3,
        levelNumber: 10,
        name: 'Filter Master',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 5, y: 5 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 10
    },

    // ==================== WORLD 4: SPLITTER ====================
    'w4_l1': {
        id: 'w4_l1',
        worldId: 4,
        levelNumber: 1,
        name: 'First Split',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.RED }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 4, y: 2 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 3
    },
    'w4_l2': {
        id: 'w4_l2',
        worldId: 4,
        levelNumber: 2,
        name: 'Split and Turn',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 4 }, requiredColor: COLORS.GREEN },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 3
    },
    'w4_l3': {
        id: 'w4_l3',
        worldId: 4,
        levelNumber: 3,
        name: 'Triple Delivery',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.BLUE },
            { id: 't2', position: { x: 4, y: 2 }, requiredColor: COLORS.BLUE },
            { id: 't3', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 4
    },
    'w4_l4': {
        id: 'w4_l4',
        worldId: 4,
        levelNumber: 4,
        name: 'Split and Merge',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [{ x: 2, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },
    'w4_l5': {
        id: 'w4_l5',
        worldId: 4,
        levelNumber: 5,
        name: 'Four Corners',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 2 }, direction: Direction.UP, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 4, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't3', position: { x: 0, y: 4 }, requiredColor: COLORS.YELLOW },
            { id: 't4', position: { x: 4, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 3 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 6
    },
    'w4_l6': {
        id: 'w4_l6',
        worldId: 4,
        levelNumber: 6,
        name: 'Color Split',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.MAGENTA }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.MAGENTA },
            { id: 't2', position: { x: 5, y: 4 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 3, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 4
    },
    'w4_l7': {
        id: 'w4_l7',
        worldId: 4,
        levelNumber: 7,
        name: 'Split Cascade',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.CYAN }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 5, y: 1 }, requiredColor: COLORS.CYAN },
            { id: 't3', position: { x: 5, y: 3 }, requiredColor: COLORS.CYAN },
            { id: 't4', position: { x: 5, y: 4 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 3 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 6
    },
    'w4_l8': {
        id: 'w4_l8',
        worldId: 4,
        levelNumber: 8,
        name: 'Split the Rainbow',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 5 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 6
    },
    'w4_l9': {
        id: 'w4_l9',
        worldId: 4,
        levelNumber: 9,
        name: 'Filtered Split',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 3, y: 0 }, { x: 3, y: 4 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },
    'w4_l10': {
        id: 'w4_l10',
        worldId: 4,
        levelNumber: 10,
        name: 'Splitter Master',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.WHITE },
            { id: 't2', position: { x: 5, y: 2 }, requiredColor: COLORS.WHITE },
            { id: 't3', position: { x: 5, y: 3 }, requiredColor: COLORS.WHITE },
            { id: 't4', position: { x: 5, y: 5 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 4 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 8
    },

    // ==================== WORLD 5: TELEPORT ====================
    'w5_l1': {
        id: 'w5_l1',
        worldId: 5,
        levelNumber: 1,
        name: 'First Warp',
        gridSize: { width: 5, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.RED }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
        preplacedPieces: [],
        teleporterPairs: [{ id: 'tp1', positions: [{ x: 1, y: 1 }, { x: 3, y: 2 }] }],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 2 }
        ],
        parMoves: 2
    },
    'w5_l2': {
        id: 'w5_l2',
        worldId: 5,
        levelNumber: 2,
        name: 'Skip the Wall',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 2 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 1 }
        ],
        parMoves: 3
    },
    'w5_l3': {
        id: 'w5_l3',
        worldId: 5,
        levelNumber: 3,
        name: 'Dual Warp',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 1 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 3 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 1 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 6
    },
    'w5_l4': {
        id: 'w5_l4',
        worldId: 5,
        levelNumber: 4,
        name: 'Warp Around',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 2 }, direction: Direction.UP, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w5_l5': {
        id: 'w5_l5',
        worldId: 5,
        levelNumber: 5,
        name: 'Maze Escape',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.CYAN }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 5 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
            { x: 3, y: 2 }, { x: 3, y: 3 },
            { x: 1, y: 3 }, { x: 2, y: 3 },
            { x: 1, y: 4 }, { x: 1, y: 5 }
        ],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 5
    },
    'w5_l6': {
        id: 'w5_l6',
        worldId: 5,
        levelNumber: 6,
        name: 'Color Warp',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 4 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w5_l7': {
        id: 'w5_l7',
        worldId: 5,
        levelNumber: 7,
        name: 'Triple Portal',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.MAGENTA }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.MAGENTA },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.MAGENTA },
            { id: 't3', position: { x: 5, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 7
    },
    'w5_l8': {
        id: 'w5_l8',
        worldId: 5,
        levelNumber: 8,
        name: 'Warp and Filter',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 7
    },
    'w5_l9': {
        id: 'w5_l9',
        worldId: 5,
        levelNumber: 9,
        name: 'Warp Chain',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.GREEN }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 5 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [
            { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 },
            { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }
        ],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w5_l10': {
        id: 'w5_l10',
        worldId: 5,
        levelNumber: 10,
        name: 'Teleport Master',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 6, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
            { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }
        ],
        preplacedPieces: [],
        teleporterPairs: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 10
    },

    // ==================== WORLD 6: MASTERY ====================
    'w6_l1': {
        id: 'w6_l1',
        worldId: 6,
        levelNumber: 1,
        name: 'Mix It Up',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 4, y: 4 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w6_l2': {
        id: 'w6_l2',
        worldId: 6,
        levelNumber: 2,
        name: 'All Tools',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [{ x: 3, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w6_l3': {
        id: 'w6_l3',
        worldId: 6,
        levelNumber: 3,
        name: 'Complex Paths',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 2 }, requiredColor: COLORS.MAGENTA },
            { id: 't2', position: { x: 5, y: 3 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 7
    },
    'w6_l4': {
        id: 'w6_l4',
        worldId: 6,
        levelNumber: 4,
        name: 'Rainbow Factory',
        gridSize: { width: 7, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 6, y: 1 }, requiredColor: COLORS.YELLOW },
            { id: 't3', position: { x: 6, y: 3 }, requiredColor: COLORS.CYAN },
            { id: 't4', position: { x: 6, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 8
    },
    'w6_l5': {
        id: 'w6_l5',
        worldId: 6,
        levelNumber: 5,
        name: 'Warp Factory',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 5 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 8
    },
    'w6_l6': {
        id: 'w6_l6',
        worldId: 6,
        levelNumber: 6,
        name: 'Light Labyrinth',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 6, y: 5 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [
            { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
            { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 8
    },
    'w6_l7': {
        id: 'w6_l7',
        worldId: 6,
        levelNumber: 7,
        name: 'Spectrum Split',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 2 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 5, y: 3 }, requiredColor: COLORS.CYAN },
            { id: 't4', position: { x: 5, y: 5 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 9
    },
    'w6_l8': {
        id: 'w6_l8',
        worldId: 6,
        levelNumber: 8,
        name: 'Filtered Chaos',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 1 }, requiredColor: COLORS.MAGENTA },
            { id: 't2', position: { x: 6, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 10
    },
    'w6_l9': {
        id: 'w6_l9',
        worldId: 6,
        levelNumber: 9,
        name: 'Ultimate Mix',
        gridSize: { width: 7, height: 7 },
        sources: [
            { id: 's1', position: { x: 3, y: 3 }, direction: Direction.UP, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 6, y: 0 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 0, y: 6 }, requiredColor: COLORS.BLUE },
            { id: 't4', position: { x: 6, y: 6 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.SPLITTER, count: 3 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 10
    },
    'w6_l10': {
        id: 'w6_l10',
        worldId: 6,
        levelNumber: 10,
        name: 'Mastery Complete',
        gridSize: { width: 7, height: 7 },
        sources: [
            { id: 's1', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 6, y: 3 }, direction: Direction.LEFT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 6, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't3', position: { x: 0, y: 6 }, requiredColor: COLORS.MAGENTA },
            { id: 't4', position: { x: 6, y: 6 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 3 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 12
    },

    // ==================== WORLD 7: CHALLENGE ====================
    'w7_l1': {
        id: 'w7_l1',
        worldId: 7,
        levelNumber: 1,
        name: 'Tight Spaces',
        gridSize: { width: 4, height: 4 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 0 }, requiredColor: COLORS.BLUE },
            { id: 't2', position: { x: 3, y: 3 }, requiredColor: COLORS.RED }
        ],
        lockedCells: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 4
    },
    'w7_l2': {
        id: 'w7_l2',
        worldId: 7,
        levelNumber: 2,
        name: 'Precision Required',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 4, y: 0 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w7_l3': {
        id: 'w7_l3',
        worldId: 7,
        levelNumber: 3,
        name: 'Cross Traffic',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.GREEN },
            { id: 's3', position: { x: 4, y: 2 }, direction: Direction.LEFT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 4 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 6
    },
    'w7_l4': {
        id: 'w7_l4',
        worldId: 7,
        levelNumber: 4,
        name: 'No Room for Error',
        gridSize: { width: 4, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.CYAN }
        ],
        targets: [
            { id: 't1', position: { x: 3, y: 4 }, requiredColor: COLORS.GREEN },
            { id: 't2', position: { x: 3, y: 0 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 1, y: 2 }, { x: 2, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w7_l5': {
        id: 'w7_l5',
        worldId: 7,
        levelNumber: 5,
        name: 'Warp Precision',
        gridSize: { width: 6, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.MAGENTA }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.MAGENTA },
            { id: 't2', position: { x: 5, y: 4 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 5
    },
    'w7_l6': {
        id: 'w7_l6',
        worldId: 7,
        levelNumber: 6,
        name: 'Color Chaos',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE },
            { id: 's2', position: { x: 5, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 2, y: 5 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 3, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 8
    },
    'w7_l7': {
        id: 'w7_l7',
        worldId: 7,
        levelNumber: 7,
        name: 'Triple Threat',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.GREEN },
            { id: 's3', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 1 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 5, y: 4 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 8
    },
    'w7_l8': {
        id: 'w7_l8',
        worldId: 7,
        levelNumber: 8,
        name: 'The Gauntlet',
        gridSize: { width: 7, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 6, y: 2 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 6, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 8
    },
    'w7_l9': {
        id: 'w7_l9',
        worldId: 7,
        levelNumber: 9,
        name: 'Mind Bender',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.CYAN },
            { id: 's2', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.YELLOW }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 2 }, requiredColor: COLORS.WHITE },
            { id: 't2', position: { x: 6, y: 3 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 9
    },
    'w7_l10': {
        id: 'w7_l10',
        worldId: 7,
        levelNumber: 10,
        name: 'Challenge Complete',
        gridSize: { width: 7, height: 7 },
        sources: [
            { id: 's1', position: { x: 3, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 6, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't3', position: { x: 0, y: 6 }, requiredColor: COLORS.MAGENTA },
            { id: 't4', position: { x: 6, y: 6 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 4, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 3 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.TELEPORTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 11
    },

    // ==================== WORLD 8: EXPERT ====================
    'w8_l1': {
        id: 'w8_l1',
        worldId: 8,
        levelNumber: 1,
        name: 'Expert Entry',
        gridSize: { width: 6, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 5, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 5, y: 5 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 4 },
            { type: PieceType.MIRROR_BACKWARD, count: 4 }
        ],
        parMoves: 8
    },
    'w8_l2': {
        id: 'w8_l2',
        worldId: 8,
        levelNumber: 2,
        name: 'Surgical Precision',
        gridSize: { width: 5, height: 5 },
        sources: [
            { id: 's1', position: { x: 2, y: 0 }, direction: Direction.DOWN, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 4 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 2, y: 4 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 4, y: 4 }, requiredColor: COLORS.BLUE }
        ],
        lockedCells: [{ x: 1, y: 2 }, { x: 3, y: 2 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 2 },
            { type: PieceType.MIRROR_BACKWARD, count: 2 }
        ],
        parMoves: 3
    },
    'w8_l3': {
        id: 'w8_l3',
        worldId: 8,
        levelNumber: 3,
        name: 'Warp Expert',
        gridSize: { width: 7, height: 5 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't2', position: { x: 6, y: 4 }, requiredColor: COLORS.YELLOW }
        ],
        lockedCells: [
            { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
            { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.MIRROR_FORWARD, count: 3 },
            { type: PieceType.MIRROR_BACKWARD, count: 3 }
        ],
        parMoves: 9
    },
    'w8_l4': {
        id: 'w8_l4',
        worldId: 8,
        levelNumber: 4,
        name: 'Color Symphony',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.RED },
            { id: 's2', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.GREEN },
            { id: 's3', position: { x: 0, y: 5 }, direction: Direction.RIGHT, color: COLORS.BLUE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 1 }, requiredColor: COLORS.YELLOW },
            { id: 't2', position: { x: 6, y: 3 }, requiredColor: COLORS.CYAN },
            { id: 't3', position: { x: 6, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 3, y: 2 }, { x: 3, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.COMBINER, count: 3 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 9
    },
    'w8_l5': {
        id: 'w8_l5',
        worldId: 8,
        levelNumber: 5,
        name: 'Five Targets',
        gridSize: { width: 7, height: 7 },
        sources: [
            { id: 's1', position: { x: 3, y: 3 }, direction: Direction.UP, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 6, y: 0 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 3, y: 6 }, requiredColor: COLORS.BLUE },
            { id: 't4', position: { x: 0, y: 6 }, requiredColor: COLORS.YELLOW },
            { id: 't5', position: { x: 6, y: 6 }, requiredColor: COLORS.CYAN }
        ],
        lockedCells: [],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 3 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 10
    },
    'w8_l6': {
        id: 'w8_l6',
        worldId: 8,
        levelNumber: 6,
        name: 'Maze of Light',
        gridSize: { width: 8, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 0 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 7, y: 5 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
            { x: 3, y: 2 }, { x: 3, y: 3 },
            { x: 4, y: 3 }, { x: 5, y: 3 },
            { x: 5, y: 4 }, { x: 5, y: 5 },
            { x: 6, y: 1 }, { x: 7, y: 1 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.SPLITTER, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 9
    },
    'w8_l7': {
        id: 'w8_l7',
        worldId: 8,
        levelNumber: 7,
        name: 'Filter Master',
        gridSize: { width: 7, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 6, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 6, y: 2 }, requiredColor: COLORS.CYAN },
            { id: 't3', position: { x: 6, y: 3 }, requiredColor: COLORS.MAGENTA },
            { id: 't4', position: { x: 6, y: 5 }, requiredColor: COLORS.GREEN }
        ],
        lockedCells: [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 2 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 5 },
            { type: PieceType.MIRROR_BACKWARD, count: 5 }
        ],
        parMoves: 11
    },
    'w8_l8': {
        id: 'w8_l8',
        worldId: 8,
        levelNumber: 8,
        name: 'Six Colors',
        gridSize: { width: 8, height: 6 },
        sources: [
            { id: 's1', position: { x: 0, y: 2 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 7, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 7, y: 1 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 7, y: 2 }, requiredColor: COLORS.BLUE },
            { id: 't4', position: { x: 7, y: 3 }, requiredColor: COLORS.YELLOW },
            { id: 't5', position: { x: 7, y: 4 }, requiredColor: COLORS.CYAN },
            { id: 't6', position: { x: 7, y: 5 }, requiredColor: COLORS.MAGENTA }
        ],
        lockedCells: [{ x: 4, y: 2 }, { x: 4, y: 3 }],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 2 },
            { type: PieceType.COMBINER, count: 3 },
            { type: PieceType.SPLITTER, count: 3 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 12
    },
    'w8_l9': {
        id: 'w8_l9',
        worldId: 8,
        levelNumber: 9,
        name: 'Ultimate Warp',
        gridSize: { width: 8, height: 7 },
        sources: [
            { id: 's1', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 7, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 7, y: 3 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 7, y: 6 }, requiredColor: COLORS.BLUE },
            { id: 't4', position: { x: 0, y: 0 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
            { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 1 },
            { type: PieceType.COMBINER, count: 1 },
            { type: PieceType.SPLITTER, count: 2 },
            { type: PieceType.TELEPORTER, count: 6 },
            { type: PieceType.MIRROR_FORWARD, count: 6 },
            { type: PieceType.MIRROR_BACKWARD, count: 6 }
        ],
        parMoves: 12
    },
    'w8_l10': {
        id: 'w8_l10',
        worldId: 8,
        levelNumber: 10,
        name: 'Grand Finale',
        gridSize: { width: 8, height: 8 },
        sources: [
            { id: 's1', position: { x: 0, y: 3 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's2', position: { x: 0, y: 4 }, direction: Direction.RIGHT, color: COLORS.WHITE },
            { id: 's3', position: { x: 7, y: 3 }, direction: Direction.LEFT, color: COLORS.WHITE },
            { id: 's4', position: { x: 7, y: 4 }, direction: Direction.LEFT, color: COLORS.WHITE }
        ],
        targets: [
            { id: 't1', position: { x: 0, y: 0 }, requiredColor: COLORS.RED },
            { id: 't2', position: { x: 7, y: 0 }, requiredColor: COLORS.GREEN },
            { id: 't3', position: { x: 0, y: 7 }, requiredColor: COLORS.BLUE },
            { id: 't4', position: { x: 7, y: 7 }, requiredColor: COLORS.YELLOW },
            { id: 't5', position: { x: 3, y: 0 }, requiredColor: COLORS.CYAN },
            { id: 't6', position: { x: 4, y: 0 }, requiredColor: COLORS.MAGENTA },
            { id: 't7', position: { x: 3, y: 7 }, requiredColor: COLORS.WHITE },
            { id: 't8', position: { x: 4, y: 7 }, requiredColor: COLORS.WHITE }
        ],
        lockedCells: [
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 4 }
        ],
        preplacedPieces: [],
        availablePieces: [
            { type: PieceType.PRISM, count: 4 },
            { type: PieceType.COMBINER, count: 4 },
            { type: PieceType.SPLITTER, count: 4 },
            { type: PieceType.TELEPORTER, count: 4 },
            { type: PieceType.FILTER_RED, count: 1 },
            { type: PieceType.FILTER_GREEN, count: 1 },
            { type: PieceType.FILTER_BLUE, count: 1 },
            { type: PieceType.MIRROR_FORWARD, count: 8 },
            { type: PieceType.MIRROR_BACKWARD, count: 8 }
        ],
        parMoves: 15
    }
};

// Export function to get levels by world
export const getLevelsByWorld = (worldId: number): Level[] => {
  return Object.values(LEVELS)
    .filter(level => level.worldId === worldId)
    .sort((a, b) => a.levelNumber - b.levelNumber);
};

// Export function to get level by ID
export const getLevelById = (levelId: string): Level | undefined => {
  return LEVELS[levelId];
};

// Export function to get all levels
export const getAllLevels = (): Level[] => {
  return Object.values(LEVELS).sort((a, b) => {
    if (a.worldId !== b.worldId) return a.worldId - b.worldId;
    return a.levelNumber - b.levelNumber;
  });
};
