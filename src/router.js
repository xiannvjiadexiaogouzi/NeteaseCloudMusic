import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
// import Vuex from 'vuex'

import { GET_MENU } from './assets/js/util';
import { HAS_COOKIE } from './assets/js/cookie';

Vue.use(Router)


const router = new Router({
  routes: [
    {
      alias: '/',
      path: '/new',
      name: 'new',
      component: () => import('./views/New.vue'),
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/Personal.vue'),
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('./views/Podcast.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search/Search.vue'),
      children: [
        {// 热搜
          path: 'hot',
          name: 'searchhot',
          component: () => import('./views/search/SearchHot.vue'),
          alias: '',
        },
        {// 搜索结果
          path: 'result',
          name: 'searchresult',
          component: () => import('./views/search/SearchResult.vue'),
        },
      ]
    },
    {
      path: '/list',
      name: 'listpage',
      component: () => import('./views/ListPage.vue'),
    },
    {
      path: '/newalbum',
      name: 'newalbum',
      component: () => import('./views/NewAlbum.vue'),
    },
    {
      // 歌单详情
      path: '/playlist',
      name: 'playlist',
      component: () => import('./views/playlist/Playlist.vue'),
    },
    {
      // 专辑详情
      path: '/album',
      name: 'album',
      component: () => import('./views/album/Album.vue'),
    },
    {
      // 所有排行
      path: '/allrank',
      name: 'allrank',
      component: () => import('./views/rank/AllRank.vue'),
    },
    {
      // 排行
      path: '/rank',
      name: 'rank',
      component: () => import('./views/playlist/Playlist.vue'),
    },
    {
      // 歌单广场
      path: '/allplaylist',
      name: 'allplaylist',
      component: () => import('./views/playlist/AllPLayList.vue'),
    },
    {
      // 电台详情
      path: '/podcastdetail',
      name: 'podcastdetail',
      component: () => import('./views/podcast/PodcastDetail.vue'),
    },
    {
      // 热门电台
      path: '/hotpodcast',
      name: 'hotpodcast',
      component: () => import('./views/podcast/HotPodcast.vue'),
    },
    {
      // 登陆
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue'),
      beforeEnter: (to, from, next) => {
        // 有cookie
        if (to.name === 'login' && HAS_COOKIE()) {
          console.log('cookie exists')
          next('/user');
          return
        }
        next();
      }
    },
    {
      // 用户
      path: '/user',
      name: 'user',
      component: () => import('./views/user/User.vue'),
    },
    {
      // 每日推荐
      path: '/recommend',
      name: 'recommend',
      component: () => import('./views/Recommend.vue'),
      beforeEnter: (to, from, next) => {
        if (to.name === 'recommend' && !HAS_COOKIE()) {
          console.log('no cookie')
          next('/personal');
          return
        }
        next();
      }
    },
    // 精选电台
    {
      path: '/recommendPodcast',
      name: 'recommendPodcast',
      component: () => import ('./views/podcast/HotPodcast.vue'),
    },
    {
      // 创建歌单页
      path: '/createdPlaylist',
      name: 'createdPlaylist',
      component: () => import('./views/NewAlbum.vue'),
    },
    {
      // 收藏歌单页
      path: '/subPlaylist',
      name: 'subPlaylist',
      component: () => import('./views/NewAlbum.vue'),
    },

  ],
})

router.beforeEach((to, from, next) => {
  // console.log(document.cookie)
  // 确定当前menu, 将当前menu传给vuex
  let activeMenu = GET_MENU(to.name);
  if (activeMenu) store.commit('changeMenu', activeMenu);
  next();
})

router.afterEach(() => {
  window.scrollTo(0, 0);
})

export default router