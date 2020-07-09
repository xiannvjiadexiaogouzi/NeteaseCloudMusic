<template>
  <div class="user">
    <page-title
      title="账号"
      @handleLeft="$router.push('/')"
      right="sign-out-alt"
      @handleRight="logout"
    />
    <!-- 账号信息 -->
    <div class="avatar-wrapper">
      <img :src="profile.avatarUrl" alt="avatar" />
      <div class="info-wrapper">
        <p class="name">{{profile.nickname}}</p>
        <ul>
          <li v-for="(nav, i) in avaterMenu" :key="i">
            <span>{{nav.title}}</span>
            <span class="num">{{profile[nav.name]}}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="btn" @click="$router.push('/userinfo')">更多</div> -->
    </div>
    <!-- 创建的歌单 -->
    <block-title :title="`创建的歌单（${subCount.createdPlaylistCount}）`" :topBorder="true" right="查看全部" />
    <playlist-block :data="createdPlaylist" />
    <!-- 收藏的歌单 -->
    <block-title :title="`收藏的歌单（${subCount.subPlaylistCount}）`" :topBorder="true" right="查看全部" />
    <playlist-block :data="subscribedPlaylist" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import PageTitle from "../../components/page/PageTitle.vue";
import BlockTitle from "../../components/BlockTitle.vue";
import PlaylistBlock from "../../components/PlaylistBlock.vue";

export default {
  components: {
    PageTitle,
    BlockTitle,
    PlaylistBlock
  },
  created() {
    this.$axios(this.$api.userDetail + this.userId).then(res => {
      this.profile = res.data.profile;
    });
    // 用户订阅数量
    this.$axios(this.$api.userSubcount).then(res => {
      this.changeState({ key: "user.subCount", value: res.data });
    });
    // 用户歌单
    this.$axios(this.$api.userPlaylist + this.userId).then(res => {
      this.changeState({ key: "user.userPlaylist", value: res.data.playlist });
    });
  },
  data() {
    return {
      profile: {},
      avaterMenu: [
        { title: "动态", name: "authority" },
        { title: "粉丝", name: "followeds" },
        { title: "关注", name: "follows" }
      ]
    };
  },
  computed: {
    ...mapState("user", ["userId", "subCount"]),
    ...mapGetters("user", ["createdPlaylist", "subscribedPlaylist"])
  },
  methods: {
    ...mapMutations(["changeState"]),
    // 登出
    logout() {
      this.$axios(this.$api.logout).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            message: "logout success",
            color: "#989898",
            background: "#f7f7f7"
          });
          // 删除cookie中的userId
          document.cookie =
            "uId=" + this.userId + "; expires=" + new Date(0).toUTCString();
          // 更改 vuex 中 userId & isLogin 状态
          this.changeState({ key: "user.userId", value: "" });
          this.changeState({ key: "user.isLogin", value: false });
          // 转跳
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.user {
  & > * {
    padding: 0 $padding;
  }
  .page-title {
    position: sticky;
    top: 0;
    background: #fff;
  }
  .avatar-wrapper {
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 30%;
      border-radius: 50%;
    }
    .info-wrapper {
      .name {
        font-size: $small-title;
        padding: 0.15rem 0;
        border-bottom: 0.01rem solid $border;
      }
      ul {
        margin-top: 0.1rem;
        display: flex;
        font-size: $detail;
        li {
          margin: 0.05rem;
          &:first-child {
            margin-left: 0;
          }
          .num {
            margin-left: 0.03rem;
            font-style: italic;
          }
        }
      }
    }
    .btn {
      padding: 0.05rem;
      font-size: $detail;
      background: $background;
      color: $grey;
      border-radius: 0.1rem;
      position: relative;
      top: -0.4rem;
    }
  }
  .block-title {
    margin: auto;
    width: $width;
    padding: 0;
    padding-top: 0.1rem;
    position: sticky;
    top: 0.5rem;
  }
  .playlist-block {
    margin: 0.2rem auto;
  }
}
</style>