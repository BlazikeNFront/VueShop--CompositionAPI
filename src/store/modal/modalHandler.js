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
      state.showModal = payload;
      console.log(state.showModal, payload);
    },
    setModalMsg(state, payload) {
      state.modalMsg = payload;
    },
  },
  actions: {
    closeModal(context) {
      context.commit("setShowModal", false);
      context.commit("setModalMsg", null);
    },
    showModal(context, payload) {
      console.log(payload);
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
