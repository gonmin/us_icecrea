import Vue from 'vue'
// import vconsole from 'vconsole'
import App from './App.vue'
import './assets/css/reset.css';
import './assets/css/swiper.min.css';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// var vConsole = new vconsole();
  console.log('Hello world');

new Vue({
  el: '#app',
  render: function render(h) {
    return h(App);
  }
});