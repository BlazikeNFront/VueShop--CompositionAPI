<template>
  <div class="orders__container" @scroll="setUserOrderTableScroll">
    <div class="userCart__arrowForMobile" v-if="!userOrderTableScroll">
      <font-awesome-icon :icon="['fa', 'arrow-right']"></font-awesome-icon>
    </div>
    <ul class="orders__ordersList">
      <li class="order__tableDescription">
        <h5>Order id</h5>
        <h5>Order Details</h5>
        <h5>Order Value</h5>
        <h5>Status</h5>
      </li>

      <li class="userOrder__li" v-for="order in userOrders" :key="order._id">
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
      :order="selectedOrder"
      :changeOrderStatus="allowOrderStatusChange"
      @closeModal="closeModal"
      @orderStatusChanged="orderStatusChanged"
    ></order-details>
  </div>
</template>
<script>
import OrderDetails from "./orderDetails.vue";
import { ref, computed } from "vue";
export default {
  components: {
    OrderDetails,
  },

  props: {
    userOrders: {
      type: Array,
      required: true,
    },
    admin: {
      required: false,
      type: Boolean,
    },
  },
  emits: ["orderStatusChanged"],
  setup(props, context) {
    const selectedOrder = ref(null);
    const showOrderDetails = ref(false);
    const userOrderTableScroll = ref(false);

    const allowOrderStatusChange = computed(() => {
      if (props.admin === true) {
        return true;
      } else {
        return false;
      }
    });
    function setUserOrderTableScroll() {
      userOrderTableScroll.value = true;
    }
    function toggleOrderDetails(order) {
      selectedOrder.value = order;
      showOrderDetails.value = true;
    }
    function closeModal() {
      showOrderDetails.value = false;
    }
    function calculateOrderValue(order) {
      const sum = order.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return Number(sum).toFixed(2);
    }
    function getOrderStatus(status) {
      if (parseInt(status) === 0) {
        return "Waiting for acceptance";
      } else if (parseInt(status) === 1) {
        return "In realization";
      } else if (parseInt(status) === 2) {
        return "Realized";
      } else {
        return "Can't get status from server";
      }
    }
    function orderStatusChanged() {
      context.emit("orderStatusChanged");
    }
    return {
      selectedOrder,
      showOrderDetails,
      userOrderTableScroll,
      allowOrderStatusChange,
      setUserOrderTableScroll,
      toggleOrderDetails,
      closeModal,
      calculateOrderValue,
      getOrderStatus,
      orderStatusChanged,
    };
  },
};
</script>
<style lang='scss'>
.orders__container {
  position: relative;
  margin-left: 5%;
  max-height: 50rem;
  overflow-x: scroll;
}
.orders__ordersList {
  margin: 0 auto;
  width: 70rem;
  border: solid;
  border-radius: 10px;
  background-color: White;
}
.userOrder__li {
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
  h5 {
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