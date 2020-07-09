<template>
  <div class="search">
    <form action="/">
      <van-search
        :placeholder="defaultVal.showKeyword"
        v-model="value"
        @input="handleInput"
        @search="handleSearch"
      />
      <!-- 搜索提示 -->
      <transition name="down">
        <ul v-show="suggestOn" class="search-suggest">
          <div class="search-word">搜索"{{value}}"</div>
          <li v-for="(el, i) in suggests" :key="i" @click="handleSearch(el.keyword)">
            <van-icon name="search" />
            <p>{{el.keyword}}</p>
          </li>
        </ul>
      </transition>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";
Vue.use(Search);

export default {
  name: "search",
  created() {
    // 默认搜索
    if (this.$route.query.keyword) {
      this.value = this.$route.query.keyword;
      return;
    }
    this.$axios(this.$api.searchDefault).then(res => {
      this.defaultVal = res.data.data;
    });
  },
  data() {
    return {
      defaultVal: {},
      value: "",
      suggestOn: false,
      suggests: []
    };
  },
  watch:{
    $route(){
      this.value = this.$route.query.keyword;
    }
  },
  methods: {
    handleInput(val) {
      if (!val) {
        this.suggestOn = false;
        if (this.$route.name !== "searchhot")
          this.$router.push({ name: "searchhot" });
        return;
      }
      // 搜索建议
      this.$axios(this.$api.searchSuggest + val).then(res => {
        this.suggests = res.data.result.allMatch;
        this.suggestOn = val ? true : false;
      });
    },
    handleSearch(val) {
      this.value = val;
      this.$router.push({
        name: "searchresult",
        query: {
          keyword: val
        }
      });
      this.suggestOn = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.search {
  & > * {
    padding: 0 $padding;
  }
  form {
    padding: 0;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2;
    .van-search {
      padding: 0.15rem $padding;
      .van-search__content {
        border-radius: 0.2rem;
      }
    }
  }
  .search-suggest {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 $padding;
    background: #fff;
    width: 100%;
    height: auto;
    transition: all 0.1s linear;
    transform: translateY(0.64rem);
    padding-bottom: $padding;
    box-shadow: 0 5px 5px #ccc;
    font-size: $detail;
    color: $grey;
    .search-word {
      padding: 0.1rem 0;
      border-bottom: $border solid 0.01rem;
    }
    li {
      display: flex;
      align-items: center;
      p {
        width: 100%;
        border-bottom: solid 0.01rem $border;
        padding: 0.1rem 0;
        margin-left: 0.1rem;
        color: #000;
      }
    }
  }

  .down-enter,
  .down-leav-to {
    // transform: translateY(-0.64rem);
    opacity: 0;
    height: 0;
  }
  .down-leave,
  .down-enter-to {
    // transform: translateY(0);
    opacity: 1;
    height: auto;
  }
}
</style>