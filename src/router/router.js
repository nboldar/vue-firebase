import Vue from 'vue';
import Router from 'vue-router';
import guard from './guard';
// eslint-disable-next-line import/extensions
import Home from '../components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/auth/Login.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../components/auth/Registration.vue'),
    },
    {
      path: '/new',
      name: 'new_ad',
      component: () => import('../components/ads/NewAd.vue'),
      beforeEnter: guard,
    },
    {
      path: '/list',
      name: 'ads_list',
      component: () => import('../components/ads/AdsList.vue'),
      beforeEnter: guard,
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../components/user/Orders.vue'),
      beforeEnter: guard,
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: () => import('../components/ads/Ad.vue'),
      beforeEnter: guard,
    },

  ],
});
