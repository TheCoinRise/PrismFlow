import {
  Level,
  Piece,
  PieceType,
  Direction,
  Position,
  Color,
  LightBeam,
  TargetState,
  LightEngineResult,
  COLORS
} from '../types/game';
import { ColorMixer } from './colorMixer';

interface BeamSegment {
  x: number;
  y: number;
  direction: Direction;
  color: Color;
  startX: number;
  startY: number;
}

interface PieceOutput {
  direction: Direction;
  color: Color;
  isCombiner?: boolean;
  exitX?: number;
  exitY?: number;
}

export const LightEngine = {
  calculate: (level: Level, placedPieces: Record<string, Piece>): LightEngineResult => {
    const beams: LightBeam[] = [];
    const targetColors: Record<string, Color> = {};
    const combinerInputs: Record<string, Color> = {};
    const teleporterPairs = LightEngine.findTeleporterPairs(level, placedPieces);
    const MAX_SEGMENTS = 200;
    const MAX_ITERATIONS = 3;

    // Initialize target colors
    level.targets.forEach(t => {
      targetColors[t.id] = { r: 0, g: 0, b: 0 };
    });

    // Run multiple iterations for combiners to accumulate colors
    for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
      // Clear beams and targets on non-final iterations
      if (iteration < MAX_ITERATIONS - 1) {
        beams.length = 0;
        level.targets.forEach(t => {
          targetColors[t.id] = { r: 0, g: 0, b: 0 };
        });
      }

      // Process each source
      level.sources.forEach(source => {
        const visited = new Set<string>();
        const queue: BeamSegment[] = [{
          x: source.position.x,
          y: source.position.y,
          direction: source.direction,
          color: { ...source.color },
          startX: source.position.x,
          startY: source.position.y
        }];

        let segments = 0;

        while (queue.length > 0 && segments < MAX_SEGMENTS) {
          const current = queue.shift()!;
          segments++;

          // Get next position
          const next = LightEngine.getNextPosition(current.x, current.y, current.direction);

          // Check bounds
          if (next.x < 0 || next.x >= level.gridSize.width ||
              next.y < 0 || next.y >= level.gridSize.height) {
            const offset = LightEngine.getDirectionOffset(current.direction);
            beams.push({
              x1: current.startX,
              y1: current.startY,
              x2: current.x + offset.x * 0.5,
              y2: current.y + offset.y * 0.5,
              color: current.color
            });
            continue;
          }

          // Check for target at next position
          const target = level.targets.find(t =>
            t.position.x === next.x && t.position.y === next.y);
          if (target) {
            beams.push({
              x1: current.startX,
              y1: current.startY,
              x2: next.x,
              y2: next.y,
              color: current.color
            });
            targetColors[target.id] = ColorMixer.add(
              targetColors[target.id],
              current.color
            );
            continue;
          }

          // Check for piece at next position
          const pieceKey = `${next.x},${next.y}`;
          const piece = placedPieces[pieceKey];

          // Check for locked cell
          const isLocked = level.lockedCells.some(c =>
            c.x === next.x && c.y === next.y);

          if (piece) {
            // Draw beam to piece
            beams.push({
              x1: current.startX,
              y1: current.startY,
              x2: next.x,
              y2: next.y,
              color: current.color
            });

            // Process piece interaction
            const outputs = LightEngine.processPiece(
              piece,
              current.direction,
              current.color,
              pieceKey,
              teleporterPairs,
              placedPieces
            );
            outputs.forEach(output => {
              let outputColor = output.color;

              // Handle combiner - accumulate and use combined color
              if (output.isCombiner) {
                const combinerKey = `${next.x},${next.y}`;
                if (!combinerInputs[combinerKey]) {
                  combinerInputs[combinerKey] = { r: 0, g: 0, b: 0 };
                }
                combinerInputs[combinerKey] = ColorMixer.add(
                  combinerInputs[combinerKey],
                  current.color
                );
                outputColor = { ...combinerInputs[combinerKey] };
              }

              if (!ColorMixer.isBlack(outputColor)) {
                const outX = output.exitX !== undefined ? output.exitX : next.x;
                const outY = output.exitY !== undefined ? output.exitY : next.y;

                const visitKey = `${outX},${outY},${output.direction},${ColorMixer.toHex(outputColor)}`;
                if (!visited.has(visitKey)) {
                  visited.add(visitKey);
                  queue.push({
                    x: outX,
                    y: outY,
                    direction: output.direction,
                    color: outputColor,
                    startX: outX,
                    startY: outY
                  });
                }
              }
            });
          } else if (!isLocked) {
            // Continue through empty cell
            const visitKey = `${next.x},${next.y},${current.direction},${ColorMixer.toHex(current.color)}`;
            if (!visited.has(visitKey)) {
              visited.add(visitKey);
              queue.push({
                x: next.x,
                y: next.y,
                direction: current.direction,
                color: current.color,
                startX: current.startX,
                startY: current.startY
              });
            }
          } else {
            // Hit locked cell - end beam
            beams.push({
              x1: current.startX,
              y1: current.startY,
              x2: next.x,
              y2: next.y,
              color: current.color
            });
          }
        }
      });
    }

    // Calculate target satisfaction
    const targetStates: Record<string, TargetState> = {};
    level.targets.forEach(target => {
      targetStates[target.id] = {
        receivedColor: targetColors[target.id],
        satisfied: ColorMixer.matches(targetColors[target.id], target.requiredColor)
      };
    });

    return { beams, targetStates };
  },

  getNextPosition: (x: number, y: number, direction: Direction): Position => {
    const offset = LightEngine.getDirectionOffset(direction);
    return { x: x + offset.x, y: y + offset.y };
  },

  getDirectionOffset: (direction: Direction): Position => {
    switch (direction) {
      case Direction.UP:
        return { x: 0, y: -1 };
      case Direction.DOWN:
        return { x: 0, y: 1 };
      case Direction.LEFT:
        return { x: -1, y: 0 };
      case Direction.RIGHT:
        return { x: 1, y: 0 };
    }
  },

  processPiece: (
    piece: Piece,
    incomingDirection: Direction,
    incomingColor: Color,
    pieceKey: string,
    teleporterPairs: Record<string, Position>,
    placedPieces: Record<string, Piece>
  ): PieceOutput[] => {
    const outputs: PieceOutput[] = [];

    switch (piece.type) {
      case PieceType.MIRROR_FORWARD: // /
      case PieceType.MIRROR_BACKWARD: { // \
        const isForward = piece.type === PieceType.MIRROR_FORWARD;
        const rotations = (piece.rotation % 4 + 4) % 4;
        const reflected = LightEngine.reflectMirror(incomingDirection, isForward, rotations);
        if (reflected) {
          outputs.push({ direction: reflected, color: incomingColor });
        }
        break;
      }

      case PieceType.PRISM: {
        if (incomingColor.r === 255 && incomingColor.g === 255 && incomingColor.b === 255) {
          const split = ColorMixer.split(incomingColor);
          const rotations = (piece.rotation % 4 + 4) % 4;
          const directions = LightEngine.getPrismDirections(incomingDirection, rotations);
          if (directions.red) outputs.push({ direction: directions.red, color: split.red });
          if (directions.green) outputs.push({ direction: directions.green, color: split.green });
          if (directions.blue) outputs.push({ direction: directions.blue, color: split.blue });
        } else {
          // Pass through
          outputs.push({ direction: incomingDirection, color: incomingColor });
        }
        break;
      }

      case PieceType.COMBINER: {
        const rotations = (piece.rotation % 4 + 4) % 4;
        const outputDir = LightEngine.rotateDirection(incomingDirection, (4 - rotations) % 4);
        const oppositeDir = LightEngine.getOppositeDirection(outputDir);
        outputs.push({
          direction: oppositeDir,
          color: incomingColor,
          isCombiner: true
        });
        break;
      }

      case PieceType.FILTER_RED:
      case PieceType.FILTER_GREEN:
      case PieceType.FILTER_BLUE: {
        const filtered = ColorMixer.filter(incomingColor, piece.type);
        if (!ColorMixer.isBlack(filtered)) {
          outputs.push({ direction: incomingDirection, color: filtered });
        }
        break;
      }

      case PieceType.SPLITTER: {
        const rotations = (piece.rotation % 4 + 4) % 4;
        const splitDirs = LightEngine.getSplitterDirections(incomingDirection, rotations);
        splitDirs.forEach(dir => {
          outputs.push({ direction: dir, color: incomingColor });
        });
        break;
      }

      case PieceType.TELEPORTER: {
        const pair = teleporterPairs[pieceKey];
        if (pair) {
          outputs.push({
            direction: incomingDirection,
            color: incomingColor,
            exitX: pair.x,
            exitY: pair.y
          });
        }
        break;
      }
    }

    return outputs;
  },

  reflectMirror: (direction: Direction, isForward: boolean, rotation: number): Direction | null => {
    const dirs = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    const currentIdx = dirs.indexOf(direction);
    if (currentIdx === -1) return null;

    // Mirror reflection logic
    let newIdx: number;
    if (isForward) {
      // Forward mirror (/): UP <-> RIGHT, DOWN <-> LEFT
      if (currentIdx === 0) newIdx = 1; // UP -> RIGHT
      else if (currentIdx === 1) newIdx = 0; // RIGHT -> UP
      else if (currentIdx === 2) newIdx = 3; // DOWN -> LEFT
      else newIdx = 2; // LEFT -> DOWN
    } else {
      // Backward mirror (\): UP <-> LEFT, DOWN <-> RIGHT
      if (currentIdx === 0) newIdx = 3; // UP -> LEFT
      else if (currentIdx === 1) newIdx = 2; // RIGHT -> DOWN
      else if (currentIdx === 2) newIdx = 1; // DOWN -> RIGHT
      else newIdx = 0; // LEFT -> UP
    }

    // Apply rotation
    newIdx = (newIdx + rotation) % 4;
    return dirs[newIdx];
  },

  rotateDirection: (direction: Direction, steps: number): Direction => {
    const dirs = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    const currentIdx = dirs.indexOf(direction);
    return dirs[(currentIdx + steps) % 4];
  },

  getOppositeDirection: (direction: Direction): Direction => {
    switch (direction) {
      case Direction.UP: return Direction.DOWN;
      case Direction.DOWN: return Direction.UP;
      case Direction.LEFT: return Direction.RIGHT;
      case Direction.RIGHT: return Direction.LEFT;
    }
  },

  getPrismDirections: (incoming: Direction, rotation: number): { red?: Direction; green?: Direction; blue?: Direction } => {
    // Prism splits white into RGB, each going in different directions
    const dirs = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    const incomingIdx = dirs.indexOf(incoming);
    const redIdx = (incomingIdx + 1 + rotation) % 4;
    const greenIdx = (incomingIdx + 2 + rotation) % 4;
    const blueIdx = (incomingIdx + 3 + rotation) % 4;
    return {
      red: dirs[redIdx],
      green: dirs[greenIdx],
      blue: dirs[blueIdx]
    };
  },

  getSplitterDirections: (incoming: Direction, rotation: number): Direction[] => {
    // Splitter sends beam in two perpendicular directions
    const dirs = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    const incomingIdx = dirs.indexOf(incoming);
    const perp1 = (incomingIdx + 1 + rotation) % 4;
    const perp2 = (incomingIdx + 3 + rotation) % 4;
    return [dirs[perp1], dirs[perp2]];
  },

  findTeleporterPairs: (level: Level, placedPieces: Record<string, Piece>): Record<string, Position> => {
    const teleporters: { x: number; y: number; key: string }[] = [];

    // Check placed pieces
    Object.entries(placedPieces).forEach(([key, piece]) => {
      if (piece.type === PieceType.TELEPORTER) {
        const [x, y] = key.split(',').map(Number);
        teleporters.push({ x, y, key });
      }
    });

    // Check preplaced pieces
    if (level.preplacedPieces) {
      level.preplacedPieces.forEach(pp => {
        if (pp.piece.type === PieceType.TELEPORTER) {
          const key = `${pp.position.x},${pp.position.y}`;
          if (!teleporters.find(t => t.key === key)) {
            teleporters.push({ x: pp.position.x, y: pp.position.y, key });
          }
        }
      });
    }

    // Create pairs (teleporter 0 connects to 1, 1 to 0, 2 to 3, etc.)
    const pairs: Record<string, Position> = {};
    for (let i = 0; i < teleporters.length; i += 2) {
      if (i + 1 < teleporters.length) {
        pairs[teleporters[i].key] = { x: teleporters[i + 1].x, y: teleporters[i + 1].y };
        pairs[teleporters[i + 1].key] = { x: teleporters[i].x, y: teleporters[i].y };
      }
    }

    return pairs;
  }
};
