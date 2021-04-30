<template>
  <section class="userOrders">
    <h2>History of orders</h2>

    <user-orders-table
      v-if="this.orders.length > 0"
      :userOrders="this.orders"
      :admin="false"
    ></user-orders-table>
    <p v-else>There is no history of orders</p>
    <loader v-if="!this.orders"></loader>

    <button class="userOrder__updateButton" @click="this.fetchUserOrders">
      Update orders
    </button>
    <pagination-buttons
      class="searchResult__paginationButtons"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @pageChange="handleChangePageRequestAdmin"
      @previousPageClick="
        handleChangePageRequestAdmin(parseInt(this.currentPage) - 1)
      "
      @nextPageClick="
        handleChangePageRequestAdmin(parseInt(this.currentPage) + 1)
      "
    ></pagination-buttons>
  </section>
</template>
<script>
import UserOrdersTable from "../../components/UserActions/userOrdersTable.vue";
import PaginationButtons from "../../components/common/PaginationButtons.vue";
import userOrdersMixin from "../../components/mixins/userOrders.js";
export default {
  mixins: [userOrdersMixin],
  components: { UserOrdersTable, PaginationButtons },

  mounted() {
    const page = this.$route.query.page;
    this.fetchUserOrders(page);
  },

  methods: {
    async fetchUserOrders(page) {
      try {
        const rawData = await fetch(
          `http://localhost:3000/getUserOrders?page=${page}`,
          {
            headers: { Authorization: this.token.token },
          }
        );
        if (rawData.status !== 200) {
          throw new Error("Couldnt fetched data from server");
        }
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
    handleChangePageRequestAdmin(page) {
      if (page < 1 || page > this.numberOfPages) {
        return;
      }
      this.fetchUserOrders(page);
      this.$router.push({
        name: "user-orders",
        query: { page: page },
      });
    },
  },
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