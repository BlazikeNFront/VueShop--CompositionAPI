<template>
  <section class="userOrders">
    <h2>History of orders</h2>

    <user-orders-table
      v-if="orders.length > 0"
      :userOrders="orders"
      :admin="false"
    ></user-orders-table>
    <p v-else>There is no history of orders</p>
    <loader v-if="loader"></loader>

    <button class="userOrder__updateButton" @click="fetchOrdersAsUser">
      Update orders
    </button>
    <pagination-buttons
      class="searchResult__paginationButtons"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @pageChange="handleChangePageRequest($event)"
      @previousPageClick="handleChangePageRequest(parseInt(currentPage) - 1)"
      @nextPageClick="handleChangePageRequest(parseInt(currentPage) + 1)"
    ></pagination-buttons>
  </section>
</template>
<script>
import UserOrdersTable from "../../components/UserActions/userOrdersTable.vue";
import PaginationButtons from "../../components/common/PaginationButtons.vue";
import { onMounted, computed } from "vue";
import useUserOrders from "../../components/hooks/userOrders.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const {
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsUser,
    } = useUserOrders();
    onMounted(() => {
      const page = computed(() => {
        return route.query.page;
      });
      fetchOrdersAsUser(page);
    });
    return {
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsUser,
    };
  },
  components: { UserOrdersTable, PaginationButtons },
};
</script>
<style lang="scss">
.userOrders {
  @include basicCart;
  margin: 3rem;
  min-height: 60rem;

  h2 {
    padding: 3rem;
  }
}
.userOrder__updateButton {
  @include button;
  margin: 2rem;
  padding: 1rem;
  font-weight: 600;
  &:hover {
    color: #2c3e50;
  }
}
@media (min-width: 1024px) {
  .userOrders {
    margin: 0 auto;
    max-width: $max-width;
  }
}
</style>