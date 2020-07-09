<template>
  <div class="all-rank">
    <page-title :title="`排行榜`" @handleLeft="$router.go(-1)" />
    <block-title :title="`热榜`" />
    <ul class="rank-list">
      <li v-for="(el,i) in hot" :key="i" @click="routerGo(el.name)">
        <img v-lazy="el.coverImgUrl" />
        <p>{{el.name}}</p>
      </li>
    </ul>
    <block-title :title="`官方榜`" />
    <ul class="small-rank rank-list">
      <li v-for="(el,i) in official" :key="i" @click="routerGo(el.name)">
        <img v-lazy="el.coverImgUrl" />
        <p>{{el.name}}</p>
      </li>
    </ul>
    <block-title :title="`云音乐榜`" />
    <ul class="rank-list small-rank">
      <li v-for="(el,i) in cloud" :key="i" @click="routerGo(el.name)">
        <img v-lazy="el.coverImgUrl" />
        <p>{{el.name | nameFilter}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageTitle from "../../components/page/PageTitle.vue";
import BlockTitle from "../../components/BlockTitle.vue";

export default {
  components: {
    PageTitle,
    BlockTitle
  },
  created() {
    this.$axios(this.$api.allRank).then(res => {
      console.log(res);
      this.data = res.data.list;
    });
  },
  data() {
    return {
      data: []
    };
  },
  filters: {
    nameFilter(val) {
      return val.slice(3);
    }
  },
  computed: {
    ...mapState('rank', ['rankIdx']),
    // 热榜 ToplistType 存在
    hot() {
      return this.data.filter(el => el.ToplistType);
    },
    // 官方榜 userId !== 1
    official() {
      return this.data.filter(el => el.userId !== 1 && !el.ToplistType);
    },
    // 云音乐榜 userId === 1
    cloud() {
      return this.data.filter(el => el.userId === 1 && !el.ToplistType);
    }
  },
  methods: {
    routerGo(name) {
      console.log(name)
      this.$router.push({ path: "/rank", query: { idx: this.rankIdx[name] } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.all-rank {
  padding: 0 $padding;
  .page-title {
    position: sticky;
    top: 0;
    background: #fff;
  }
  .block-title {
    width: 100%;
    margin: 0;
    position: sticky;
    top: 0.5rem;
    background: #fff;
  }
  ul.rank-list {
    margin: 0.2rem 0;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      padding: 0 0.1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 5px #666;
      }
      p {
        margin: 0.1rem 0;
        line-height: 0.2rem;
        height: 0.42rem;
      }
    }
  }
  ul.small-rank {
    li {
      margin: 0 0.05rem;
      padding: 0.05rem 0;
      width: 30%;
      justify-content: space-between;
      p {
        font-weight: 300;
        font-size: $detail;
        line-height: 0.2rem;
        height: 0.4rem;
      }
    }
  }
}
</style>