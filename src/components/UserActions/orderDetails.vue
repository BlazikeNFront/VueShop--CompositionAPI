<template>
  <div class="orderDetailsView">
    <modal-dialog
      @closeDialog="this.$emit('closeModal')"
      width="95%"
      height="fit-content"
    >
      <h4 class="orderDetailsView__h4">Order Details for: {{ order._id }}</h4>
      <div class="orderDetails__listContainer" @scroll="setUserOrderClick">
        <div class="userCart__arrowForMobile" v-if="!userOrderClick">
          <font-awesome-icon :icon="['fa', 'arrow-right']"></font-awesome-icon>
        </div>
        <ul class="userCart__productList orderDetails__productList">
          <li class="userCart__product userCart__product--tableDescription">
            <span></span>
            <h4 class="userCart__columnDescription">Product name</h4>
            <h4 class="userCart__columnDescription">Quantity</h4>
            <h4 class="userCart__columnDescription">Product price</h4>
            <h4 class="userCart__columnDescription">Summary</h4>
          </li>
          <li
            class="userCart__product"
            v-for="product in order.cart"
            :key="product._id"
          >
            <img
              class="userCart__productImage"
              :src="product.imagePath"
              :alt="product.name + 'image'"
            />
            <div class="userCart__productInfomartionBox">
              <p class="userCart__productInformation">
                {{ product.name }}
              </p>
            </div>
            <div class="userCart__productInfomartionBox">
              <p class="userCart__productInformation">
                {{ product.quantity }}
              </p>
            </div>
            <div class="userCart__productInfomartionBox">
              <p class="userCart__productInformation">{{ product.price }} $</p>
            </div>
            <div class="userCart__productInfomartionBox">
              <p class="userCart__productInformation">
                {{ (product.price * product.quantity).toFixed(2) }} $
              </p>
            </div>
          </li>
        </ul>
      </div>
      <h5 class="orderDetailsView__h5">Client information</h5>
      <div class="orderDetailsView__userInformation">
        <p class="orderDetailsView__p">Name: Damian</p>
        <p class="orderDetailsView__p">Surname: Stachurski</p>
        <p class="orderDetailsView__p">Adress: Panstwo Dykty i kartonu</p>
      </div>
      <form
        v-if="changeOrderStatus"
        class="orderStatusForm"
        @submit.prevent="handleChangeOrderStatus(order._id)"
        @click="clearMessage"
      >
        <p class="orderStatusForm__p">Change order Status:</p>
        <div class="orderStatusForm__formControl">
          <label class="orderStatusForm__lablel" for="1">Accept Order</label>
          <input
            id="orderStatusOptions"
            name="ordersStatus"
            type="radio"
            value="1"
            v-model="orderDetailsStatus"
          />
        </div>
        <div class="orderStatusForm__formControl">
          <label class="orderStatusForm__lablel" for="2"
            >Mark as realized</label
          >
          <input
            id="orderStatusOptions"
            name="ordersStatus"
            type="radio"
            value="2"
            v-model="orderDetailsStatus"
          />
        </div>
        <button class="orderStatusForm__button">Submit change</button>
        <loader class="orderStatusForm__loader" v-if="loader"></loader>
      </form>
      <p v-if="orderStatusChangedResult">{{ orderStatusChangedResult }}</p>
    </modal-dialog>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import useToken from "../hooks/logger.js";
export default {
  props: ["order", "changeOrderStatus"],

  emits: ["orderStatusChanged", "closeModal"],
  setup(props, context) {
    const store = useStore();
    const { token } = useToken();

    const orderDetailsStatus = ref(null);
    const orderDetailsModal = ref(false);
    const orderDeatilsModalMsg = ref(null);
    const loader = ref(false);
    const userOrderClick = ref(false);
    const orderStatusChangedResult = ref(null);
    function setUserOrderClick() {
      userOrderClick.value = true;
    }
    function clearMessage() {
      orderStatusChangedResult.value = null;
    }
    function closeModal() {
      store.dispatch("Admin/closeShowOrderDetails");
    }
    async function handleChangeOrderStatus(orderId) {
      try {
        loader.value = true;
        const payload = {
          orderId,
          orderStatus: orderDetailsStatus.value,
        };
        const response = await fetch(
          `http://localhost:3000/admin/changeOrderStatus`,
          {
            method: "POST",
            headers: {
              Authorization: token.value,
              "Content-Type": "application/json",
            },
            body: await JSON.stringify(payload),
          }
        );
        if (response.status !== 200) {
          throw new Error("Server did not accepted change of order");
        } else {
          loader.value = false;
          orderStatusChangedResult.value = "Order Status Changed";
          context.emit("orderStatusChanged");
        }
      } catch (err) {
        console.log(err);
        loader.value = false;
        orderStatusChangedResult.value = "Couldnt Changed order Status";
        store.dispatch("ErrorHandler/showError", err.message);
      }
    }
    return {
      orderDetailsStatus,
      closeModal,
      orderDetailsModal,
      handleChangeOrderStatus,
      orderDeatilsModalMsg,
      loader,
      userOrderClick,
      setUserOrderClick,
      clearMessage,
      orderStatusChangedResult,
    };
  },
};
</script>
<style lang='scss'>
.orderDetailsView {
  text-align: center;
}

.orderDetailsView__h4 {
  font-size: 2rem;
  text-align: center;
}
.orderDetailsView__h5 {
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
}
.orderDetails__productList {
  margin: 1rem auto;
  p {
    text-align: center;
  }
}

.orderDetails__listContainer {
  width: 100%;
  position: relative;
  overflow-x: scroll;
}

.orderDetails__products__thead {
  height: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.orderDetails__descriptionBox {
  @include flexLayout;
  width: 100%;
  height: 3rem;

  justify-content: center;
}
.orderDetailsView__userInformation {
  @include flexLayout;
  margin: 2rem;

  width: 100%;
  justify-content: space-evenly;
  font-size: 1.5rem;
  text-align: center;
}
.orderStatusForm {
  @include flexLayout;
  margin: 2rem;
}
.orderDetailsView__p {
  color: black;
}
.orderStatusForm__formControl {
  @include flexLayout;
  margin: 0.5rem;
  align-items: flex-start;
}
.orderStatusForm__lablel {
  font-size: 1.5rem;
  color: black;
}
.orderStatusForm__p {
  margin-right: 1rem;

  font-size: 1.6rem;
  color: black;
}

.orderStatusForm__button {
  @include button;
  padding: 0.5rem 1rem;
  color: white;
}
.orderStatusForm__loader {
  transform: scale(0.5);
}
</style>
 