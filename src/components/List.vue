<script lang="ts">
import Vue from "vue";

import { ListItems } from "@/types";

export default Vue.extend({
  name: "List",
  props: {
    listItems: {
      type: Object as () => ListItems,
    },
  },
});
</script>

<template>
  <ul v-if="listItems" class="list">
    <li v-for="(value, key) in listItems" :key="`${key}-${value}`">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
	display: inline-block;
	min-width: 200px;
	margin: 0;
	padding: 0;
	text-align: left;
	font-family: "Press Start 2P", cursive;
	font-size: 0.7rem;
	line-height: 1rem;
	letter-spacing: -0.08rem;
	list-style-type: none;
}
</style>
