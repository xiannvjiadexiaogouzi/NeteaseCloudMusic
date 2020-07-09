<template>
  <div class="hot-search">
    <block-title :title="`热搜榜`" />
    <ul class="hot-search">
      <li v-for="(el, i) in hotSearchList" :key="i">
        <p class="num" :style="{color: i < 3 ? '#FF0045' : '#989898'}">{{i+1}}</p>
        <div class="wrapper" @click="$router.push({name:'searchresult', query:{keyword: el.searchWord}})">
          <div class="des-wrapper">
            <span class="name">{{el.searchWord}}</span>
            <van-icon
              v-if="el.iconType"
              :name="icon(el.iconType).icon"
              :color="icon(el.iconType).color"
            />
            <p class="des">{{el.content}}</p>
          </div>
          <p class="score">{{el.score}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BlockTitle from "../../components/BlockTitle.vue";

export default {
  components: {
    BlockTitle
  },
  created() {
    // 热搜
    this.$axios(this.$api.hotSearchDetail).then(res => {
      this.hotSearchList = res.data.data;
    });
  },
  data() {
    return {
      hotSearchList: [],
      iconList: [
        {
          i: 1,
          icon: "fire",
          color: "#FF0045"
        },
        {
          i: 2,
          icon: "new",
          color: "#008500"
        },
        {
          i: 5,
          icon: "arrow-up",
          color: "#FF0045"
        }
      ]
    };
  },
  methods: {
    icon(i) {
      return this.iconList.find(el => el.i === i);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.hot-search {
  .block-title {
    margin: 0.1rem 0 0.2rem 0;
  }
  ul.hot-search {
    li {
      margin: 0.1rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: $small-title;
      .num {
        color: $grey;
        font-style: italic;
        margin-right: 0.15rem;
        width: 5%;
      }
      .wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .des-wrapper {
          // position: relative;
          // left: 0;
          .name {
            margin: 0.1rem 0;
            margin-right: 0.1rem;
          }
          .des {
            margin: 0.1rem 0;
            font-size: $detail;
            color: $grey;
          }
        }
        .score {
          font-size: $detail;
          color: $grey;
        }
      }
    }
  }
}
</style>