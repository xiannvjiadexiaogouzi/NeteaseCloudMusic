<template>
  <div class="my-list">
    <van-overlay :show="show" @click.stop="$emit('handleMyList')" />
    <transition name="mylist" mode="out-in">
      <div class="list-wrapper" v-show="show">
        <block-title :title="`播放列表`" />
        <song-list :isPlayList="true" />
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { Overlay } from "vant";
Vue.use(Overlay);
import { mapState } from "vuex";
import SongList from "../SongList.vue";
import BlockTitle from "../BlockTitle";

export default {
  components: {
    SongList,
    BlockTitle
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      // show: false
    };
  },
  computed: {
    ...mapState("player", ["playList"])
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../../assets/scss/public.scss";

.my-list {
  box-shadow: 0 0 5px #ddd;
  .list-wrapper {
    transform: translateY(0);
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: auto;
    .block-title {
      width: 100%;
      margin: 0;
      padding: 0.15rem $padding;
      box-shadow: 0 0 5px #ddd;
    }
    .song-list {
      width: 100%;
      height: auto;
      max-height: 3rem;
      padding: 0 $padding;
      ul {
        padding-bottom: 0.1rem;
        li {
          padding: 0 0.1rem 0 0rem;
          justify-content: space-between;
          align-items: center;
          .song-des {
            margin: 0 0.1rem 0 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            .song-detail {
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
  .mylist-enter,
  .mylist-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .mylist-leave,
  .mylist-enter-to {
    transform: translateY(0);
  }
  .mylist-enter-active,
  .mylist-leave-active {
    transition: all 0.2s linear;
  }
}
</style>
