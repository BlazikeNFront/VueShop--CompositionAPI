<template>
  <section class="userOrders">
    <h2>History of orders</h2>

    <user-orders-table
      v-if="orders.length > 0"
      :userOrders="orders"
      :admin="false"
    ></user-orders-table>
    <p v-else>There is no history of orders</p>
    <div class="userOrder_submitContainer">
      <loader class="userOrder__loader" v-if="loader"></loader>

      <button class="userOrder__updateButton" @click="updateOrders()">
        Update orders
      </button>
    </div>
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
import { onMounted } from "vue";
import useUserOrders from "../../components/hooks/userOrders.js";

export default {
  setup() {
    const {
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsUser,
      updateOrders,
    } = useUserOrders();
    onMounted(() => {
      fetchOrdersAsUser(currentPage);
    });
    return {
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsUser,
      updateOrders,
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    padding: 3rem;
  }
}
.userOrder_submitContainer {
  position: relative;
  margin: 0 auto;
  width: 20rem;
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
.userOrder__loader {
  position: absolute;
  right: -4rem;
  transform: scale(0.75);
}
@media (min-width: 1024px) {
  .userOrders {
    margin: 0 auto;
    max-width: $max-width;
  }
}
</style>