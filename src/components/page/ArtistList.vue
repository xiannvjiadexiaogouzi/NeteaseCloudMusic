<template>
  <div class="artist-list">
    <ul>
      <li v-for="(artist, i) in dataList" :key="i" @click.stop="handleClick(artist)">
        <img v-if="artist.img1v1Url" :src="artist.img1v1Url" alt />
        <p v-if="artist.name" class="song-name">{{artist.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/public.scss';
.artist-list {
  ul {
    margin: .2rem 0;
    li {
      display: flex;
      align-items: center;
      margin: .1rem 0;
      font-size: $detail;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        margin: 0 .1rem;
      }
      p {
      }
    }
  }
}
</style>