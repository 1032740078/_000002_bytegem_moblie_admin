import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routers from './router/index.js'
import './common/filter.js'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes: routers
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    localStorage.clear();
  }
  let token = localStorage.getItem('token');
  if (!token && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
//全局后置钩子
router.afterEach((to, from) => {
  // console.log('to:',to);
  // console.log('from:',from);
})
//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  el: '#app',
  // template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')



