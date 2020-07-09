<template>
  <div class="page-title">
    <font-awesome-icon :icon="['fas', left]" @click.stop="$emit('handleLeft')" />
    <p class="left">{{title}}</p>
    <font-awesome-icon :icon="['fas', right]" :style="{color: right === 'bars' ? 'white' : 'black' }" @click.stop="$emit('handleRight')"/>
  </div>
</template>

<script>
export default {
  namre: "PageTitle",
  props: {
    title: {
      type: String,
      required: true
    },
    left: {
      type: String,
      default: "angle-left"
    },
    right: {
      type: String,
      default: "bars"
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";
.page-title {
  height: .5rem;
  padding: 0.1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
}
</style>