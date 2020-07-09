const baseApi = 'http://localhost:3000';

const api = {
  // 推荐歌单
  // 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset) 
  // 调用例子 : /personalized?limit=1
  recommendList: '/personalized?limit=',
  //   推荐新音乐
  recommendNewSong: '/personalized/newsong',
  // 独家放送
  privateContent: '/personalized/privatecontent',
  // 最新专辑
  newAlbum: '/album/newest',
  // 获取音乐 url
  songUrl: '/song/url?id=',
  // 歌曲详情
  songDetail: '/song/detail?ids=',
  // 歌单详情 传id
  playlistDetail: '/playlist/detail?id=',
  // 专辑详情
  album: '/album?id=',
  // 所有榜单
  allRank: '/toplist',
  // 榜单
  rank: '/top/list?idx=',
  // 歌单分类
  playlistcategory: '/playlist/catlist',
  // 热门歌单分类
  playlisthot: '/playlist/hot',
  // 获取歌单 cat='华语'
  playlist: '/top/playlist?limit=30&order=hot&cat=',
  // 精品歌单
  highqualityPlaylist: '/top/playlist/highquality?limit=30',
  // 推荐电台
  recommendPodcast: '/personalized/djprogram',
  // 电台banner
  podcastBanner: '/dj/banner',
  // 热门电台 // limit : 默认为 30 // offset: 偏移( 页数 -1)*30
  hotPodcast: '/dj/hot',
  // 热门节目 24h
  hotPodcastProgram: '/dj/program/toplist/hours?limit=',
  // 电台详情
  podcastDetail: '/dj/program?asc=true&rid=',
  // 电台分类热门
  // limit : 返回数量 , 默认为 30
  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
  // cateId: 类别 id,可通过 /dj/category/recommend 接口获取
  // 调用例子 : /dj/radio/hot?cateId=2001(创作|翻唱)
  hotCatPodcast: '/dj/radio/hot',
  // 电台分类
  pocastCat: '/dj/catelist',
  // 搜索 // keywords //limit // offset
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  search: '/search?keywords=',
  //默认搜索
  searchDefault: '/search/default',
  // 热搜
  hotSearch: '/search/hot',
  hotSearchDetail: '/search/hot/detail', //icontype 1-hot 2-new 5-up
  // 搜索建议
  searchSuggest: '/search/suggest?type=mobile&keywords=',
  // // 搜索多重匹配
  // searchMultiple: '/search/multimatch?keywords=',
  // 登陆 // $phone // $password
  login: '/login/cellphone',
  // 登出
  logout: '/logout',
  // 用户详情
  userDetail: '/user/detail?uid=',
  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  userSubcount: '/user/subcount',
  // 用户歌单
  userPlaylist: '/user/playlist?uid=',
  // 每日荐歌曲 // 登陆后
  todayRecommendSongs: '/recommend/songs',
  // 每日推荐歌单 // 登陆后
  todayRecommendPlaylist: '/recommend/resource',
  // // 播放记录 // 登陆后 // $type: 1-weekdata 0-alldata
  // playRecord:'/user/record?type=0&uid=',
  // 每日推荐电台 // 登陆后
  todayRecommendPodcast: '/dj/recommend'

}

Reflect.ownKeys(api).forEach(key => api[key] = baseApi + api[key]);

export default api