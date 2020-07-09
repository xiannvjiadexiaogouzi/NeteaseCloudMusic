<template>
  <div class="top-bar">
    <div class="left">
      <p class="title-detail">{{titleDetail}}</p>
      <p class="title">{{title}}</p>
    </div>
    <div class="right">
      <font-awesome-icon :icon="['fas' ,'user']" @click="$router.push('/login')"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    titleDetail: String,
    rightIcon: String
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/public.scss';

.top-bar{
  height: 1rem;
  width: $width;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: .1rem;
  border-bottom: .01rem solid $border;
  .left{
    .title-detail{
      font-size: $detail;
      color: $grey;
      margin: 0 0 .07rem 0;
    }
    .title{
      margin: 10px 0;
      font-size: $title;
      font-weight: 900;
    }
  }
  .right{
    width: .55rem;
    height: .55rem;
    // background: lightgreen;
    color: $red;
    border-radius: 50%;
    border: .05rem solid $red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg{
      position: absolute;
      bottom: 0;
      width: 90%;
      height: 90%;
    }
  }
}
</style>