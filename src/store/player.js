import axios from 'axios'
import api from '../assets/js/api'

const nowIndex = function (state) {
  return state.nowPlay === null ? -1 : state.playList.findIndex(music => music.id === state.nowSongInfo.id);
}

const player = {
  namespaced: true,
  state: {
    el: null,
    showPlayer: false,
    isPause: true,
    nowSongInfo: Object,
    nowPlay: null, // url
    playList: [], // 播放列表
    playIdList: [], // 播放id列表
    duration: 0, // 歌曲长度
    // 播放模式
    playMode: [
      { name: "single", icon: "redo" },
      { name: "list", icon: "sync" },
      { name: "random", icon: "random" }
    ],
    nowModeIndex: 0,
  },
  getters: {
    // 当前序号
    nowIndex: nowIndex,
    // 当前演唱者
    artist: state => {
      // if (typeof state.nowSongInfo.song === 'undefined') return ''
      if (state.nowSongInfo.song) return state.nowSongInfo.song.artists[0].name
      if (state.nowSongInfo.ar) return state.nowSongInfo.ar[0].name;
    },
    // 下一首
    next(state) {
      let index = nowIndex(state);
      if (index < 0) return;
      let len = state.playList.length;
      index = index === 0 ? len - 1 : index - 1;
      // 返回列表中上一首
      return state.playList[index]
    },
    // 上一首
    pre(state) {
      let index = nowIndex(state);
      if (index < 0) return;
      let len = state.playList.length;
      index = index === len - 1 ? 0 : index + 1;
      // 返回列表中下一首
      return state.playList[index]
    },
    // 当前播放模式
    nowPlayMode(state) {
      return state.playMode[state.nowModeIndex];
    },
    // 列表长度
    playListLength(state) {
      return state.playList.length;
    }

  },
  mutations: {
    // 绑定元素
    bindEl(state, el) {
      state.el = el;
    },
    // 打开播放器
    openPlayer(state) {
      if (state.showPlayer) return;
      state.showPlayer = true;
    },
    // 歌曲放入播放位置
    playSong(state, { song, data }) {
      state.nowPlay = data.url;
      state.nowSongInfo = song;
    },
    // 加入播放列表
    add2PlayList(state, newSong) {
      // 判断是否在列表内
      if (state.playIdList.includes(newSong.id)) return;
      // 如果播放列表为为0，则添加当前列表
      state.playList.unshift(newSong);
      state.playIdList.unshift(newSong.id);
    },
    // 从播放列表中删除
    deleteFromList(state, song) {
      // console.log(song)
      let index = state.playList.findIndex(music => music.id === song.id);
      state.playList.splice(index, 1);
      if (!state.playList.length) state.nowPlay = '';
    },
    // 获取歌曲长度
    getDuration(state, time) {
      state.duration = typeof time === 'undefined' ? state.el.duration : time;
    },
    // 播放 / 暂停键
    togglePlay(state, isPause) {
      if (!state.duration) return;
      if (state.isPause) state.el.play();
      if (!state.isPause) state.el.pause();
      state.isPause = typeof isPause === 'undefined' ? !state.isPause : isPause;
    },
    // 播放模式
    handleMode(state) {
      state.nowModeIndex = state.nowModeIndex === state.playMode.length - 1 ? 0 : state.nowModeIndex + 1;
      state.el.loop = state.playMode[state.nowModeIndex].name === 'single' ? true : false;
    }
  },
  actions: {
    handleMusic({ commit, state }, song) {
      if (song.id === state.nowSongInfo.id && !state.isPause) return;
      commit('togglePlay', true); // 暂停播放
      commit('getDuration', 0);
      // 获取歌曲url
      axios.get(api.songUrl + song.id).then(res => {
        console.log('songurl', res)
        let data = res.data.data[0];
        // 打开播放器
        commit('openPlayer');
        // 加入播放列表第一位
        commit('add2PlayList', song);
        // 歌曲放入播放位置
        commit('playSong', { song, data });
      })
    },
    // 自动播放
    autoplay({ commit }) {
      commit('getDuration');
      // 播放
      commit('togglePlay', false);
    },
    // // 删除列表
    // handleFormlist({ commit }, song) {
    //   commit('deleteFromList', song);
    //   commit('togglePlay', true); // 暂停播放
    // }
  }
}

export default player
