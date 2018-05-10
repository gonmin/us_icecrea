import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/swiper.min.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: function render(h) {
    return h(App);
  }
});