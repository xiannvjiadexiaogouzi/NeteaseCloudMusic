<template>
  <div class="hot-podcast">
    <page-title :title="`热门电台`" @handleLeft="$router.go(-1)" />
    <!-- <van-tabs @click="routerGo">
      <van-tab v-for="(cat, i) in playlistCat" :key="i" :title="cat.name"></van-tab>
    </van-tabs>-->
    <playlist-list :data="data" @getData='handleData'/>
  </div>
</template>

<script>
import PlaylistList from "../../components/page/PlaylistList.vue";
import PageTitle from "../../components/page/PageTitle.vue";

export default {
  components: {
    PlaylistList,
    PageTitle
  },
  data() {
    return {
      data: [],
      offset: 0
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    getData(son) {
      this.$axios(this.$api.hotPodcast, {
        params: {
          offset: this.offset * 30
        }
      }).then(res => {
        console.log(res.data);
        this.data.push(...res.data.djRadios);
        if(this.data.length % 3 !== 0){
          this.data.push('')
        }
        this.offset ++;
        if(son !== 'undefined'){
          son.loading = false;
          son.finished = this.offset > 1 ? true : false;
        }
      });
    },
    handleData(son){
      console.log('load',son)
      this.getData(son);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.hot-podcast {
  &>*{
    padding: 0 $padding;
  }
  .page-title {
    background: #fff;
    position: sticky;
    top: 0;
  }
}
</style>