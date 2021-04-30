<template>
  <div>
    <section class="searchData">
      <loader v-if="!searchData"></loader>
      <div class="searchData__wrapper" v-else>
        <h3 class="serachData__h3" v-if="searchData.length === 0">
          No single product was found :(
        </h3>
        <product-box-small
          v-else
          v-for="product in searchData"
          :key="product._id"
          :product="product"
        ></product-box-small>
      </div>
      <pagination-buttons
        class="searchResult__paginationButtons"
        :numberOfPages="numberOfPages"
        :currentPage="currentPage"
        @pageChange="handleChangePageRequest"
        @previousPageClick="
          this.handleChangePageRequest(parseInt(this.currentPage) - 1)
        "
        @nextPageClick="
          this.handleChangePageRequest(parseInt(this.currentPage) + 1)
        "
      ></pagination-buttons>
    </section>
  </div>
</template>
<script>
import ProductBoxSmall from "../../components/searchResult/productBoxSmall.vue";
import PaginationButtons from "../../components/common/PaginationButtons.vue";

export default {
  components: {
    ProductBoxSmall,
    PaginationButtons,
  },

  mounted() {
    this.handleSearchRequest();
  },
  computed: {
    searchData() {
      return this.$store.getters["UserSearch/getSearchResultData"];
    },
    storeQuery() {
      return this.$store.getters["UserSearch/getQuery"];
    },
    currentPage() {
      return this.$route.query.page;
    },
    numberOfPages() {
      return this.$store.getters["UserSearch/getNumberOfPages"];
    },
  },
  methods: {
    handleSearchRequest() {
      const query = this.$route.params.searchQuery;
      const page = this.$route.query.page;
      if (this.storeQuery === query) {
        return;
      }

      const payload = { query, page };
      this.$store.dispatch("UserSearch/handleSearchRequest", payload);
    },
    handleChangePageRequest(page) {
      if (page < 1 || page > this.numberOfPages) {
        return;
      }
      this.$store.dispatch("UserSearch/handlePageChange", page);
      this.$router.push({
        name: "search-for-product",
        params: { searchQuery: this.$store.getters["UserSearch/getQuery"] },
        query: { page: page },
      });
    },
  },
};
</script>
<style lang='scss'>
.searchData__wrapper {
  @include flexLayout;
  margin-top: 2rem;
  margin-left: 50%;
  width: 95%;
  min-height: 60rem;
  max-width: 120rem;
  justify-content: center;
  flex-wrap: wrap;

  transform: translate(-50%);
}
.serachData__h3 {
  margin-top: 25rem;
  font-size: $font-bg;
}
.searchResult__paginationButtons {
  margin-left: 50%;
  width: 100%;

  transform: translate(-50%);
  .paginationButtons__hexagonShapes {
    margin: 1rem;
  }
}
</style>
