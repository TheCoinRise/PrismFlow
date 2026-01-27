// Game Types

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  MIRROR_FORWARD = 'mirror_forward',
  MIRROR_BACKWARD = 'mirror_backward',
  PRISM = 'prism',
  COMBINER = 'combiner',
  FILTER_RED = 'filter_red',
  FILTER_GREEN = 'filter_green',
  FILTER_BLUE = 'filter_blue',
  SPLITTER = 'splitter',
  TELEPORTER = 'teleporter'
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface Piece {
  type: PieceType;
  rotation: number; // 0, 1, 2, 3 for 90-degree rotations
}

export interface GamePiece {
  piece: Piece;
  position: Position;
}

export interface Source {
  id: string;
  position: Position;
  direction: Direction;
  color: Color;
}

export interface Target {
  id: string;
  position: Position;
  requiredColor: Color;
}

export interface Level {
  id: string;
  worldId: number;
  levelNumber: number;
  name: string;
  gridSize: { width: number; height: number };
  sources: Source[];
  targets: Target[];
  lockedCells: Position[];
  preplacedPieces: GamePiece[];
  availablePieces: { type: PieceType; count: number }[];
  parMoves: number;
}

export interface World {
  id: number;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  locked: boolean;
}

export interface LightBeam {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: Color;
}

export interface TargetState {
  receivedColor: Color;
  satisfied: boolean;
}

export interface LightEngineResult {
  beams: LightBeam[];
  targetStates: Record<string, TargetState>;
}

export const COLORS = {
  RED: { r: 255, g: 0, b: 0 },
  GREEN: { r: 0, g: 255, b: 0 },
  BLUE: { r: 0, g: 0, b: 255 },
  YELLOW: { r: 255, g: 255, b: 0 },
  MAGENTA: { r: 255, g: 0, b: 255 },
  CYAN: { r: 0, g: 255, b: 255 },
  WHITE: { r: 255, g: 255, b: 255 },
  BLACK: { r: 0, g: 0, b: 0 }
};
