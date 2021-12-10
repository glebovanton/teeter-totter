<script lang="ts">
import Vue from "vue";

import { boardWidth } from "@/constants";
import { Figure } from "@/types";

export default Vue.extend({
  name: "Figure",
  props: {
    isOnBoard: {
      type: Boolean,
      default: false,
    },
    isRightSide: {
      type: Boolean,
      default: false,
    },
    figure: {
      type: Object as () => Figure,
      required: true,
    },
  },
  computed: {
    cssVars() {
      return {
        "--figure-color": this.figure.color,
        "--figure-scale": this.figure.scale,
      };
    },
  },
  mounted() {
    this.setAppearance();
    this.$watch("figure.left", this.setPosition, { immediate: true });
  },
  methods: {
    setAppearance() {
      const { style } = this.$el;
      if (this.isOnBoard) {
        style.transform += " translateY(-100%)";
      }
    },
    setPosition(left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.isRightSide ? boardWidth / 2 + 10 : 0;
      this.$el.style.left =
        this.isRightSide && left > boardWidth / 4
          ? `calc(${start + left}% - ${width}px)`
          : `${start + left}%`;
    },
  },
});
</script>

<template>
  <div :class="['figure', figure.type]" :style="cssVars">
    <p class="text">
      <b>{{ figure.weight }}</b> kg
    </p>
  </div>
</template>

<style lang="scss" scoped>
$font-size: 0.7rem;

.figure {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: $font-size;
	transform: scale(var(--figure-scale));
	transform-origin: bottom left;

	&.square,
	&.circle {
		width: 2rem;
		height: 2rem;
		background-color: var(--figure-color);
	}

	&.circle {
		border-radius: 50%;
	}

	&.triangle {
		width: 0;
		height: 0;
		border-right: 2rem solid transparent;
		border-bottom: 2rem solid var(--figure-color);
		border-left: 2rem solid transparent;
	}

	.text {
		position: absolute;
		top: 0;
		width: 4.5rem;
		text-align: center;
		user-select: none;
	}
}
</style>
