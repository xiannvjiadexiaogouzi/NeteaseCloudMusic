<template>
  <div class="album-pic">
    <img :src="pic" alt />
    <div class="detail">
      <div class="name">{{name}}</div>
      <div class="artist" v-if="artist">
        <img v-if="artist.avatarUrl" :src="artist.avatarUrl" alt />
        <img v-if="artist.picUrl" :src="artist.picUrl" alt />
        <span>{{artist.nickname || artist.name}}</span>
      </div>
      <p class="tag-wrapper" v-if="tags">
        <tag v-for="(tag,i) in tags" :key="i" :tag="tag" />
      </p>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";
export default {
  components: {
    Tag
  },
  props: {
    pic: String,
    artist: Object,
    tags: Array,
    name: String
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.album-pic {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  padding: $padding 0;
  border-bottom: 0.01rem solid $border;
  img {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
  }
  .detail {
    margin: 0 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // overflow: hidden;
    width: 1.7rem;
    flex: 0 0 atuo;
    .name {
      line-height: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .artist {
      font-size: $detail;
      color: $grey;
      display: flex;
      align-items: center;
      img {
        flex: 0 0 auto;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 0.1rem;
      }
    }
    .tag-wrapper {
      display: flex;
      justify-content: flex-start;
      .tag{
        margin: 0 .05rem;
      }
    }
  }
}
</style>