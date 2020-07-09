<template>
  <div class="find-menu">
    <ul>
      <li v-for="(el ,i) in list" :key="i" @click="$router.push(el.path)">
        <div class="icon-wrapper">
          <font-awesome-icon :icon="['fas', el.icon]" />
        </div>
        <p>{{el.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/public.scss';

.find-menu {
  width: $width;
  margin-top: 0.1rem;
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $detail;
      .icon-wrapper {
        width: 0.6rem;
        height: 0.6rem;
        background: $red;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 100%;
          height: 50%;
        }
      }
      p {
        margin: 0.1rem 0 0 0;
      }
    }
  }
}
</style>