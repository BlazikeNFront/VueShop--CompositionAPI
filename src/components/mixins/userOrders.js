export default {
  data() {
    return {
      selectedOrder: null,
      showOrderDetails: false,
      numberOfPages: null,
      orders: [],
      loader: false,
      orderClicked: false,
    };
  },
  computed: {
    currentPage() {
      return this.$route.query.page;
    },
  },

  methods: {
    setOrderClicked() {
      this.orderClicked = true;
    },

    handleChangePageRequest(page) {
      if (page < 1 || page > this.numberOfPages) {
        return;
      }

      this.fetchOrders(page);
      this.$router.push({
        name: "admin-orders",
        query: { page: page },
      });
    },

    updateSelectedOrder(order) {
      this.selectedOrder = order;
      this.showOrderDeatils = true;
    },
    getOrderStatus(status) {
      if (status === 0) {
        return "Waiting for acceptance";
      } else if (status === 1) {
        return "In realization";
      } else {
        return "Realized";
      }
    },
    calculateValue(cart) {
      const value = cart.reduce(
        (acc, element) => (acc += element.price * element.quantity),
        0
      );
      return value.toFixed(2);
    },
  },
};
