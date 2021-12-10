import { boardAngle, boardWidth } from "@/constants";
import { getFiguresProportion } from "@/helpers";
import { State } from "@/store/state";
import { Figure } from "@/types";

export function boardBendingAngle(
  state: State,
  {
    leftSideFiguresSum,
    rightSideFiguresSum,
  }: { leftSideFiguresSum: number; rightSideFiguresSum: number }
): number {
  let angle = 0;

  if (!leftSideFiguresSum) {
    angle = boardAngle;
  } else {
    const subtraction = Math.abs(leftSideFiguresSum - rightSideFiguresSum);

    angle =
      leftSideFiguresSum > rightSideFiguresSum
        ? (subtraction / leftSideFiguresSum) * -50
        : (subtraction / rightSideFiguresSum) * 50;
  }

  return angle;
}

export function fallingFigures({ fallingFigures }: State): Figure[] {
  return fallingFigures;
}

export function isAutoGame({ isAutoGame }: State): boolean {
  return isAutoGame;
}

export function isBoardAngleWithinLimits(
  state: State,
  { boardBendingAngle }: { boardBendingAngle: number }
): boolean {
  return boardBendingAngle > -boardAngle && boardBendingAngle < boardAngle;
}

export function isGameOver({ isGameOver }: State): boolean {
  return isGameOver;
}

export function isGamePaused({ isGamePaused }: State): boolean {
  return isGamePaused;
}

export function leftSideEnergy({ leftSideFigures }: State): number {
  return leftSideFigures.reduce(
    (total, current) =>
      (total += (boardWidth / 2 - current.left) * current.weight),
    0
  );
}

export function leftSideFigures({ leftSideFigures }: State): Figure[] {
  return leftSideFigures;
}

export function leftSideFiguresSum({ leftSideFigures }: State): number {
  return getFiguresProportion(leftSideFigures, true);
}

export function rightSideEnergy({ rightSideFigures }: State): number {
  return rightSideFigures.reduce(
    (total, current) => (total += current.left * current.weight),
    0
  );
}

export function rightSideFigures({ rightSideFigures }: State): Figure[] {
  return rightSideFigures;
}

export function rightSideFiguresSum({ rightSideFigures }: State): number {
  return getFiguresProportion(rightSideFigures);
}

export function sidesEnergyDifference(
  state: State,
  {
    leftSideEnergy,
    rightSideEnergy,
  }: { leftSideEnergy: number; rightSideEnergy: number }
): number {
  return Math.abs(leftSideEnergy - rightSideEnergy);
}
