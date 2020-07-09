<template>
  <transition name="fade">
    <div class="btn" @click.stop="handleClick" v-show="see">
      <font-awesome-icon :icon="['fas', icon]" />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    see: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick(e) {
      // console.log(e);
      this.$emit("control", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  height: 0.4rem;
  width: 0.4rem;
  font-size: 0.3rem;
  // background: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease 0.3s;
  &:active,
  & > svg:active {
    color: #aaa;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active {
  display: none;
}
</style>