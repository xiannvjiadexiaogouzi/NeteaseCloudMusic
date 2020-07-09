<template>
  <div class="rank">
    <page-title :title="`歌单`" @handleLeft="$router.go(-1)" />
    <album-pic :pic="data.coverImgUrl" :artist="data.creator" :tags="data.tags" :name="data.name" />
    <div class="des">
      <p v-for="(sentence,i) in description" :key="i">{{sentence}}</p>
    </div>
    <block-title :title="`歌曲列表`" :rightIcon="`play-circle`" :right="`全部播放`" />
    <song-list :dataList="data.tracks" :isPlayList="true" />
  </div>
</template>

<script>
import PageTitle from "../../components/page/PageTitle";
import AlbumPic from "../../components/page/AlbumPic";
import BlockTitle from "../../components/BlockTitle.vue";
import SongList from "../../components/SongList.vue";

export default {
  name: "rank",
  components: {
    PageTitle,
    AlbumPic,
    BlockTitle,
    SongList
  },
  created() {
    this.$axios(this.$api.rank + this.$route.query.idx).then(res => {
      console.log(res);
      
    });
  }
};
</script>

<style lang="scss" scoped>
</style>