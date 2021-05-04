<template>
  <section class="userOrders userOrders--adminView">
    <h2>Users orders</h2>
    <user-orders-table
      v-if="orders.length > 0"
      :userOrders="orders"
      :admin="true"
      @orderStatusChanged="fetchChangedOrderData"
    ></user-orders-table>
    <p v-else>There is no orders</p>
    <loader v-if="loader"></loader>

    <button class="userOrders--adminView__button" @click="fetchOrdersAsAdmin">
      FETCH ORDERS
    </button>

    <pagination-buttons
      class="searchResult__paginationButtons"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @pageChange="handleChangePageRequest"
      @previousPageClick="handleChangePageRequest(parseInt(currentPage) - 1)"
      @nextPageClick="handleChangePageRequest(parseInt(currentPage) + 1)"
    ></pagination-buttons>
  </section>
</template>
<script >
import PaginationButtons from "../../components/common/PaginationButtons.vue";
import UserOrdersTable from "../../components/UserActions/userOrdersTable.vue";

import { computed, onMounted } from "vue";

import { useRoute } from "vue-router";

import useUserOrders from "../../components/hooks/userOrders.js";
export default {
  components: {
    PaginationButtons,
    UserOrdersTable,
  },
  setup() {
    const route = useRoute();
    const page = computed(() => {
      return route.query.page;
    });
    const {
      fetchOrders,
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsAdmin,
    } = useUserOrders();
    function fetchChangedOrderData() {
      fetchOrdersAsAdmin(page.value);
    }
    onMounted(() => {
      fetchOrdersAsAdmin(page.value);
    });
    return {
      orders,
      loader,
      fetchOrders,
      numberOfPages,
      currentPage,
      handleChangePageRequest,
      fetchChangedOrderData,
      fetchOrdersAsAdmin,
    };
  },
};
</script>
<style lang="scss">
.userOrders--adminView__button {
  @include button;
  margin: 1rem;
  padding: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
