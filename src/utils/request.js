  import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken} from '@/utils/auth'
import router from '../router/index.js'

// axios.defaults.headers = {"content-type":"application/x-www-form-urlencoded"}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 50000,// request timeout
  headers:{"content-type":"application/x-www-form-urlencoded"},
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken()
    if(token){
      config.headers['X-Busi-Mana-Token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
  //服务器异常
    if(response.data.code === 100104 || response.data.code === 600102){
      Message({
        message: '登陆过期请重新登陆',
        type: 'error',
        duration: 5 * 1000
      })
      router.replace('/login');
    }else if(response.data.code === 100103){
      Message({
        message: '访问过于频繁',
        type: 'error',
        duration: 5 * 1000
      })
    }else if(response.data.code === 100101){
      Message({
        message: '服务端异常,请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
    }else if(response.data.code === 100102){
      Message({
        message: '请求参数不合法',
        type: 'error',
        duration: 5 * 1000
      })
    }else if(response.data.code === 600103){
      Message({
        message: '该账户已经被删除,请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
    }else if(response.data.code === 401){
      Message({
        message: '该用户没有此操作权限，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
      //根据路由进行跳转
      router.push('/401')
    }else if (response.data.code ===600104) {
      Message({
        message: '用户名或者密码错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (response.data.code ===3) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }else {
      return response;
    }
    setTimeout(()=>{
      // loadingInstance.close();
    },18)
  }, error => {
  //请求异常
    console.log('err' + error)// for debug
    Message({
      message: '登录连接超时（后台不能连接，请联系系统管理员）',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
