const menus = [
  {
    name: "new",
    title: "发现",
    path: "/new",
    icon: "music",
    routes:['allrank', 'rank', 'allplaylist', ]
  },
  {
    name: "personal",
    title: "我的",
    path: "/personal",
    icon: "heart",
    routes:['login', 'user']
  },
  {
    name: "podcast",
    title: "电台",
    path: "/podcast",
    icon: "podcast",
    routes:[]
  },
  {
    name: "search",
    title: "搜索",
    path: "/search",
    icon: "search",
    routes:['searchhot', 'searchresult']
  }
];

const playlistCat = [
  {
    name: '推荐',
    path: 'personalized',
  },
  {
    name: '精品',
    path: 'highquality'
  },
];

const searchCat = [
  {
    id: 1,
    name: '单曲',
    key: 'songs',
    path: '',
  },
  {
    id: 10,
    name: '专辑',
    key: 'albums',
    path: '',
  },
  {
    id: 100,
    name: '歌手',
    key: 'artists',
    path: '',
  },
  {
    id: 1000,
    name: '歌单',
    key: 'playlists',
    path: '',
  },
  {
    id: 1002,
    name: '用户',
    key: 'userprofiles',
    path: '',
  },
  // {
  //   id:1004,
  //   name: 'MV',
  //   path: '',
  // },
  {
    id: 1006,
    name: '歌词',
    key: 'songs',
    path: '',
  },
  // {
  //   id:1018,
  //   name: '综合',
  //   path: '',
  // },
]


// const routes = [
//   {
//     path: '/list',
//     name: 'listpage',
//     // component: () => import('./views/ListPage.vue'),
//   },
//   {
//     path: '/newalbum',
//     name: 'newalbum',
//     // component: () => import('./views/NewAlbum.vue'),
//   },
//   {
//     // 歌单详情
//     path: '/playlist',
//     name: 'playlist',
//     // component: () => import('./views/playlist/Playlist.vue'),
//   },
//   {
//     // 专辑详情
//     path: '/album',
//     name: 'album',
//     // component: () => import('./views/album/Album.vue'),
//   },
//   {
//     // 电台详情
//     path: '/podcastdetail',
//     name: 'podcastdetail',
//     // component: () => import('./views/podcast/PodcastDetail.vue'),
//   },
//   {
//     // 热门电台
//     path: '/hotpodcast',
//     name: 'hotpodcast',
//     // component: () => import('./views/podcast/HotPodcast.vue'),
//   },
//   {
//     // 每日推荐
//     path: '/recommend',
//     name: 'recommend',
//     // component: () => import('./views/Recommend.vue'),
//     beforeEnter: '/personal'
//   },
//   {
//     // 创建歌单页
//     path: '/createdPlaylist',
//     name: 'createdPlaylist',
//     // component: () => import('./views/NewAlbum.vue'),
//   },
//   {
//     // 收藏歌单页
//     path: '/subPlaylist',
//     name: 'subPlaylist',
//     // component: () => import('./views/NewAlbum.vue'),
//   }]


export { menus, playlistCat, searchCat }