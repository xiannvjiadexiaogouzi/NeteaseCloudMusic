<template>
  <div class="search-result">
    <van-tabs @click="routerGo">
      <van-tab v-for="(cat, i) in searchCat" :key="i" :title="cat.name" @click="routerGo">
        <div class="result-num">共{{count}}个结果</div>
        <!-- 单曲 -->
        <song-list :dataList="songs" v-show="cat.id === 1" :img="false"/>
        <!-- 专辑 -->
        <song-list :dataList="albums" v-show="cat.id === 10" />
        <!-- 歌手 -->
        <artist-list :dataList="artists" v-show="cat.id === 100"/>
        <!-- 歌单 -->
        <playlist-list :data="playlists" v-show="cat.id === 1000"/>
        <!-- 用户 -->
        <user-list :dataList="userprofiles" v-show="cat.id === 1002"/>
        <!-- 歌词 -->
        <song-list :dataList="songs" v-show="cat.id === 1006" :img="false"/>
        <song-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);

import { mapState, mapMutations } from "vuex";
import SongList from "../../components/SongList.vue";
import ArtistList from "../../components/page/ArtistList.vue";
import PlaylistList from '../../components/page/PlaylistList.vue';
import UserList from '../../components/page/UserList.vue';

export default {
  name: "searchresult",
  components: {
    SongList,
    ArtistList,
    PlaylistList,
    UserList
  },
  created() {
    this.$axios(this.$api.search + this.$route.query.keyword).then(res => {
      this.changeState({ key: "search.songs", value: res.data.result.songs });
    });
  },
  data() {
    return {
      nowIndex: 0
    };
  },
  computed: {
    ...mapState("search", [
      "searchCat",
      "songs",
      "albums",
      "artists",
      "playlists",
      "userprofiles"
    ]),
    nowNav() {
      return this.searchCat[this.nowIndex];
    },
    count() {
      return this[this.nowNav.key].length;
    }
  },
  methods: {
    ...mapMutations(["changeState"]),
    routerGo(index, title) {
      console.log(index, title);
      this.nowIndex = index;
      let nav = this.nowNav;
      let query = "&type=" + nav.id;
      this.$axios(this.$api.search + this.$route.query.keyword + query).then(
        res => {
          console.log("res", res.data.result);
          this.changeState({
            key: "search." + nav.key,
            value: res.data.result[nav.key]
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.search-result {
  .result-num {
    font-size: $detail;
    color: $grey;
    margin: 0.2rem 0 0.1rem 0;
  }
  // .playlist-list{
  //   display: flex;
  //   flex-direction: column; 
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>