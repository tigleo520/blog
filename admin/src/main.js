import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.less'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

const http = axios.create({
  baseURL: 'http://localhost:3001/api'
})
Vue.prototype.$http = http

http.interceptors.request.use(function (res) {
  // Do something before request is sent
  if (sessionStorage.token) {
    res.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return res
}, function (err) {
  // Do something with request error
  return Promise.reject(err)
})
http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  return Promise.reject(err)
})

Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
