import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { auth } from './plugins/firebase'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

auth.onAuthStateChanged((user) => {
  if(user){
    console.log('Пользователь авторизован');
  }else {
    console.log('Пользователь не авторизован');
  }
});
