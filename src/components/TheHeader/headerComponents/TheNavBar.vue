<template>
  <nav>
    <ul class="mainNavList">
      <nav-bar-item
        v-for="title in navBarItems"
        :title="title"
        :key="title"
      ></nav-bar-item>
    </ul>
  </nav>
</template>
<script>
import NavBarItem from "./navBarItem.vue";
import { ref } from "vue";
export default {
  components: {
    NavBarItem,
  },
  setup() {
    const navBarItems = ref([
      "Spinning",
      "Bait Fishing",
      "Fly Fishing",
      "Casting",
    ]);
    return { navBarItems };
  },
};
</script>
<style lang='scss'>
nav {
  position: relative;
  width: 100%;
  max-width: 150rem;
  height: 4rem;
  z-index: 1000;
  ul {
    @include flexLayout;
    width: 100%;
    height: 100%;
    justify-content: space-around;
  }
}
</style>