<template>
  <transition name="control-show">
    <div class="control">
      <btn :icon="nowPlayMode.icon" :see="see" @control="handleMode" />
      <btn :icon="`backward`" :see="see" @control="handleNextPre(pre)" />
      <btn :icon="playBtn" @control="handlePlay" />
      <btn :icon="`forward`" :see="see" @control="handleNextPre(next)" />
      <btn :icon="`list-ul`" @control="$emit('handleMyList')" />
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import Btn from "./Btn";
export default {
  name: "control",
  components: {
    Btn
  },
  props: {
    see: Boolean
  },
  computed: {
    ...mapState("player", ["el", "isPause"]),
    ...mapGetters("player", ["next", "pre", "nowPlayMode"]),
    playBtn() {
      return this.isPause ? "play" : "pause";
    }
  },
  methods: {
    ...mapMutations("player", ["togglePlay", "handleMode"]),
    ...mapActions("player", ["handleMusic"]),
    handlePlay() {
      this.togglePlay();
      this.$emit("handleDisk");
    },
    handleNextPre(newSong) {
      if (this.nowPlayMode.name === "random") {
        this.$parent.randomPlay();
        return
      }
      this.handleMusic(newSong);
    },
  }
};
</script>

<style lang="scss" scoped>
.control {
  height: 0.4rem;
  width: 20%;
  display: flex;
  justify-content: space-around;
  font-size: 0.3rem;
  position: absolute;
  bottom: 0.1rem;
  right: 0.2rem;
  transition: all 0.5s ease;
  overflow: hidden;
}
</style>