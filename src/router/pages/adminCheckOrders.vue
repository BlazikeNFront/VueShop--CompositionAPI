<template>
  <section class="userOrders userOrders--adminView">
    <h2>Users orders</h2>
    <user-orders-table
      v-if="this.orders.length > 0"
      :userOrders="this.orders"
      :admin="true"
    ></user-orders-table>
    <p v-else>There is no orders</p>
    <loader v-if="this.loader"></loader>

    <button class="userOrders--adminView__button" @click="this.getOrders">
      FETCH ORDERS
    </button>

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
</template>
<script >
import PaginationButtons from "../../components/common/PaginationButtons.vue";
import UserOrdersTable from "../../components/UserActions/userOrdersTable.vue";
import userOrdersMixin from "../../components/mixins/userOrders.js";
export default {
  mixins: [userOrdersMixin],
  components: {
    PaginationButtons,
    UserOrdersTable,
  },

  mounted() {
    const page = this.$route.query.page;
    this.fetchOrders(page);
  },

  methods: {
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
    },
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
