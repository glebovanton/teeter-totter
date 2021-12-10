<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import Figure from "@/components/Figure.vue";
import {
  airSpaceClass,
  boardClass,
  boardWidth,
  energyDifferenceLimit,
  figureId,
  headerClass,
  initGameStateValue,
} from "@/constants";

export default Vue.extend({
  name: "AirSpace",
  components: {
    Figure,
  },
  data() {
    return {
      airSpaceClass,
      figureId,
      figureBottomLimit: null,
      timerId: null,
    };
  },
  computed: {
    ...mapGetters([
      "isAutoGame",
      "boardBendingAngle",
      "isBoardAngleWithinLimits",
      "sidesEnergyDifference",
    ]),
    ...mapState(["fallingInterval", "fallingFigures", "isGamePaused"]),
    fallingFigureEl() {
      const { id } = this.fallingFigures[0];

      return document.getElementById(`${figureId}${id}`);
    },
  },
  mounted() {
    const boardEl = document.querySelector(`.${boardClass}`);
    boardEl?.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFallingFigure);
    this.$once("hook:beforeDestroy", () => {
      boardEl?.removeEventListener(
        "transitionend",
        this.handleBoardTransitionEnd
      );
      window.removeEventListener("keydown", this.moveFallingFigure);
    });
  },
  watch: {
    isAutoGame: {
      handler(current) {
        if (current) {
          window.removeEventListener("keydown", this.moveFallingFigure);
        } else {
          window.addEventListener("keydown", this.moveFallingFigure);
        }
      },
    },
    isGamePaused: {
      handler(current) {
        if (current) {
          clearInterval(this.timerId);
        } else {
          this.getFigureBottomLimit();
          this.animateFigure();
        }
      },
    },
    sidesEnergyDifference: {
      handler(current) {
        if (current > energyDifferenceLimit) {
          this.setIsGameOver(true);
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      "addLeftSideFigures",
      "generateFigure",
      "moveFigure",
      "setIsGameOver",
      "setGameState",
      "toggleModal",
      "updateFallingInterval",
    ]),
    animateFigure(): void {
      const speedPitch = 1;
      this.timerId = setInterval(() => {
        let fallingFigure = this.fallingFigures?.[0];
        if (fallingFigure) {
          if (fallingFigure.top >= this.figureBottomLimit) {
            const leftSideFigure = this.fallingFigures.shift();
            clearInterval(this.timerId);
            this.addLeftSideFigures(leftSideFigure);
            this.updateFallingInterval();
            this.generateFigure();
            this.animateFigure();
          } else {
            fallingFigure.top = fallingFigure.top + speedPitch;
            this.fallingFigureEl.style.top = `${fallingFigure.top}px`;
          }
        }
      }, this.fallingInterval);
    },

    getFigureBottomLimit(): void {
      const boardBounds = document
        ?.querySelector(`.${boardClass}`)
        ?.getBoundingClientRect();
      const panelBounds = document
        ?.querySelector(`.${headerClass}`)
        ?.getBoundingClientRect();
      const figureBounds = this.fallingFigureEl.getBoundingClientRect();

      if (boardBounds) {
        const totterCathet = boardBounds.bottom - boardBounds.top;
        const similarCathet =
          (this.fallingFigures[0].left * totterCathet) / boardWidth;

        if (figureBounds && panelBounds) {
          this.figureBottomLimit =
            this.boardBendingAngle >= 0
              ? boardBounds.top +
                similarCathet -
                figureBounds.height -
                panelBounds.height
              : boardBounds.bottom -
                similarCathet -
                figureBounds.height -
                panelBounds.height;
        }
      }
    },

    handleBoardTransitionEnd(): void {
      if (this.isGamePaused) return;

      if (this.isBoardAngleWithinLimits) {
        this.getFigureBottomLimit();
      } else {
        this.setGameState(initGameStateValue);
        this.setIsGameOver(true);
      }
    },

    moveFallingFigure({ keyCode }: { keyCode: number }): void {
      const leftArrowKey = 37;
      const rightArrowKey = 39;
      const isArrowKeyPressed: boolean = [leftArrowKey, rightArrowKey].includes(
        keyCode
      );
      if (this.isGamePaused || !isArrowKeyPressed) return;
      const figureWidth = this.fallingFigureEl.getBoundingClientRect().width;
      const areaWidth = document
        ?.querySelector(`.${airSpaceClass}`)
        ?.getBoundingClientRect().width;
      if (areaWidth && figureWidth) {
        this.moveFigure({
          isMoveLeft: keyCode === leftArrowKey,
          width: (figureWidth / areaWidth) * 100,
        });
      }
      this.$nextTick(this.getFigureBottomLimit);
    },
  },
});
</script>

<template>
  <div :class="['air-space', airSpaceClass]">
    <Figure
      v-for="figure in fallingFigures"
      :key="figure.id"
      :figure="figure"
      :id="`${figureId}${figure.id}`"
    />
  </div>
</template>

<style lang="scss" scoped>
.air-space {
	position: relative;
	flex: 1;
	width: 100%;
	padding-top: $spacer * 2;

	.figure {
		z-index: $base-z-index + 3;
	}
}
</style>
