// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload';//图片懒加载
import InfiniteScroll from "vue-infinite-scroll";//上拉加载更多

Vue.config.productionTip = false

//图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/static/loading-svg/loading-bars.svg',
  attempt: 1
})

//上拉加载更多
Vue.use(InfiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
