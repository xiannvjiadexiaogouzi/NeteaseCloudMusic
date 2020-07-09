<template>
  <div class="nologin">
    <p>需要登陆才能显示完整页面</p>
    <van-button color="#FF0045" @click="goLogin" :loading="loading" ref="goLoginBtn">立即登陆</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    goLogin() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push({ name: "login" });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.nologin {
  width: $width;
  margin-top: 0.1rem;
  padding: $padding 0;
  font-size: $small-title;
  padding: $padding;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.1rem;
  box-shadow: 0 0 5px #ccc;
  .van-button {
    width: 100%;
    margin: 0.5rem auto;
    border-radius: 0.05rem;
  }
}
</style>