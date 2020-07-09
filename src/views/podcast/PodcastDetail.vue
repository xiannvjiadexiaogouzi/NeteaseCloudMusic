<template>
  <div class="podcast-detail">
    <page-title :title="title" @handleLeft="$router.go(-1)" v-if="title" />
    <album-pic
      v-if="!loading"
      :pic="data.coverImgUrl"
      :artist="data.creator"
      :tags="data.tags"
      :name="data.name"
    />
    <div class="des" v-if="!loading">
      <p v-for="(sentence,i) in description" :key="i">{{sentence}}</p>
    </div>
    <block-title :title="`节目列表`" :rightIcon="`play-circle`" :right="`全部播放`" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <song-list :dataList="data.list" :num="true" />
    </van-list>
  </div>
</template>

<script>
import PageTitle from "../../components/page/PageTitle";
import AlbumPic from "../../components/page/AlbumPic";
import BlockTitle from "../../components/BlockTitle.vue";
import SongList from "../../components/SongList.vue";
import Vue from "vue";
import { List } from "vant";
Vue.use(List);

export default {
  name: "podcastDetail",
  components: {
    PageTitle,
    AlbumPic,
    BlockTitle,
    SongList
  },
  created() {
    if (this.$route.path === "/podcastdetail") {
      this.getData();
    }
    // if (this.$route.path === "/rank") {
    //   this.isRank = true;
    //   this.$axios(this.$api.rank + this.$route.query.idx)
    //     .then(res => {
    //       console.log(res);
    //       this.data = res.data.playlist;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  data() {
    return {
      loading: true,
      isAlbum: Boolean,
      data: {},
      isRank: false,
      offset: 0,
      finished: true,
    };
  },
  computed: {
    title() {
      if (this.$route.path === "/podcastdetail") return "电台详情";
      return this.data.name;
    },
    description() {
      if (!this.data.description) return;
      return this.data.description.split("\n");
    }
  },
  methods: {
    getData() {
      this.$axios(this.$api.podcastDetail + this.$route.query.id, {
        params: {
          offset: this.offset
        }
      })
        .then(res => {
          console.log(res);
          if (!this.offset) {
            this.data.list = res.data.programs;
            let data = res.data.programs[0];
            this.data.coverImgUrl = data.radio.picUrl;
            this.data.creator = data.dj;
            this.data.tags = [data.radio.category];
            this.data.name = data.radio.name;
            this.data.description = data.radio.desc;
          }
          if (this.offset) {
            // this.data.list.push(...res.data.programs)
            // console.log(this.data.list)
          }
          this.loading = false;
          // this.offset++;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      console.log("onload");
      // this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.podcast-detail {
  position: relative;
  padding: 0 $padding;
  .page-title {
    // padding: 0 $padding;
    background: #fff;
    position: sticky;
    top: 0;
  }
  .album-pic {
    width: 100%;
    // padding: 0 $padding;
    // overflow: hidden;
  }
  .des {
    // padding: 0.1rem $padding;
    padding: 0.1rem 0;
    font-size: $detail;
    line-height: 0.2rem;
    border-bottom: 0.01rem solid $border;
  }
  .block-title {
    margin: 0;
    width: 100%;
    border-bottom: 0.01rem solid $border;
    position: sticky;
    top: 0.5rem;
    background: #fff;
  }
}
</style>