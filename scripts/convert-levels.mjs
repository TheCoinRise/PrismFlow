#!/usr/bin/env node
/**
 * Convert levels.js from web version to TypeScript levels.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_LEVELS_PATH = join(__dirname, '../../prismflow-web/levels.js');
const OUTPUT_PATH = join(__dirname, '../src/data/levels.ts');

// Read the web levels file
const content = readFileSync(WEB_LEVELS_PATH, 'utf-8');

// Extract LEVELS object content
const levelsMatch = content.match(/const LEVELS = \{([\s\S]*)\};/);
if (!levelsMatch) {
  throw new Error('Could not find LEVELS object in levels.js');
}

let levelsContent = levelsMatch[1];

// Replace JavaScript references with TypeScript
levelsContent = levelsContent
  // Replace PIECE_TYPES references
  .replace(/PIECE_TYPES\./g, 'PieceType.')
  // Replace COLORS references
  .replace(/COLORS\./g, 'COLORS.')
  // Replace direction strings with Direction enum values
  .replace(/direction: 'up'/g, "direction: Direction.UP")
  .replace(/direction: 'down'/g, "direction: Direction.DOWN")
  .replace(/direction: 'left'/g, "direction: Direction.LEFT")
  .replace(/direction: 'right'/g, "direction: Direction.RIGHT")
  // Replace object keys from 'w1_l1' to proper format
  .replace(/'([w\d]+_l\d+)':/g, "'$1':");

// Create the TypeScript file
const tsContent = `// PrismFlow Mobile - Level Data
// Ported from web version with all 80 levels

import { Level, PieceType, COLORS, Direction } from '../types/game';

export const LEVELS: Record<string, Level> = {${levelsContent}};

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
`;

writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
console.log(`✅ Converted levels to TypeScript: ${OUTPUT_PATH}`);
console.log(`   Total size: ${tsContent.length} bytes`);
