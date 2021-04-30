export default {
  namespaced: true,
  state() {
    return {
      showErrorModal: false,
      errorModalMsg: null,
    };
  },
  mutations: {
    setShowErrorModal(state, payload) {
      state.showErrorModal = payload;
    },
    setErrorModalMsg(state, payload) {
      state.errorModalMsg = payload;
    },
  },
  actions: {
    closeModal(context) {
      context.commit("setShowErrorModal", false);
      context.commit("setErrorModalMsg", null);
    },
    showError(context, payload) {
      context.commit("setShowErrorModal", true);
      context.commit("setErrorModalMsg", payload);
    },
  },
  getters: {
    getShowErrorModal(state) {
      return state.showErrorModal;
    },
    getErrorModalMsg(state) {
      return state.errorModalMsg;
    },
  },
};
