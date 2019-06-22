import Vue from 'vue';
import './plugins/vuetify';
import * as fb from 'firebase';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: 'AIzaSyBUsTb2CQB9QHP44BjHmiMCl6YP33h8Dnk',
      authDomain: 'vue-app-fire.firebaseapp.com',
      databaseURL: 'https://vue-app-fire.firebaseio.com',
      projectId: 'vue-app-fire',
      storageBucket: 'vue-app-fire.appspot.com',
      messagingSenderId: '1066036337706',
      appId: '1:1066036337706:web:133c81394e0cd760',
    });
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchAds');
  },
}).$mount('#app');
