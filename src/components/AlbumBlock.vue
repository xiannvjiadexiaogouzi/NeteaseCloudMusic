<template>
  <div class="album-block">
    <ul v-if="computedList">
      <li v-for="(album,i) in computedList" :key="i">
        <div class="album-wrapper" @click="open(album)">
          <img :src="album.picUrl || album.blurPicUrl" alt />
          <p>{{album.name}}</p>
          <p class="artist" v-if="album && album.artist">{{album.artist.name}}</p>
          <p class="artist" v-if="album.dj">{{album.dj.nickname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    api: String,
    length: Number
    // dataList: Array
  },
  created() {
    // this.$axios(this.api)
    //   .then(res => {
    //     console.log(res);
    //     this.list = res.data.albums;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState("data", ["newAlbum"]),
    computedList() {
      return this.length ? this.newAlbum.slice(0, this.length) : this.newAlbum;
    }
  },
  methods: {
    open(el) {
      if (this.$route.name === "podcast") {
        this.$router.push({ path: "/podcastdetail", query: { id: el.id } });
        return;
      }
      this.$router.push({ path: "/album", query: { id: el.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.album-block {
  width: 100%;
  overflow: hidden;
  ul {
    width: 100%;
    display: flex;
    overflow: auto;
    padding: 0 0.18rem 0 0.18rem;

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    li {
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
          font-size: $detail;
          color: grey;
          margin: 0.05rem 0;
        }
      }
    }
  }
}
</style>