import * as fb from 'firebase';

class Ad {
  constructor(title, description, ownerId, src = '', promo = false, id = null) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.src = src;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAds(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.ads = payload;
    },
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.getUser.id,
          payload.src,
          payload.promo,
        );

        const ad = await fb.database().ref('ads').push(newAd);

        commit('setLoading', false);
        commit('createAd', {
          ...newAd,
          id: ad.key,
        });
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        console.log(error.message);
        throw error;
      }
    },
    async fetchAds({ commit }) {
      commit('clearError');
      commit('setLoading', true);
      const resultAds = [];
      try {
        const fbVal = await fb.database().ref('ads').once('value');
        const ads = fbVal.val();
        Object.keys(ads).forEach((key) => {
          const ad = ads[key];
          resultAds.push(
            new Ad(ad.title, ad.description, ad.owberId, ad.src, ad.promo, key),
          );
        });
        console.log(ads);
        commit('setLoading', false);
        commit('loadAds', resultAds);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        console.log(error.message);
        throw error;
      }
    },
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo);
    },
    getAdById(state) {
      return adId => state.ads.find(ad => ad.id === adId);
    },
  },
};
