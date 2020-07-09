import axios from 'axios'
import qs from 'qs'

const http = axios.create()

// 拦截器
// http.interceptor.request.use(
//   ()=>{},
//   ()=>{}
// )

class $axios {
  constructor() {
    this.axios = http;
    this.component = null;
  }

  /* 
  @function 解析路由
  将api模块同名obj绑定在axios实例上
  在obj内将同名api绑定http方法
  实现调用$axios.[module].[api]()，直接发起请求
  @param 
    $module - 模块名
    $urlOBj - api对象
  */
  parseRouter = function (module, urlObj) {
    // 根据api模块名对应新建空对象
    let obj = this[module] = {}
    Object.keys(urlObj).forEach(key => {
      obj[key] = this.sendMsg.bind(this, urlObj[key])
    })
  }

  /* 
    @function sendMsg
    发起http请求
    @param 
      $options 配置（包括数据)
      - component: 当前的调用组件
      - module: api模块名称
      - dataName: 绑定的data名称
      - method: axios请求方法
      - config: axios请求配置(除去url，method)
        - data: axios请求数据
        - headers: {...}
        - transformRequest: [function(data){return qs.stringify(data)}]
        - ...
      - successFn: axios请求成功后的处理
  */
  sendMsg = function (url, options) {
    if (typeof options === 'string')
      if (!options.component) return
    // 组件端调用$axios.[module].[api](options)，options.component传进当前的component实例
    this.component = options.component
    let config = options.confifg
    let method = options.method || 'get'
    let data = options.data
    let dataName = options.dataName || 'data'
    let self = this
    // 数据绑定前处理
    // 万一数据不是res.data，而是res.data.data或者其他名称
    let beforeBind = res => res
    // 自动绑定数据
    let defaultBind = res => {
      // 组件[dataName] = res.data
      this.component[dataName] = res.data
    }
    // http请求成功
    let success = options.successFn || defaultBind
    let callback = res => {
      success(res, defaultBind)
    }

    // 请求方法
    let methods = {
      get(url) {
        url = data ? url + '?' + qs.stringify(data) : url
        self.axios.get(url).then(beforeBind).then(callback)
      },
      post() {
        if (!config) {
          self.axios.post(url, data).then(beforeBind).then(callback)
          return
        }
        config.url = url
        config.method = method
        self.axios.post(config).then(beforeBind).then(callback)
      }
    }

    // 发起请求
    methods[method](url);
  }

}

export default new $axios