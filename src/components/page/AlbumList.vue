<template>
  <div class="album-list">
    <ul>
      <li v-for="(album,i) in data" :key="i">
        <div class="album-wrapper" @click="handleRouter(album)">
          <img :src="album.blurPicUrl || album.picUrl" alt v-if="album.picUrl" />
          <img :src="album.coverImgUrl" alt v-if="album.coverImgUrl" />
          <p>{{album.name}}</p>
          <p class="artist" v-if="album && album.artist">{{album.artist.name}}</p>
          <p class="artist" v-if="album.creator">{{album.creator.nickname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  computed: {},
  methods: {
    handleRouter(album) {
      if (this.$route.name === "newalbum") {
        this.$router.push({ path: "/album", query: { id: album.id } });
        return;
      }
      this.$router.push({ path: "/playlist", query: { id: album.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.album-list {
  width: 100%;

  ul {
    width: 100;
    display: flex;
    flex-wrap: wrap;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    li {
      flex: 1 0 auto;
      width: 50%;
      .album-wrapper {
        display: flex;
        flex-direction: column;
        margin: 0.06rem;
        margin-top: 0;
        width: 100%;
        img {
          width: 1.575rem;
          height: 1.575rem;
          margin: 0 0 0.1rem 0;
          border-radius: 5px;
          box-shadow: 0 0 5px #666;
        }
        p {
          width: 1.575rem;
          font-size: $small-title;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .artist {
          width: 1.575rem;
          font-size: $detail;
          color: grey;
          margin: 0.05rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>