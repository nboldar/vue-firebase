import Vue from 'vue';
import './plugins/vuetify';
import * as fb from 'firebase';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import AppBuyModel from './components/shared/BuyModal.vue';
import fbApi from './firebaseApi';

Vue.component('app-buy-modal', AppBuyModel);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp(fbApi);
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchAds');
  },
}).$mount('#app');
