- 如果路由停留在/podcast刷新，页面会在podcast刷新，但是menu变回默认new

- swiper - filter没有空行，左右两边缺少内容就不对称了
  - 固定容器高度
- player
  - audio 标签
  https://juejin.im/post/5c8a4a586fb9a049b507b0d5

- 路由 二级缓存
https://segmentfault.com/a/1190000019734067
https://www.cnblogs.com/xfcao/p/11473946.html


- 随机播放函数

- 登陆逻辑
  - 登入成功
    - 将uid写入cookie
    - 将uid保存在vuex中，并修改isLogin状态
  - 页面刷新后，vuex初始化，但是cookie没有改变
    - 通过判断cookie存在来判断isLogin状态
    - 通过cooki来获取uid
  

- 未做
  - 专辑页面
  - 作者页面
  - 歌词
  - 播放列表全删除后播放器自动消失