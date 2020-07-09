import axios from 'axios';
import api from '../assets/js/api.js';

const recommend = {
  namespaced: true,
  state: {
    recommendSongs: [],
    subCount: {},
    userPlaylist: []
  },
  getters: {
  },
  mutations: {
    // 每日推荐歌曲
    getRecommendSongs(state) {
      axios(api.todayRecommendSongs).then(res => {
        console.log('songs')
        state.recommendSongs = res.data.recommend;
      });
    }
  },
  actions: {},
}

export default recommend