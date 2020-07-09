import { HAS_COOKIE, GET_UID } from '../assets/js/cookie.js';

const user = {
  namespaced: true,
  state: {
    userId: GET_UID() || '',
    isLogin: HAS_COOKIE(),
    subCount: {},
    userPlaylist: []
  },
  getters: {
    // 创建歌单
    createdPlaylist(state) {
      return state.userPlaylist.filter(el => !el.subscribed);
    },
    // 收藏歌单
    subscribedPlaylist(state) {
      return state.userPlaylist.filter(el => el.subscribed);
    }

  },
  mutations: {},
  actions: {},
}

export default user