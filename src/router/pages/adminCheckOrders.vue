<template>
  <section class="userOrders userOrders--adminView">
    <h2>Users orders</h2>
    <user-orders-table
      v-if="orders.length > 0"
      :userOrders="orders"
      :admin="true"
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

    const {
      fetchOrders,
      numberOfPages,
      orders,
      loader,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsAdmin,
    } = useUserOrders();
    /* async function fetchOrders(page) {
      try {
        const rawData = await fetch(
          `http://localhost:3000/admin/getOrders?page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (rawData.status !== 200) {
          throw new Error("Couldnt fetched data from server");
        }
        const ordersData = await rawData.json();

        const { data, totalItems } = ordersData;
        const numberOfPages = Math.ceil(totalItems / 10);
        orders.value = data;
        numberOfPages.value = numberOfPages;
      } catch (err) {
        console.log(err);
        store.dispatch("ErrorHandler/showError", err.message);
      }
    } */
    onMounted(() => {
      const page = computed(() => {
        return route.query.page;
      });
      fetchOrdersAsAdmin(page);
    });
    return {
      orders,
      loader,
      fetchOrders,
      numberOfPages,
      currentPage,
      handleChangePageRequest,
      fetchOrdersAsAdmin,
    };
  },
  /* mounted() {
    const page = this.$route.query.page;
    this.fetchOrders(page);
  }, */

  /* methods: {
    async fetchOrders(page) {
      try {
        const token = this.token.token;

        const rawData = await fetch(
          `http://localhost:3000/admin/getOrders?page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (rawData.status !== 200) {
          throw new Error("Couldnt fetched data from server");
        }
        const ordersData = await rawData.json();

        const { data, totalItems } = ordersData;
        const numberOfPages = Math.ceil(totalItems / 10);
        this.orders = data;
        this.numberOfPages = numberOfPages;
      } catch (err) {
        console.log(err);
        this.$store.dispatch("ErrorHandler/showError", err.message);
      }
    }, */
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
