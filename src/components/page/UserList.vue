<template>
  <div class="user-list">
    <ul>
      <li v-for="(artist, i) in dataList" :key="i" @click.stop="handleClick(artist)">
        <img v-if="artist.avatarUrl" :src="artist.avatarUrl" alt />
        <p v-if="artist.nickname" class="song-name">{{artist.nickname}}</p>
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
.user-list {
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