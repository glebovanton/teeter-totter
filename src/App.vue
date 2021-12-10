<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

import AirSpace from "@/components/AirSpace.vue";
import GameOver from "@/components/GameOver.vue";
import Header from "@/components/Header.vue";
import TeeterTotter from "@/components/TeeterTotter.vue";

export default Vue.extend({
  name: "App",
  components: {
    AirSpace,
    GameOver,
    Header,
    TeeterTotter,
  },
  computed: {
    ...mapGetters(["isGameOver"]),
  },
  created() {
    this.resetGame();
  },
  methods: {
    ...mapActions(["resetGame"]),
  },
});
</script>

<template>
  <div id="app">
    <Header />
    <AirSpace />
    <TeeterTotter />
    <GameOver v-if="isGameOver" />
  </div>
</template>

<style lang="scss">
#app {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-height: 100vh;
	margin: 0 calc(#{$spacer});
	padding-top: calc(#{$spacer} / 3);
	overflow: hidden;
	text-align: center;
	color: #2c3e50;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
