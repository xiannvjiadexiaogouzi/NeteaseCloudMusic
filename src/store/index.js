const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import player from './player'
import data from './data'
import rank from './rank'
import search from './search'
import user from './user'
import recommend from './recommend'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { player, data, rank, search, user, recommend },
  state: {
    nowMenu: 'new', //当前页面
    time: new Date(),
    // login: false
  },
  getters: {
    date: state => {
      let time = state.time;
      return time.getMonth() + 1 + '月' + time.getDate() + '日' + ' ' + '星期' + WEEK[time.getDay()];
    },
  },
  mutations: {
    changeState(state, { key, value }) {
      let keys = key.split('.');
      let target = keys.pop();
      let obj = keys.reduce((acc, cur) => acc[cur], state);
      obj[target] = value;
    },
    // 底部导航
    changeMenu(state, newMenu) {
      if (typeof newMenu == 'string') {
        state.nowMenu = newMenu
        return
      }
      state.nowMenu = newMenu.name;
      router.push(newMenu.path);
    },
  },
  actions: {

  }
})
