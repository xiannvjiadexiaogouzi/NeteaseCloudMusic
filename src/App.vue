<template>
  <div id="app" :style="{paddingBottom: showPlayer ? '1.4rem' : '1rem'}">
    <router-view />
    <player v-show="showPlayer" />
    <bottom-menu />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BottomMenu from "./components/BottomMenu";
import Player from "./components/Player";

export default {
  name: "app",
  components: {
    BottomMenu,
    Player
  },
  computed: {
    ...mapState("player", ["showPlayer"])
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 0.2rem;
  // overflow: auto;
  // padding-bottom: 1.4rem;
  .bottom-menu {
    position: fixed;
    bottom: 0;
  }
}
</style>
