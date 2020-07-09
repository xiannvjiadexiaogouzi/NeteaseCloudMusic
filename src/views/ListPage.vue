<template>
  <div class="list-page" :style="{paddingBottom: showPlayer ? '1.4rem' : '1rem'}">
    <page-title :title="`歌曲列表`" @handleLeft="$router.go(-1)" />
    <song-list
      :dataList="songList"
      :style="{height: showPlayer ? 'calc(100vh - 0.5rem - 0.6rem - 0.9rem)' : 'calc(100vh - 0.5rem - 0.9rem)'}"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageTitle from "../components/page/PageTitle.vue";
import SongList from "../components/SongList.vue";

export default {
  name: "listpage",
  components: {
    PageTitle,
    SongList
  },
  props: {},
  created() {
    if(this.$route.name === ''){
      this.songList = this.recommendSongs;
      return
    }
    // 新歌推荐
    this.$axios(this.$api.recommendNewSong)
      .then(res => {
        this.songList = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState("player", ["showPlayer"]),
    ...mapState('recommend', ['recommendSongs'])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";
.list-page {
  width: 100%;
  padding: 0 $padding;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  overflow: auto;
}
</style>
