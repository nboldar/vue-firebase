
export default {
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.loading = payload;
    },
    setError(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.error = payload;
    },
    clearError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    setError({ commit }, payload) {
      commit('setError', payload);
    },
    clearError({ commit }) {
      commit('clearError', null);
    },
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
};
