import { boardWidth } from "@/constants";
import { Figure } from "@/types";

let uuid = 0;

export function generateDarkRGBAColor(): string {
  const alpha = 0.9;
  const maxIntensity = 256;
  const intensity = maxIntensity / 2;
  const blue = generateInt(0, intensity);
  const green = generateInt(0, intensity);
  const red = generateInt(0, intensity);

  return `rgb(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generateInt(min = 0, max = 1): number {
  return min + Math.floor(Math.random() * max);
}

export function getFiguresProportion(
  figures: Figure[] = [],
  leftSide = false
): number {
  return figures.reduce((total, current: Figure) => {
    const left = leftSide ? boardWidth / 2 - current.left : current.left;
    total += current.weight * left;

    return total;
  }, 0);
}

export function getID(): number {
  return uuid++;
}
