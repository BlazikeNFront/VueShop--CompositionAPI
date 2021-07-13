export default {
  namespaced: true,
  state() {
    return {
      showModal: false,
      modalMsg: null,
    };
  },
  mutations: {
    setShowModal(state, payload) {
      state.showErrorModal = payload;
    },
    setModalMsg(state, payload) {
      state.errorModalMsg = payload;
    },
  },
  actions: {
    closeModal(context) {
      context.commit("setShowModal", false);
      context.commit("setModalMsg", null);
    },
    showModal(context, payload) {
      context.commit("setShowModal", true);
      context.commit("setModalMsg", payload);
    },
  },
  getters: {
    getShowModal(state) {
      return state.showModal;
    },
    getModalMsg(state) {
      return state.modalMsg;
    },
  },
};
