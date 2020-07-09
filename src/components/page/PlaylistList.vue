<template>
  <div class="playlist-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="10"
      @load="onLoad"
    >
      <ul>
        <li v-for="(el, i) in data" :key="i">
          <div class="item-wrapper" @click="$router.push({path:'/playlist', query:{id:el.id}})">
            <img :src="el.picUrl || el.coverImgUrl" alt />
            <p>{{el.name}}</p>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { List } from "vant";
Vue.use(List);

export default {
  props: {
    data: Array
  },
  created() {},
  data() {
    return {
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      this.$emit("getData", this);
      // console.log("load");
      // this.loading = false;
      this.finished = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.playlist-list {
  .van-list {
    margin: 0.2rem 0 0 0;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 30%;
        margin: 0.1rem 0;
        display: flex;
        .item-wrapper {
          width: 100%;
          img {
            width: 100%;
            border-radius: 5px;
            box-shadow: 0 0 5px #666;
          }
          p {
            margin: 0.1rem 0 0 0;
            font-size: $detail;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>

