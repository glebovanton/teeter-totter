<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import Figure from "@/components/Figure.vue";
import { boardClass } from "@/constants";

export default Vue.extend({
  name: "TeeterTotter",
  components: {
    Figure,
  },
  data() {
    return {
      boardClass,
    };
  },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["leftSideFigures", "rightSideFigures"]),
    boardStyles(): { [key: string]: string } {
      return {
        transform: `rotate(${this.boardBendingAngle / 2}deg)`,
      };
    },
    figuresDiff(): number {
      return this.leftSideFigures.length - this.rightSideFigures.length;
    },
  },
  watch: {
    figuresDiff(current: number) {
      if (current && this.isBoardAngleWithinLimits) {
        this.generateFigure(true);
      }
    },
  },
  methods: {
    ...mapMutations(["generateFigure"]),
  },
});
</script>

<template>
  <div class="teeter-totter">
    <div :class="['teeter-totter__top', boardClass]" :style="boardStyles">
      <Figure
        v-for="figure in leftSideFigures"
        :key="figure.id"
        :figure="figure"
      ></Figure>
      <Figure
        v-for="figure in rightSideFigures"
        :key="figure.id"
        :figure="figure"
        :is-right-side="true"
      ></Figure>
    </div>
    <div class="teeter-totter__base"></div>
  </div>
</template>

<style lang="scss" scoped>
$basement-height: 120px;
$rotate-transition: 200ms;

.teeter-totter {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	padding-bottom: calc(#{$spacer} * 2);

	&__top {
		position: relative;
		bottom: -3px;
		z-index: $base-z-index + 2;
		width: 100%;
		border-bottom: 5px solid $primary-red;
		transition: $rotate-transition ease-in-out;

		.figure {
			bottom: 0;
			z-index: -1;
		}
	}

	&__base {
		width: 0;
		height: 0;
		border-width: 0 calc(#{$basement-height} / 3) $basement-height
			calc(#{$basement-height} / 3);
		border-style: solid;
		border-color: transparent transparent $primary-green transparent;
	}
}
</style>
