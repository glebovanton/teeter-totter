<script lang="ts">
import Vue from "vue";

import { Color } from "@/types";

export default Vue.extend({
  name: "GameButton",
  props: {
    color: {
      type: String as () => Color,
      default: Color.Grey,
    },
    label: {
      type: String,
      default: "",
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <button :class="['eightbit-btn', color, { selected: isSelected }]">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
$outline-width: 6px;
$shadow-width: 4px;

$gameButtons: (
	"green": $primary-green,
	"red": $primary-red,
	"yellow": $primary-yellow,
	"grey": grey,
);

@each $gameButton, $color in $gameButtons {
	.#{$gameButton} {
		background: $color;
		box-shadow: inset (-$shadow-width) (-$shadow-width) 0 0 darken($color, 20%);

		&:hover,
		&:focus {
			background: darken($color, 10%);
			box-shadow: inset
				(-$shadow-width * 1.5)
				(-$shadow-width * 1.5)
				0
				0
				darken($color, 20%);
		}

		&:active {
			box-shadow: inset $shadow-width $shadow-width 0 0 darken($color, 20%);
		}
	}
}

.eightbit-btn {
	position: relative;
	display: inline-block;
	min-width: 100px;
	padding: calc(#{$spacer} / 4);
	text-align: center;
	text-decoration: none;
	color: #fff;
	font-family: "Press Start 2P", cursive;
	font-size: 15px;
	cursor: pointer;

	&::before,
	&::after {
		content: "";
		position: absolute;
		box-sizing: content-box;
		width: 100%;
		height: 100%;
	}

	&::before {
		top: -$outline-width;
		left: 0;
		border-top: $outline-width #000 solid;
		border-bottom: $outline-width #000 solid;
	}

	&::after {
		top: 0;
		left: -$outline-width;
		border-right: $outline-width #000 solid;
		border-left: $outline-width #000 solid;
	}

	&.selected {
		color: #808080;

		&::before {
			border-bottom-width: calc(#{$outline-width} + 1px);
		}
	}
}
</style>
