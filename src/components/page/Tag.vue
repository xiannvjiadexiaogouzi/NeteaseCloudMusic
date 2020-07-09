<template>
  <div class="tag">
    <span>{{tag}}</span>
  </div>
</template>

<script>
export default {
  name: "tag",
  props: {
    tag: String
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/public.scss";

.tag {
  background: #ddd;
  border-radius: .1rem;
  padding: .01rem .05rem;
  line-height: .2rem;
  span {
    font-size: $detail;
    color: $grey;
  }
}
</style>