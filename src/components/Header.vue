<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

import GameButton from "@/components/GameButton.vue";
import List from "@/components/List.vue";
import { headerClass } from "@/constants";
import { Color, Figure } from "@/types";

export default Vue.extend({
  name: "Header",
  components: {
    GameButton,
    List,
  },
  data() {
    return {
      Color,
      headerClass,
    };
  },
  computed: {
    ...mapGetters([
      "isAutoGame",
      "isGamePaused",
      "fallingFigures",
      "leftSideEnergy",
      "leftSideFigures",
      "rightSideEnergy",
      "rightSideFigures",
    ]),
    currentLeftWeight(): number {
      return this.fallingFigures?.[0]?.weight;
    },
    currentRightWeight(): number {
      return (
        this.rightSideFigures?.[this.rightSideFigures.length - 1]?.weight ?? 0
      );
    },
    totalLeftSideFiguresWeight() {
      return this.getTotalWeight(this.leftSideFigures);
    },

    totalRightSideFiguresWeight() {
      return this.getTotalWeight(this.rightSideFigures);
    },
  },
  methods: {
    ...mapActions([
      "autoGame",
      "pauseGameTime",
      "resetGame",
      "startGameTime",
      "toggleGameState",
    ]),
    getTotalWeight(figures: Figure[] = []): number {
      return figures.reduce((total, current) => (total += current.weight), 0);
    },
  },
});
</script>

<template>
  <header :class="['page-header', headerClass]">
    <List
      :listItems="{
        'Total weight': `${totalLeftSideFiguresWeight} kg`,
        Current: `${currentLeftWeight} kg`,
        Energy: `${leftSideEnergy} kgm`,
      }"
    />
    <div class="center">
      <GameButton
        :color="Color.Green"
        :label="isGamePaused ? 'Play' : 'Pause'"
        @click.native="toggleGameState"
      />
      <GameButton :color="Color.Red" label="Reset" @click.native="resetGame" />
      <GameButton
        :color="Color.Yellow"
        label="Auto"
        @click.native="autoGame"
        :isSelected="isAutoGame"
      />
    </div>
    <List
      :listItems="{
        'Total weight': `${totalRightSideFiguresWeight} kg`,
        Current: `${currentRightWeight} kg`,
        Energy: `${rightSideEnergy} kgm`,
      }"
    />
  </header>
</template>

<style lang="scss" scoped>
$max-mobile: 667px;

.page-header {
	display: flex;
	justify-content: space-between;
	width: 100%;

	@media screen and (max-width: $max-mobile) {
		.center {
			position: absolute;
			top: $spacer * 2;
			right: 0;
			z-index: $base-z-index;
			display: flex;
			flex-direction: column;

			.eightbit-btn {
				min-width: 60px;
				font-size: 0.5rem;
			}
		}
	}
}
</style>
