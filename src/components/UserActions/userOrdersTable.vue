<template>
  <div class="orders__container" @scroll="this.setUserOrderTableScroll">
    <div class="userCart__arrowForMobile" v-if="!this.userOrderTableScroll">
      <font-awesome-icon :icon="['fa', 'arrow-right']"></font-awesome-icon>
    </div>
    <ul class="orders__ordersList">
      <li class="order__tableDescription">
        <h4>Order id</h4>
        <h4>Order Details</h4>
        <h4>Order Value</h4>
        <h4>Status</h4>
      </li>

      <li class="order__li" v-for="order in this.userOrders" :key="order._id">
        <div class="userOrder__productInfomartionBox">
          <p class="userOrder__productInformation">
            {{ order._id }}
          </p>
        </div>
        <div class="userOrder__productInfomartionBox">
          <button
            class="userOrder__checkDeatils"
            @click="toggleOrderDetails(order)"
          >
            Check details
          </button>
        </div>
        <div class="userOrder__productInfomartionBox">
          <p class="userOrder__productInformation">
            {{ calculateOrderValue(order) }} $
          </p>
        </div>
        <div class="userOrder__productInfomartionBox">
          <p class="userOrder__productInformation">
            {{ getOrderStatus(order.status) }}
          </p>
        </div>
      </li>
    </ul>
    <order-details
      v-if="showOrderDetails"
      :order="this.selectedOrder"
      :changeOrderStatus="this.allowOrderStatusChange"
      @closeModal="this.closeModal"
    ></order-details>
  </div>
</template>
<script>
import OrderDetails from "./orderDetails.vue";
export default {
  components: {
    OrderDetails,
  },
  props: {
    userOrders: {
      required: true,
    },
    admin: {
      required: false,
      type: Boolean,
    },
  },
  data() {
    return {
      selectedOrder: null,
      showOrderDetails: false,
      userOrderTableScroll: false,
    };
  },
  computed: {
    allowOrderStatusChange() {
      if (this.admin === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    setUserOrderTableScroll() {
      this.userOrderTableScroll = true;
    },
    toggleOrderDetails(order) {
      this.selectedOrder = order;
      this.showOrderDetails = true;
    },
    closeModal() {
      this.showOrderDetails = false;
    },
    calculateOrderValue(order) {
      const sum = order.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return Number(sum).toFixed(2);
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
  },
};
</script>
<style lang='scss'>
.orders__container {
  position: relative;
  margin-left: 5%;

  height: 50rem;
  overflow-x: scroll;
}
.orders__ordersList {
  margin: 0 auto;
  width: 70rem;
  border: solid;
  border-radius: 10px;
  background-color: White;
}
.order__li {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-gap: 0;
  height: 4.5rem;
  border: 1px solid black;
  font-size: $font-md;

  color: black;
  &:nth-child(odd) {
    background-color: $main-color;
    color: white;
  }
}

.userOrder__productInfomartionBox {
  @include flexLayout;
  width: 100%;
  height: 100%;

  justify-content: center;
  &:not(:first-child) {
    border-left: 1px solid black;
  }
  p {
    text-align: center;
    width: 100%;
  }
}
.order__tableDescription {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  align-self: center;
  grid-gap: 0;
  height: 4rem;
  background-color: $main-color;
  border: 1px solid black;
  font-size: 1.5rem;

  color: white;
  h4 {
    align-self: center;
    font-weight: 600;
  }
}
.userOrder__checkDeatils {
  @include button;
  @include mainFontBold;
  width: 80%;
  height: 80%;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background-color: $light-blue;
  &:hover {
    color: #2c3e50;
  }
}
@media (min-width: 768px) {
  .orders__container {
    margin: 0;
    overflow: initial;
  }
}
@media (min-width: 1024px) {
  .orders__container {
    margin: 0;
  }
  .orders__ordersList {
    margin: 0 auto;
    width: 90%;
  }
}
</style>