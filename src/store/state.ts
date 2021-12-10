import { initGameStateValue, maxFallingInterval } from "@/constants";
import { Figure } from "@/types";

export interface State {
  fallingFigures: Figure[];
  fallingInterval: number;
  isAutoGame: boolean;
  isGamePaused: boolean;
  isGameOver: boolean;
  leftSideFigures: Figure[];
  rightSideFigures: Figure[];
}

export const state = {
  fallingFigures: [],
  fallingInterval: maxFallingInterval,
  isAutoGame: false,
  isGamePaused: initGameStateValue,
  isGameOver: false,
  leftSideFigures: [],
  rightSideFigures: [],
};
