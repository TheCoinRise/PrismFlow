import { StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { LightBeam as LightBeamType } from '../types/game';
import { ColorMixer } from '../utils/colorMixer';

interface LightBeamsProps {
  beams: LightBeamType[];
  cellSize: number;
  gridWidth: number;
  gridHeight: number;
}

export function LightBeams({ beams, cellSize, gridWidth, gridHeight }: LightBeamsProps) {
  if (!beams || beams.length === 0) {
    return null;
  }

  const svgWidth = gridWidth * cellSize;
  const svgHeight = gridHeight * cellSize;

  return (
    <Svg
      width={svgWidth}
      height={svgHeight}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      {beams.map((beam, index) => {
        // Convert grid coordinates to pixel coordinates (center of cells)
        const x1 = (beam.x1 + 0.5) * cellSize;
        const y1 = (beam.y1 + 0.5) * cellSize;
        const x2 = (beam.x2 + 0.5) * cellSize;
        const y2 = (beam.y2 + 0.5) * cellSize;

        const color = ColorMixer.toCSS(beam.color);

        return (
          <Line
            key={`beam-${index}-${beam.x1}-${beam.y1}-${beam.x2}-${beam.y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={5}
            strokeOpacity={0.9}
            strokeLinecap="round"
          />
        );
      })}
    </Svg>
  );
}
