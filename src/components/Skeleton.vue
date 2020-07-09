<template>
  <div class="skeleton">
    <div class="skeleton_row"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.skeleton {
  animation: van-skeleton-blink 1.2s ease-in-out infinite;
  .skeleton_row{
    height: 16px;
    background-color: #f2f3f5;
  }
}
</style>