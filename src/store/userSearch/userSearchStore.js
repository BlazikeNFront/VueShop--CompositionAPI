export default {
  namespaced: true,
  state() {
    return {
      searchResultData: null,
      query: null,
      productDetails: null,
      pages: null,
    };
  },
  mutations: {
    setSearchResult(state, payload) {
      state.searchResultData = payload;
    },
    setQuery(state, payload) {
      state.query = payload;
    },
    setProductDetails(state, payload) {
      state.productDetails = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setNumberOfPages(state, payload) {
      state.pages = payload;
    },
  },
  actions: {
    setQuery(context, payload) {
      context.commit(payload);
    },
    async handleSearchRequest(context, payload) {
      const { query, page } = payload;
      try {
        context.commit("setQuery", query);

        const rawData = await fetch(
          `https://vueshopcompback.herokuapp.com/searchProducts/${query}?page=${page ||
            1}`
        );
        const payload = await rawData.json();
        if (rawData.status !== 200) {
          throw new Error("Server side error");
        }
        const getNumberOfPages = Math.ceil(payload.totalItems / 8);

        context.commit("setSearchResult", payload.data);
        context.commit("setNumberOfPages", getNumberOfPages);
      } catch (err) {
        console.log(err);
      }
    },
    async handlePageChange(context, page) {
      try {
        const rawData = await fetch(
          `https://vueshopcompback.herokuapp.com/searchProducts/${context.getters.getQuery}?page=${page}`
        );
        const payload = await rawData.json();

        if (rawData.status !== 200) {
          throw new Error("Server side error");
        }

        context.commit("setSearchResult", payload.data);
      } catch (err) {
        console.log(err);
      }
    },

    async setProductDetails(context, prodId) {
      try {
        const rawData = await fetch(
          `https://vueshopcompback.herokuapp.com/getProductDetails/${prodId}`
        );
        const data = await rawData.json();
        data.description = data.description.split("•").join("\n•"); // sometimes in description appears list starting with "•" sign;this code makes the sign to start in new line(looks like acutallu list after that adjustment)
        context.commit("setProductDetails", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getSearchResultData(state) {
      return state.searchResultData;
    },
    getQuery(state) {
      return state.query;
    },
    getProductDetails(state) {
      return state.productDetails;
    },
    getNumberOfPages(state) {
      return state.pages;
    },
  },
};
