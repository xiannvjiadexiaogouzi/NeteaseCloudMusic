<template>
  <div class="recommend">
    <page-title title="今日推荐" @handleLeft="$router.go(-1)" />
    <song-list :dataList="list"/>
  </div>
</template>

<script>
import PageTitle from "../components/page/PageTitle.vue";
import SongList from "../components/SongList.vue";
export default {
  components: {
    PageTitle,
    SongList
  },
  created() {
    this.$axios(this.$api.todayRecommendSongs).then(res => {
      console.log(res);
      this.list = res.data.recommend;
    });
  },
  data(){
    return{
      list:[],
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.recommend {
  & > * {
    padding: 0 $padding;
  }
  .page-title {
    position: sticky;
    top: 0;
    background: #fff;
  }
}
</style>