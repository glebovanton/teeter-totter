import { Commit } from "vuex";
import { initGameStateValue } from "@/constants";
import { State } from "@/store/state";

export function autoGame({
  commit,
  state,
}: {
  commit: Commit;
  state: State;
}): void {
  commit("setAutoGame", !state.isAutoGame);
}

export function resetGame({ commit }: { commit: Commit }): void {
  commit("setGameState", initGameStateValue);
  commit("setIsGameOver", false);

  commit("updateFallingInterval", true);
  commit("clearFigures");

  commit("generateFigure");
  commit("generateFigure");

  commit("generateFigure", true);
}

export function toggleGameState({
  commit,
  state,
}: {
  commit: Commit;
  state: State;
}): void {
  commit("setGameState", !state.isGamePaused);
}
