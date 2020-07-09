<template>
  <div class="login">
    <page-title :title="`登陆`" @handleLeft="$router.go(-1)" />
    <div class="input-wrapper">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入手机号"
        type="number"
        :disabled="loading"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :disabled="loading"
        required
      />
    </div>
    <div class="btn-wrapper">
      <van-button color="#FF0045" @click="login" :loading="loading" ref="loginBtn">登陆</van-button>
      <van-button color="#f7f7f7" @click="$router.go(-1)">取消</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Button } from "vant";
Vue.use(Field).use(Button);
import { CONSTANT } from "../../assets/js/util.js";
import PageTitle from "../../components/page/PageTitle.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    PageTitle
  },
  data() {
    return {
      loading: false,
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(["changeState"]),
    // 输入检查
    checkInput() {
      if (!this.username || !CONSTANT.PHONE.test(this.username)) {
        this.$notify({
          message: "请输入正确的手机号",
          background: "#FF0045"
        });
        return false;
      }
      if (!this.password) {
        this.$notify({
          message: "请输入密码",
          background: "#FF0045"
        });
        return false;
      }
      return true;
    },
    // 登陆
    login() {
      if (!this.checkInput()) return;
      this.loading = true;
      this.$axios
        .post(this.$api.login, {
          phone: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            // 登陆成功
            this.$notify({
              message: "login success",
              color: "#989898",
              background: "#f7f7f7"
            });
            // 修改 vuex userId & isLogin 状态
            this.changeState({
              key: "user.userId",
              value: res.data.account.id
            });
            this.changeState({
              key: "user.isLogin",
              value: true
            });
            // 对id进行base64加密放入cookie，方便之后获取
            let basedId = window.btoa(res.data.account.id);
            document.cookie = "uId=" + basedId;
            // 跳转
            this.$router.push({ path: "/user", query: {uId: res.data.account.id} });
          } else if (res.data.msg) {
            // 登陆报错
            this.$notify({
              message: res.data.msg,
              background: "#FF0045"
            });
          }
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        })
        .catch(err => {
          let reg = /501/g;
          if (reg.test(err.toString())) {
            this.$notify({
              message: "user not exists",
              background: "#FF0045"
            });
          } else {
            this.$notify({
              message: err.toString(),
              background: "#FF0045"
            });
          }
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.login {
  padding: 0 $padding;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .input-wrapper {
    .van-field {
      border-bottom: 0.01rem solid $border;
    }
  }
  .btn-wrapper {
    display: flex;
    flex-direction: column;
    .van-button {
      margin: 0.1rem 0;
      border-radius: 0.05rem;
      &:last-child {
        span {
          color: #000;
        }
      }
    }
  }
}
</style>