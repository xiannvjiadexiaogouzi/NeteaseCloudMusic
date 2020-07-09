<template>
  <transition name="up">
    <div class="player" :class="{playPage:playPageOn}" @click="handlePlayPage(true)">
      <page-title
        :title="nowSongInfo.name"
        :left="'angle-down'"
        @handleLeft="handlePlayPage(false)"
        v-if="playPageOn"
      />
      <p class="song-info-page" v-show="playPageOn">{{artist}}</p>
      <div class="disk" :class="{rotate: !isPause}">
        <img v-if="nowSongInfo.picUrl" :src="nowSongInfo.picUrl" alt ref="disk" />
        <img v-if="nowSongInfo.al" :src="nowSongInfo.al.picUrl" alt ref="disk" />
      </div>
      <div class="player-info">
        <p class="song-name" v-show="!playPageOn">{{nowSongInfo.name}}</p>
        <p class="song-info" v-show="!playPageOn">{{artist}}</p>
        <progress-bar :progressTime="progressTime" :see="playPageOn" />
      </div>
      <control :see="playPageOn" @handleDisk="handleDisk" @handleMyList="handleMyList" />
      <audio
        :src="nowPlay"
        ref="audio"
        @canplay="handleAutoplay"
        @timeupdate="getProgressTime"
        @ended="handleEnd"
      />
      <my-list :show="showMyList" @handleMyList="handleMyList" />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { random } from "../assets/js/util";
import PageTitle from "./page/PageTitle";
import Control from "./player/Control";
import ProgressBar from "./player/ProgressBar";
import MyList from "./player/MyList";

export default {
  components: {
    PageTitle,
    Control,
    ProgressBar,
    MyList
  },
  data() {
    return {
      playPageOn: false,
      progressTime: 0,
      deg: 0,
      timer: null,
      showMyList: false,
      randomList: []
    };
  },
  mounted() {
    this.bindEl(this.$refs.audio);
    this.el.loop = true;
  },
  updated() {
    // console.log(this.$refs.audio);
  },
  computed: {
    ...mapState("player", [
      "el",
      "nowPlay",
      "playList",
      "nowSongInfo",
      "isPause",
      "duration"
    ]),
    ...mapGetters("player", [
      "artist",
      "nowPlayMode",
      "next",
      "playListLength",
      "nowIndex"
    ])
  },
  methods: {
    ...mapMutations("player", ["bindEl", "getDuration", "togglePlay"]),
    ...mapActions("player", ["autoplay", "handleMusic"]),
    // 伸展/缩小播放页面
    // $boolean - false-关闭page; true就打开; 不传不处理
    handlePlayPage(boolean) {
      if (typeof boolean !== "boolean") return;
      this.playPageOn = boolean;
    },
    // 获取当前播放时长
    getProgressTime(e) {
      this.progressTime = e.target.currentTime;
    },
    // 唱片旋转
    handleDisk() {
      // 在isPause变化之后判断旋转状态 - true不转，false转
      if (!this.isPause) {
        this.timer = setInterval(() => {
          this.deg++;
          this.$refs.disk.style.transform = `rotate(${this.deg}deg)`;
          if (this.progressTime === this.duration) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 50);
      } else if (this.isPause) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.deg = this.progressTime && this.duration ? this.deg : 0;
    },
    // 当duration准备好时自动播放
    handleAutoplay() {
      this.togglePlay(true);
      this.handleDisk(); // 先初始化一遍disk
      this.autoplay();
      this.handleDisk();
    },
    // 打开 / 关闭 播放列表
    handleMyList(isShow) {
      this.showMyList =
        typeof isShow === "undefined" ? !this.showMyList : isShow;
    },
    handleEnd() {
      this.togglePlay(true);
      switch (this.nowPlayMode.name) {
        case "single":
          break; // 自动进入loop，不会触发handleEnd函数
        case "list":
          this.handleMusic(this.next);
          break;
        case "random":
          this.randomPlay();
          break;
      }
    },
    randomPlay() {
      // 用一个数字数组来替代播放列表数据
      if (!this.randomList.length ) {
        this.randomList = [];
        for (let i = 0; i < this.playListLength; i++) {
          this.randomList.push(i);
        }
      }
      if (this.randomList.length === 1) {
        this.handleMusic(this.playList[this.randomList[0]]);
        this.randomList = [];
        return;
      }

      let i = random(
        0,
        this.randomList.length - 1,
        this.nowIndex,
        this.randomList
      );
      this.handleMusic(this.playList[this.randomList[i]]);
      this.randomList.splice(i, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";
.player {
  z-index: 10;
  width: 100%;
  height: 0.6rem;
  background: lightseagreen;
  background: $background;
  position: fixed;
  bottom: 0.8rem;
  padding: 0rem 0.2rem 0 0.2rem;
  display: flex;
  align-items: center;
  transition: all 0.5s ease 0.1s;
  // border-top: .01rem solid $border;
  box-shadow: 0 0px 0.02rem #666;
  audio {
    display: none;
  }
  .disk {
    flex: 0 0 auto;
    width: 0.5rem;
    height: 0.5rem;
    background: lightcoral;
    border-radius: 50%;
    margin-right: 0.2rem;
    box-shadow: 0 0 5px #666;
    transition: all 0.5s ease;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      transition: transform 0s ease;
    }
  }
  .player-info {
    width: 100%;
    font-size: 0.14rem;
    padding-right: 0.8rem;
    .song-name {
      margin: 0.04rem 0;
    }
    .song-info {
      margin: 0.02rem 0;
      font-size: 0.12rem;
      color: $grey;
    }
  }
}

.playPage {
  width: 100%;
  height: calc(100% - 0.8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  .disk {
    margin: 1rem 0;
    width: 2.2rem;
    height: 2.2rem;
  }
  .song-info-page {
    color: $grey;
  }
  .player-info {
    padding: 0;
  }
  .control {
    padding: 0;
    width: calc(100% - 0.4rem);
  }
}
.up-enter,
.up-leaveto {
  transform: translateY(100%);
}
.up-leave,
.up-enter-to {
  transform: translateY(0);
}
.up-enter-active,
.up-leave-active {
  transform: all 0.5s ease;
}
</style>