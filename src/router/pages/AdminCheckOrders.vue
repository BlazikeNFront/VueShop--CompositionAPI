<template>
  <section class="userOrders userOrders--adminView">
    <h2>Users orders</h2>
    <user-orders-table
      v-if="orders.length > 0"
      :userOrders="orders"
      :admin="true"
      @orderStatusChanged="fetchOrdersAsAdmin(currentPage)"
    ></user-orders-table>
    <p v-else>There is no orders</p>
    <div class="userOrder_submitContainer">
      <loader class="userOrder__loader" v-if="loader"></loader>
      <button class="userOrder__updateButton" @click="updateOrders(true)">
        FETCH ORDERS
      </button>
    </div>

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

import { onMounted } from "vue";

import useUserOrders from "../../components/hooks/userOrders.js";
export default {
  components: {
    PaginationButtons,
    UserOrdersTable,
  },
  setup() {
    const {
      fetchOrders,
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsAdmin,
      updateOrders,
    } = useUserOrders();

    onMounted(() => {
      fetchOrdersAsAdmin(currentPage);
    });
    return {
      orders,
      loader,
      fetchOrders,
      numberOfPages,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsAdmin,
      updateOrders,
    };
  },
};
</script>
<style lang='scss'>

</style>

