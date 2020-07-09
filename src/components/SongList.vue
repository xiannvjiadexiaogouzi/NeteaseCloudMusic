<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, i) in computedList" :key="i" @click.stop="handlePodcastOrMusic(song)">
        <div
          class="image"
          v-if="img && song.picUrl || img && song.al || img && song.program || img && song.coverUrl || img && song.album && !song.picUrl"
        >
          <!-- 单曲 -->
          <img v-if="img && song.picUrl" :src="song.picUrl" alt />
          <!-- 专辑 / 乐单 -->
          <img v-if="img && song.al" :src="song.al.picUrl" alt />
          <!-- 电台 -->
          <img v-if="img && song.program" :src="song.program.coverUrl" alt />
          <img v-if="img && song.coverUrl" :src="song.coverUrl" alt />
          <!-- 推荐 -->
          <img v-if="img && song.album && !song.picUrl" :src="song.album.picUrl" alt />
        </div>
        <div class="song-des">
          <p class="num" v-if="num">{{i + 1}}</p>
          <div class="des-wrapper">
            <p v-if="song.name" class="song-name">{{song.name}}</p>
            <p v-if="song.program" class="song-name">{{song.program.name}}</p>
            <!-- 单曲 -->
            <p
              class="song-detail"
              v-if="des && song.song && song.song.artists.length && !song.artists"
            >{{song.song.artists[0].name}}</p>
            <!-- 专辑 / 乐单 -->
            <p class="song-detail" v-if="des && song.ar && song.ar.length">{{song.ar[0].name}}</p>
            <!-- 电台 -->
            <p class="song-detail" v-if="des && song.program">{{song.program.dj.nickname}}</p>
            <!-- 搜索 -->
            <p class="song-detail search" v-if="des && song.artists">
              <span v-for="(artist, i ) in song.artists" :key="i">{{artist.name + ' '}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 播放列表 -->
    <ul v-if="!dataList && isPlayList">
      <li v-for="(song, i) in playList" :key="i" @click.stop="handleMusic(song)">
        <div class="song-des" :class="{active: i === nowIndex}">
          <van-icon name="audio" v-if="i === nowIndex" :class="{redColor: i === nowIndex}" />
          <span class="song-name">{{song.name}}</span>
          <span
            class="song-detail"
            v-if="song.song && song.song.artists.length"
          >- {{song.song.artists[0].name}}</span>
          <span class="song-detail" v-if="song.ar && song.ar.length">- {{song.ar[0].name}}</span>
        </div>
        <van-icon name="cross" @click.stop="deleteFromList(song)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "songList",
  props: {
    dataList: Array,
    length: Number,
    isPlayList: { type: Boolean, default: false },
    img: { type: Boolean, default: true },
    num: { type: Boolean, default: false },
    des: { type: Boolean, default: true }
  },
  data() {
    return {
      loading: false,
      list: []
    };
  },
  mounted() {},
  computed: {
    ...mapState("player", ["playList", "showPlayer"]),
    ...mapGetters("player", ["nowIndex"]),
    computedList() {
      if (typeof this.dataList === "undefined") return;
      return this.dataList.length
        ? this.dataList.slice(0, this.length)
        : this.dataList;
    }
  },
  methods: {
    ...mapMutations("player", ["deleteFromList"]),
    ...mapActions("player", ["handleMusic", "handleFormlist"]),
    handlePodcastOrMusic(el) {
      console.log("handleMethod", el);
      let music = el;
      // 搜索项
      if (
        this.$route.name === "searchresult" ||
        this.$route.name === "recommend" ||
        this.$route.name === "personal"
      ) {
        console.log(el.picUrl);
        if (typeof el.picUrl !== "undefined") {
          this.$router.push({ path: "/album", query: { id: el.id } });
          return;
        }
        music.song = {};
        music.song.artists = el.artists;
        this.$axios(this.$api.album + el.album.id).then(res => {
          music.picUrl = res.data.album.picUrl;
          music.song.album = res.data.album;
        });
      }
      if (this.$route.name === "podcast") {
        music = el.program;
      }
      this.handleMusic(music);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.song-list {
  width: 100%;
  // height: calc(100vh - 0.5rem - 0.6rem - 0.8rem);
  overflow: auto;
  ul {
    li {
      display: flex;
      .image {
        flex: 0 0 auto;
        background: #999;
        height: 0.7rem;
        width: 0.7rem;
        border-radius: 5px;
        margin: 0.05rem 0.2rem 0.05rem 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          // height: .7rem;
        }
      }
      .song-des {
        width: 100%;
        border-bottom: 0.01rem solid $border;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .num {
          color: $grey;
          margin: 0.12rem 0.1rem;
          font-style: italic;
        }

        .des-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .song-name {
          font-size: $small-title;
          font-weight: 400;
          margin: 0.12rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .song-detail {
          font-size: $detail;
          color: $grey;
        }
        .van-icon {
          margin: 0 0.1rem;
        }
        .search {
          margin-bottom: 0.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .albumDes {
        flex-direction: row;
        justify-content: flex-start;
        span {
          color: $grey;
          margin: 0.12rem 0.1rem;
          font-style: italic;
        }
      }
      .active {
        color: $red;
      }
    }
  }
}
</style>