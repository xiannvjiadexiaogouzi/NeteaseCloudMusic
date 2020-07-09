<template>
  <div class="playlist-block">
    <ul v-if="computedList">
      <li v-for="(album,i) in computedList" :key="i">
        <div class="album-wrapper" @click="open(album)">
          <img :src="album.coverImgUrl || album.picUrl" alt="cover" />
          <p>{{album.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    length: Number
  },
  created() {},
  data() {
    return {};
  },
  computed: {
    computedList() {
      return this.length ? this.data.slice(0, this.length) : this.data;
    }
  },
  methods: {
    open(el) {
      //  打开personal精选电台
      if (this.$route.name == "personal") {
        this.$router.push({ path: "/podcastdetail", query: { id: el.id } });
        return;
      }
      // 正常打开乐单
      this.$router.push({ path: "/playlist", query: { id: el.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.playlist-block {
  width: 100%;
  overflow: hidden;
  ul {
    padding: 0 $padding;
    // width: 100%;
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    li {
      .album-wrapper {
        display: flex;
        flex-direction: column;
        margin: 0.06rem 0.1rem;
        margin-top: 0;
        &:first-child {
          margin-left: 0;
        }
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
      }
    }
  }
}
</style>