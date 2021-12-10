import {
  boardWidth,
  maxFallingInterval,
  maxWeight,
  minFallingInterval,
  minWeight,
  scaleRatio,
} from "@/constants";
import { generateDarkRGBAColor, generateInt, getID } from "@/helpers";
import { State } from "@/store/state";
import { Figure, FigureType } from "@/types";

export function addLeftSideFigures(state: State, figure: Figure): void {
  state.leftSideFigures.push(figure);
}

export function clearFigures(state: State): void {
  state.leftSideFigures = [];
  state.rightSideFigures = [];
  state.fallingFigures = [];
}

export function generateFigure(state: State, isRightSide = false): void {
  const color = generateDarkRGBAColor();
  const id = getID();
  const left = generateInt(0, 40);
  const top = 0;
  const typesArray = Object.keys(FigureType);
  const type = FigureType[typesArray[generateInt(0, typesArray.length)]];
  const weight = generateInt(minWeight, maxWeight);
  const scale = 1 + scaleRatio * weight;
  const figure: Figure = { id, color, left, scale, top, type, weight };

  state[isRightSide ? "rightSideFigures" : "fallingFigures"].push(figure);
}

export function moveFigure(
  { fallingFigures }: State,
  { isMoveLeft, width }: { isMoveLeft: boolean; width: number }
): void {
  const [figure] = fallingFigures;
  const ratio = 3;

  const canMoveLeft = figure.left - ratio >= 0;
  const canMoveRight = figure.left + width + ratio <= boardWidth / 2;

  if (isMoveLeft) {
    canMoveLeft && (figure.left = figure.left - ratio);
  } else {
    canMoveRight && (figure.left = figure.left + ratio);
  }
}

export function updateFallingInterval(state: State, isReset = false): void {
  if (isReset) {
    state.fallingInterval = maxFallingInterval;
  } else if (state.fallingInterval > minFallingInterval) {
    state.fallingInterval--;
  }
}

export function setAutoGame(state: State, autoGame = false): void {
  state.isAutoGame = autoGame;
}

export function setGameState(state: State, isGamePaused: boolean): void {
  state.isGamePaused = isGamePaused;
}

export function setIsGameOver(state: State, isGameOver = false): void {
  state.isGameOver = isGameOver;
}
