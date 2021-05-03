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
          handleChangePageRequest(parseInt(this.currentPage) - 1)
        "
        @nextPageClick="handleChangePageRequest(parseInt(this.currentPage) + 1)"
      ></pagination-buttons>
    </section>
  </div>
</template>
<script>
import ProductBoxSmall from "../../components/searchResult/productBoxSmall.vue";
import PaginationButtons from "../../components/common/PaginationButtons.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    ProductBoxSmall,
    PaginationButtons,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const searchData = computed(() => {
      return store.getters["UserSearch/getSearchResultData"];
    });
    const storeQuery = computed(() => {
      return store.getters["UserSearch/getQuery"];
    });
    const currentPage = computed(() => {
      return route.query.page;
    });
    const numberOfPages = computed(() => {
      return store.getters["UserSearch/getNumberOfPages"];
    });
    function handleSearchRequest() {
      const query = route.params.searchQuery;
      const page = route.query.page;
      if (storeQuery.value === query) {
        return;
      }

      const payload = { query, page };
      store.dispatch("UserSearch/handleSearchRequest", payload);
    }
    function handleChangePageRequest(page) {
      if (page < 1 || page > numberOfPages.value) {
        return;
      }
      store.dispatch("UserSearch/handlePageChange", page);
      router.push({
        name: "search-for-product",
        params: { searchQuery: store.getters["UserSearch/getQuery"] },
        query: { page: page },
      });
    }
    onMounted(() => {
      handleSearchRequest();
    });

    return { searchData, numberOfPages, currentPage, handleChangePageRequest };
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
