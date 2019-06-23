import * as fb from 'firebase';

class Ad {
  constructor(title, description, ownerId, promo = false, src = '', id = null) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.promo = promo;
    this.src = src;
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
    updateAd(state, { title, description, id }) {
      const ad = state.ads.find(a => a.id === id);

      ad.title = title;
      ad.description = description;
    },
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const { img } = payload;
        const fileData = await fb.storage()
          .ref(`ads/${img.name}`)
          .put(img);
        const src = await fileData.ref.getDownloadURL();
        console.log(src);
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.getUser.id,
          payload.promo,
          src,
        );
        const ad = await fb.database()
          .ref('ads')
          .push(newAd);
        newAd.id = ad.key;
        commit('setLoading', false);
        commit('createAd', newAd);
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
        const fbVal = await fb.database()
          .ref('ads')
          .once('value');
        const ads = fbVal.val();
        Object.keys(ads)
          .forEach((key) => {
            const ad = ads[key];
            resultAds.push(
              new Ad(ad.title, ad.description, ad.ownerId, ad.promo, ad.src, key),
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
    async updateAd({ commit }, { title, description, id }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        await fb.database().ref('ads').child(id).update({
          title, description,
        });
        commit('updateAd', {
          title, description, id,
        });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
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
    myAds(state, getters) {
      return state.ads.filter(ad => ad.ownerId === getters.getUser.id);
    },
  },
};
