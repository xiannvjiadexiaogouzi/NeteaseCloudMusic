<template>
  <div class="personal">
    <top-bar title="我的" :titleDetail="date" />
    <!-- 未登录 -->
    <nologin v-if="!isLogin" />
    <!-- 每日推荐歌单 -->
    <swiper :list="recommendList" />
    <!-- 每日推荐歌曲 -->
    <block-title
      v-if="isLogin"
      title="今日推荐"
      :right="'显示全部'"
      :topBorder="true"
      @handleRight="$router.push('/recommend')"
    />
    <song-list
      :dataList="recommendSongs"
      :length="5"
      v-if="isLogin && recommendSongs.length"
      :class="{startHeight: loading}"
    />
    <!-- 推荐电台 -->
    <block-title
      v-if="isLogin"
      title="精选电台"
      :topBorder="true"
    />
    <playlist-block v-if="isLogin" :data="recommendPodcasts" />
    <!-- 创建的歌单 -->
    <block-title
      v-if="isLogin"
      :title="`创建的歌单（${subCount.createdPlaylistCount}）`"
      :topBorder="true"
      right="查看全部"
      @handleRight="$router.push('/createdPlaylist')"
    />
    <playlist-block v-if="isLogin" :data="createdPlaylist" />
    <!-- 收藏的歌单 -->
    <block-title
      v-if="isLogin"
      :title="`收藏的歌单（${subCount.subPlaylistCount}）`"
      :topBorder="true"
      right="查看全部"
      @handleRight="$router.push('/subPlaylist')"
    />
    <playlist-block v-if="isLogin" :data="subscribedPlaylist" />
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import Swiper from "../components/Swiper";
import BlockTitle from "../components/BlockTitle";
import SongList from "../components/SongList";
// import AlbumBlock from "../components/AlbumBlock";
// import FindMenu from "../components/page/FindMenu.vue";
import PlaylistBlock from "../components/PlaylistBlock.vue";
import Nologin from "../components/Nologin.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import { Skeleton } from "vant";
Vue.use(Skeleton);

export default {
  components: {
    TopBar,
    Swiper,
    BlockTitle,
    SongList,
    // AlbumBlock,
    // FindMenu,
    PlaylistBlock,
    Nologin
  },
  data() {
    return {
      loading: true,
      recommendList: [],
      recommendPodcasts: []
    };
  },
  created() {
    // 未登录，退出 created
    if (!this.isLogin) return;
    if (!this.recommendSongs.length) this.getRecommendSongs();
    this.$axios
      .all([
        // 每日推荐歌单
        this.$axios(this.$api.todayRecommendPlaylist),
        // 推荐电台
        this.$axios(this.$api.todayRecommendPodcast)
      ])
      .then(
        this.$axios.spread((playlist, podcast) => {
          this.recommendList = playlist.data.recommend;
          this.recommendPodcasts = podcast.data.djRadios;
          this.loading = false;
        })
      );
    if (!this.userPlaylist.length) {
      // 用户订阅数量
      this.$axios(this.$api.userSubcount).then(res => {
        this.changeState({ key: "user.subCount", value: res.data });
      });
      // 用户歌单
      this.$axios(this.$api.userPlaylist + this.userId).then(
        res => {
          this.changeState({
            key: "user.userPlaylist",
            value: res.data.playlist
          });
        },
        err => console.log(err)
      );
    }
  },
  computed: {
    ...mapGetters(["date"]),
    ...mapState("user", ["isLogin", "subCount", "userId"]),
    ...mapState("recommend", ["recommendSongs", "userPlaylist"]),
    ...mapGetters("user", ["createdPlaylist", "subscribedPlaylist"]),
  },
  methods: {
    ...mapMutations(["changeState"]),
    ...mapMutations("recommend", ["getRecommendSongs"]),
    openMore() {
      this.$router.push({ name: "listpage" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.personal {
  & > * {
    margin: auto;
  }
  .swiper {
    margin-bottom: 0.1rem;
  }
  // .album-block{
  //   padding: 0 $padding;
  // }
  .playlist-block {
    margin-bottom: 0.2rem;
  }
  .song-list {
    padding: 0 $padding;
    margin-bottom: 0.1rem;
  }
}
</style>
<style lang="scss">
@import "../assets/scss/public.scss";
.personal {
  .nologin {
    margin-top: 0.2rem;
  }
  .swiper {
    height: 3.9rem;
  }
  .song-list {
    ul {
      li {
        &.startHeight {
          background: red;
          height: 0.8rem;
        }
        .song-des {
          border: none;
          border-top: 0.01rem solid $border;
        }
      }
    }
  }
}
</style>
