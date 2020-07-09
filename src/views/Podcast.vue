<template>
  <div class="podcast">
    <top-bar :title="'电台'" :titleDetail="`12月11日 星期三`" />
    <!-- 推荐电台 -->
    <swiper :list="data" />
    <!-- 每日推荐 / 歌单 / 排行榜 -->
    <block-title :title="'发现更多'" :topBorder="true" />
    <find-menu :list="findMore" />
    <!-- banner -->
    <block-title :title="'推荐'" :topBorder="true" />
    <swiper :list="banner" />
    <!-- 节目榜 -->
    <block-title :title="'热门节目'" :right="'显示全部'" :topBorder="true" @handleRight="openMore" />
    <song-list :dataList="computedProgramList" :num="true" />
    <!-- 热门电台 -->
    <block-title
      :title="'热门电台'"
      :right="'显示全部'"
      :topBorder="true"
      @handleRight="$router.push('hotpodcast')"
    />
    <album-block :length="6" />
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import Swiper from "../components/Swiper.vue";
import BlockTitle from "../components/BlockTitle.vue";
import AlbumBlock from "../components/AlbumBlock.vue";
import SongList from "../components/SongList.vue";
import FindMenu from "../components/page/FindMenu.vue";
import { mapMutations } from "vuex";

export default {
  name: "podcast",
  components: {
    TopBar,
    Swiper,
    BlockTitle,
    AlbumBlock,
    SongList,
    FindMenu
  },
  created() {
    this.$axios(this.$api.recommendPodcast).then(res => {
      this.data = res.data.result;
    });
    // banner
    this.$axios(this.$api.podcastBanner).then(res => {
      this.banner = res.data.data;
    });
    // 热门电台
    this.$axios(this.$api.hotPodcast + "?limit=6").then(res => {
      this.changeState({ key: "data.newAlbum", value: res.data.djRadios });
    });
    // 热门节目
    this.$axios(this.$api.hotPodcastProgram + "30").then(res => {
      console.log(res);
      this.programList = res.data.data.list;
    });
  },
  data() {
    return {
      data: [],
      banner: [],
      programList: [],
      findMore: [
        {
          name: "今日优选",
          icon: "calendar-alt",
          path: ""
        },
        {
          name: "热门分类",
          icon: "list-alt",
          path: "/allPodcast"
        },
        {
          name: "排行榜",
          icon: "chart-bar",
          path: "/allrank"
        }
      ]
    };
  },
  computed: {
    computedProgramList() {
      return this.programList.slice(0, 5);
    }
  },
  methods: {
    ...mapMutations(["changeState"]),
    openMore() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";
.podcast {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0 .2rem;
  div.swiper {
    &:nth-child(0n+2) {
      height: 4.18rem;
    }
  }

  .song-list {
    width: $width;
  }
}
</style>

<style lang="scss">
@import "../assets/scss/public.scss";
.podcast {
  .song-list {
    ul {
      li {
        .song-des {
          border: none;
          border-top: 0.01rem solid $border;
        }
      }
    }
  }
}
</style>