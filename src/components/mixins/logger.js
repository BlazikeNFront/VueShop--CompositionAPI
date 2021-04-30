export default {
  computed: {
    token() {
      return this.$store.getters["UserAuth/getToken"];
    },
  },
};
