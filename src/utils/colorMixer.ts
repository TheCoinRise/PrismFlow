import { Color } from '../types/game';
import { PieceType } from '../types/game';

const COLOR_TOLERANCE = 30;

export const ColorMixer = {
  add: (color1: Color, color2: Color): Color => {
    return {
      r: Math.min(255, color1.r + color2.r),
      g: Math.min(255, color1.g + color2.g),
      b: Math.min(255, color1.b + color2.b)
    };
  },

  filter: (color: Color, filterType: PieceType): Color => {
    switch (filterType) {
      case PieceType.FILTER_RED:
        return { r: color.r, g: 0, b: 0 };
      case PieceType.FILTER_GREEN:
        return { r: 0, g: color.g, b: 0 };
      case PieceType.FILTER_BLUE:
        return { r: 0, g: 0, b: color.b };
      default:
        return color;
    }
  },

  split: (color: Color): { red: Color; green: Color; blue: Color } => {
    const intensity = (color.r + color.g + color.b) / 3 / 255;
    return {
      red: { r: Math.round(color.r * intensity), g: 0, b: 0 },
      green: { r: 0, g: Math.round(color.g * intensity), b: 0 },
      blue: { r: 0, g: 0, b: Math.round(color.b * intensity) }
    };
  },

  matches: (color1: Color, color2: Color, tolerance: number = COLOR_TOLERANCE): boolean => {
    return Math.abs(color1.r - color2.r) <= tolerance &&
           Math.abs(color1.g - color2.g) <= tolerance &&
           Math.abs(color1.b - color2.b) <= tolerance;
  },

  isBlack: (color: Color): boolean => {
    return color.r === 0 && color.g === 0 && color.b === 0;
  },

  toCSS: (color: Color): string => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  },

  toHex: (color: Color): string => {
    const r = color.r.toString(16).padStart(2, '0');
    const g = color.g.toString(16).padStart(2, '0');
    const b = color.b.toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  },

  fromHex: (hex: string): Color => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
};
