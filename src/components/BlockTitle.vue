<template>
  <div class="block-title" :class="{borderTop: topBorder}">
    <p class="left">{{title}}</p>
    <p class="right" @click="$emit('handleRight', title)">
      {{right}}
      <van-icon :name="rightIcon" v-if="rightIcon"/>
    </p>
  </div>
</template>

<script>
export default {
  namre: "blockTitle",
  props: {
    title: {
      type: String,
      required: true
    },
    topBorder: {
      type: Boolean,
      default: false
    },
    right: String,
    rightIcon: String
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";
.block-title {
  margin: 0.15rem 0 0 0;
  padding: 0.1rem 0;
  width: $width;
  display: flex;
  justify-content: space-between;
  font-size: $small-title;
  &.borderTop {
    border-top: 0.01rem solid $border;
  }
  .left {
    font-weight: 500;
  }
  .right {
    font-weight: 200;
    color: $red;
    display: flex;
    align-items: center;
  }
}
</style>