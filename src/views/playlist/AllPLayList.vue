<template>
  <div class="all-playlist">
    <page-title :title="`歌单广场`" @handleLeft="$router.go(-1)" />
    <van-tabs @click="routerGo">
      <van-tab v-for="(cat, i) in playlistCat" :key="i" :title="cat.name"></van-tab>
    </van-tabs>
    <playlist-list :data="data" />
  </div>
</template>

<script>
import PageTitle from "../../components/page/PageTitle.vue";
import PlaylistList from "../../components/page/PlaylistList.vue";
import { playlistCat } from "../../assets/js/nav.js";

import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);

export default {
  components: {
    PageTitle,
    PlaylistList
  },
  data() {
    return {
      playlistCat: playlistCat,
      data: []
    };
  },
  created() {
    // 
    this.$axios(this.$api.playlistcategory).then(res => {
      console.log(res);
    });
    // tabs
    this.$axios(this.$api.playlisthot).then(res => {
      this.playlistCat = this.playlistCat.concat(res.data.tags);
    });
    // recommendList
    this.$axios(this.$api.recommendList).then(res => {
      this.data = res.data.result;
    });
  },
  methods: {
    routerGo(index, title) {
      console.log(index, title);
      let url = null, key='playlists';
      switch (title) {
        case "推荐":
          url = this.$api.recommendList;
          key = 'result';
          break;
        case "精品":
          url = this.$api.highqualityPlaylist;
          break;
        default:
          url = this.$api.playlist + title;
      }
      this.$axios(url).then(res => {
        this.data = res.data[key];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.all-playlist {
  width: 100%;
  .page-title {
    background: #fff;
    padding: 0 $padding;
  }
  .playlist-list{
    margin: 0 $padding;
  }
}
</style>