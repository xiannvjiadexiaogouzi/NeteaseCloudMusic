<template>
  <div class="new">
    <top-bar :title="'发现'" :titleDetail="date" />
    <!-- 推荐歌单 -->
    <swiper :list="recommendList" />
    <!-- 每日推荐 / 歌单 / 排行榜 -->
    <block-title :title="'发现更多'" :topBorder="true" @handleRight="openMore" />
    <find-menu :list="findMore" />
    <!-- 新歌 -->
    <block-title :title="'新歌'" :right="'显示全部'" :topBorder="true" @handleRight="openMore" />
    <song-list :dataList="newSongList" />
    <!-- 新碟 -->
    <block-title
      :title="'新碟'"
      :right="'显示全部'"
      :topBorder="true"
      @handleRight="$router.push('newalbum')"
    />
    <album-block :dataList="newAlbum" :length="6" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import TopBar from "../components/TopBar";
import Swiper from "../components/Swiper";
import BlockTitle from "../components/BlockTitle";
import SongList from "../components/SongList";
import AlbumBlock from "../components/AlbumBlock";
import FindMenu from "../components/page/FindMenu.vue";

export default {
  name: "new",
  components: {
    TopBar,
    Swiper,
    BlockTitle,
    SongList,
    AlbumBlock,
    FindMenu
  },
  created() {
    // 推荐歌单
    this.$axios(this.$api.recommendList + "5")
      .then(res => {
        this.recommendList = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
    // 新歌
    this.$axios(this.$api.recommendNewSong)
      .then(res => {
        this.recommendNewSongList = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
    // 新砖
    this.$axios(this.$api.newAlbum)
      .then(res => {
        console.log(res);
        this.newAlbum = res.data.albums;
        this.changeState({ key: "data.newAlbum", value: res.data.albums });
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      // api: {
      //   recommendNewSong: this.$api.recommendNewSong,
      //   newAlbum: this.$api.newAlbum
      // },
      recommendList: [],
      recommendNewSongList: [],
      newAlbum: [],
      findMore: [
        {
          name: "每日推荐",
          icon: "calendar-alt",
          path: "/recommend"
        },
        {
          name: "歌单",
          icon: "list-alt",
          path: "/allplaylist"
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
    ...mapGetters(["date"]),
    newSongList() {
      return this.recommendNewSongList.slice(0, 5);
    }
  },
  methods: {
    openMore() {
      this.$router.push({ name: "listpage" });
    },
    ...mapMutations(["changeState"])
  }
};
</script>

<style lang="scss" scoped>
.new {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
@import "../assets/scss/public.scss";
.new {
  .swiper {
    height: 4.18rem;
  }
  .song-list {
    width: $width;
    height: auto;
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
