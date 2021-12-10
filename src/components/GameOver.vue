<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

import GameButton from "@/components/GameButton.vue";
import { Color } from "@/types";

export default Vue.extend({
  name: "GameOver",
  components: {
    GameButton,
  },
  data() {
    return {
      Color,
    };
  },
  methods: {
    ...mapActions(["resetGame"]),
  },
});
</script>

<template>
  <div class="game-over">
    <header class="pen-intro">
      <h1>Game over</h1>
    </header>
    <hr />
    <GameButton
      :color="Color.Green"
      label="Play again"
      @click.native="resetGame"
    />
  </div>
</template>

<style lang="scss" scoped>
.game-over {
	position: absolute;
	top: 0;
	left: 0;
	z-index: $modal-z-index;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	font-family: "Press Start 2P", cursive;
	background: radial-gradient(circle, #fff 7%, $primary-red 66%);
}
</style>
