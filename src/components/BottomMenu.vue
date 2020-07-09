<template>
  <div class="bottom-menu">
    <ul>
      <li
        v-for="(menu,i) in menus"
        :key="i"
        :style="{color: menu.name === nowMenu ? '#FF0045' : '#a0a0a0'}"
        @click="handleMenu(menu)"
      >
        <font-awesome-icon :icon="['fas', menu.icon]" />
        <p>{{menu.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {menus} from '@/assets/js/nav.js'
import { mapState, mapMutations } from "vuex";

export default {
  name: "bottom-menu",
  data() {
    return {
      menus: menus
    };
  },
  computed: {
    ...mapState(["nowMenu"])
  },
  methods: {
    ...mapMutations(["changeMenu"]),
    handleMenu(menu) {
      console.log('change menu')
      if (menu.name === this.nowMenu) return;
      this.changeMenu(menu);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.bottom-menu {
  z-index: 20;
  height: .8rem;
  width: 100%;
  border-top: 0.01rem solid $border;
  background: $background;
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0.1rem;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i,
      svg {
        width: 30px;
        height: 30px;
        // display: flex;
        // justify-content: center;
        margin: 0 0 0.1rem 0;
        // color: red;
      }
    }
  }
}
</style>