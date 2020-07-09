<template>
  <div class="new-album">
    <page-title :title="title" @handleLeft="$router.go(-1)" />
    <album-list :data="data" />
  </div>
</template>

<script>
import PageTitle from "../components/page/PageTitle";
import AlbumList from "../components/page/AlbumList";
import { mapState, mapGetters } from "vuex";
export default {
  props: {},
  components: {
    PageTitle,
    AlbumList
  },
  created() {
    this.page = this.pages.find(page => page.name === this.$route.name);
  },
  data() {
    return {
      page: {},
      pages: [
        {
          name: "createdPlaylist",
          title: "创建的歌单",
          data: "createdPlaylist"
        },
        {
          name: "subPlaylist",
          title: "收藏的歌单",
          data: "subscribedPlaylist"
        },
        {
          name: "newalbum",
          title: "新碟",
          data: "newAlbum"
        }
      ]
    };
  },
  computed: {
    ...mapState("data", ["newAlbum"]),
    ...mapGetters("user", ["createdPlaylist", "subscribedPlaylist"]),
    title() {
      return this.page.title;
    },
    data() {
      return this[this.page.data];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";
.new-album {
  width: 100%;
  & > * {
    padding: 0 $padding;
  }

  .page-title {
    background: #fff;
    position: sticky;
    top: 0;
  }
}
</style>