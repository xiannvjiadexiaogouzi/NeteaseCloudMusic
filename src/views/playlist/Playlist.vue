<template>
  <div class="playlist">
    <page-title :title="title" @handleLeft="$router.go(-1)" v-if="title"/>
    <album-pic :pic="data.coverImgUrl" :artist="data.creator" :tags="data.tags" :name="data.name" />
    <div class="des">
      <p v-for="(sentence,i) in description" :key="i">{{sentence}}</p>
    </div>
    <block-title :title="`歌曲列表`" :rightIcon="`play-circle`" :right="`全部播放`" />
    <song-list :dataList="data.tracks" :num="isRank" />
  </div>
</template>

<script>
import PageTitle from "../../components/page/PageTitle";
import AlbumPic from "../../components/page/AlbumPic";
import BlockTitle from "../../components/BlockTitle.vue";
import SongList from "../../components/SongList.vue";
export default {
  name: "playlist",
  components: {
    PageTitle,
    AlbumPic,
    BlockTitle,
    SongList
  },
  created() {
    if (this.$route.path === "/playlist") {
      this.$axios(this.$api.playlistDetail + this.$route.query.id)
        .then(res => {
          console.log(res);
          this.data = res.data.playlist;
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (this.$route.path === "/rank") {
      this.isRank = true;
      this.$axios(this.$api.rank + this.$route.query.idx)
        .then(res => {
          console.log(res);
          this.data = res.data.playlist;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      isAlbum: Boolean,
      data: {},
      isRank: false,
    };
  },
  computed: {
    title(){
      if(this.$route.path === "/playlist") return '歌单'
      return this.data.name;
    },
    description() {
      if (!this.data.description) return;
      return this.data.description.split("\n");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.playlist {
  position: relative;
  padding: 0 $padding;
  .page-title {
    // padding: 0 $padding;
    background: #fff;
    position: sticky;
    top: 0;
  }
  .album-pic {
    width: 100%;
    // padding: 0 $padding;
    // overflow: hidden;
  }
  .des {
    // padding: 0.1rem $padding;
    padding: 0.1rem 0;
    font-size: $detail;
    line-height: 0.2rem;
    border-bottom: 0.01rem solid $border;
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