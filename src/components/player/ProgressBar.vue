<template>
  <div class="progress-bar">
    <span class="time" v-show="see">{{convertMin(progressTime)}}</span>
    <span ref="progress" class="progress-line">
      <i class="progress-inline" :style="{width: progressChange ? changeDis : progress}"></i>
      <i
        v-show="see"
        ref="progressButton"
        class="progress-button"
        :style="{left: progressChange ? changeDis : progress}"
        @click="handleProgress"
      />
    </span>
    <span class="time" v-show="see">{{convertMin(duration)}}</span>
  </div>
</template>

<script>
import { convertMin } from "../../assets/js/util";
import { mapState, mapMutations } from "vuex";
import { getStyle } from "../../assets/js/util";
import { parse } from "querystring";

export default {
  props: {
    progressTime: {
      type: Number,
      default: 0
    },
    see: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      progressChange: false,
      changeDis: 0
    };
  },
  mounted() {
    this.drag = {};
    let el = this.$refs.progressButton;
    el.addEventListener("touchstart", e => {
      this.handleTouchStart(e);
    });
    el.addEventListener("touchmove", e => {
      this.handleTouchMove(e);
    });
    el.addEventListener("touchend", e => {
      this.handleTouchEnd(e);
    });
  },
  computed: {
    ...mapState("player", ["el", "duration"]),
    progress() {
      return this.duration
        ? (this.progressTime / this.duration) * 100 + "%"
        : "0%";
    }
  },
  methods: {
    ...mapMutations("player", ["togglePlay"]),
    convertMin,
    handleProgress() {},
    handleTouchStart(e) {
      let drag = this.drag;
      let touch = e.touches[0];
      drag.startTime = new Date();
      drag.startLeft = touch.clientX;
      drag.startTop = touch.clientY;
      drag.startPer = parseFloat(this.progress) / 100; // 起始进度
      drag.width = parseFloat(getStyle(this.$refs.progress, "width")); // 进度条总长度
      drag.elWidth = parseFloat(getStyle(this.$refs.progressButton, "width")); // 进度条总长度
      drag.progressStart = drag.startPer * drag.width; // 起始进度
      // button变大
      let el = this.$refs.progressButton;
      el.style.width = ".2rem";
      el.style.height = ".2rem";
    },
    handleTouchMove(e) {
      let drag = this.drag;
      let touch = e.touches[0];
      drag.curLeft = touch.clientX;
      drag.curTop = touch.clientY;
      let disLeft = drag.curLeft - drag.startLeft;
      let disTop = drag.curTop - drag.startTop;
      let disX = Math.abs(disLeft);
      let disY = Math.abs(disTop);
      drag.direction = disLeft < 0 ? "left" : "right";
      // 判断纵向划动，如果是纵向 或 横向小于按钮宽度，取消划动
      if (disX < drag.elWidth || disY >= disX * 1.5) {
        return;
      }
      this.progressChange = true;
      // 修正最大划动距离
      let maxDisX =
        drag.direction === "left"
          ? drag.progressStart
          : drag.width - drag.progressStart;
      drag.disX = Math.min(disX, maxDisX);
      let dis =
        drag.direction === "left"
          ? drag.progressStart - drag.disX
          : drag.progressStart + drag.disX;
      this.changeDis = `${(dis / drag.width) * 100}%`;
    },
    handleTouchEnd(e) {
      // 修改音乐进度
      this.el.currentTime = this.duration * (parseFloat(this.changeDis) / 100);
      this.togglePlay(true);
      // 还原
      this.drag = {};
      this.progressChange = false;
      this.changeDis = 0;
      let el = this.$refs.progressButton;
      el.style.width = ".1rem";
      el.style.height = ".1rem";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.progress-bar {
  // flex: 1 0 auto;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .time {
    padding: 0 0.1rem;
    color: $grey;
  }
  .progress-time {
    font-size: 0.14rem;
  }
  .progress-line {
    flex: 1 0 auto;
    height: 0.03rem;
    background: $darkgrey;
    position: relative;
    .progress-inline {
      display: block;
      height: 100%;
      transition: all 0 ease;
      background: $red;
      transition: all 0;
    }
    .progress-button {
      width: 0.1rem;
      height: 0.1rem;
      position: absolute;
      background: $red;
      transform: translateX(-50%) translateY(-50%);
      transition: all 0;
      border-radius: 50%;
      touch-action: none;
    }
  }
}
</style>