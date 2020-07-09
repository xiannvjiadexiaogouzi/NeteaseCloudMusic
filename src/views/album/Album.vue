<template>
  <div class="album">
    <page-title :title="`歌单`" @handleLeft="$router.go(-1)" />
    <album-pic
      v-if="data.album"
      :pic="data.album.picUrl"
      :artist="data.album.artist"
      :tags="[data.album.type]"
      :name="data.album.name"
    />
    <div class="des" v-if="data.album">
      <p v-for="(sentence,i) in description" :key="i">{{sentence}}</p>
    </div>
    <block-title :title="`歌曲列表`" :rightIcon="`play-circle`" :right="`全部播放`" />
    <song-list :dataList="data.songs" :img="false" :num="true" :des="false" />
  </div>
</template>

<script>
import PageTitle from "../../components/page/PageTitle";
import AlbumPic from "../../components/page/AlbumPic";
import BlockTitle from "../../components/BlockTitle.vue";
import SongList from "../../components/SongList.vue";
export default {
  name: "album",
  components: {
    PageTitle,
    AlbumPic,
    BlockTitle,
    SongList
  },
  created() {
    console.log(this.$route);
    this.isAlbum = true;
    this.$axios(this.$api.album + this.$route.query.id)
      .then(res => {
        console.log(res);
        this.data = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      isAlbum: Boolean,
      data: {}
    };
  },
  computed: {
    description() {
      if (!this.data.album.description) return;
      return this.data.album.description.split("\n");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.album {
  position: relative;
  padding: 0 $padding;
  .page-title {
    background: #fff;
    position: sticky;
    top: 0;
  }
  .des {
    padding: 0.1rem 0;
    font-size: $detail;
    line-height: 0.2rem;
    border-bottom: 0.01rem solid $border;
    max-height: 2rem;
    overflow: auto;
  }
  .block-title {
    margin: 0;
    width: 100%;
    border-bottom: 0.01rem solid $border;
    position: sticky;
    top: 0.5rem;
    background: #fff;
  }
}
</style>