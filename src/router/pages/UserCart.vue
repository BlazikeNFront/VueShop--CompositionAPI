<template>
  <section class="userCart">
    <h2>Cart</h2>
    <div>
      <div v-if="this.userCart.length > 0">
        <div class="userCart__cartContainer" @scroll="this.setUserClick">
          <div class="userCart__arrowForMobile" v-if="!this.userCartClick">
            <font-awesome-icon
              :icon="['fa', 'arrow-right']"
            ></font-awesome-icon>
          </div>
          <ul class="userCart__productList">
            <li class="userCart__product userCart__product--tableDescription">
              <span></span>
              <h4 class="userCart__columnDescription">Product name</h4>
              <h4 class="userCart__columnDescription">Quantity</h4>
              <h4 class="userCart__columnDescription">Product price</h4>
              <h4 class="userCart__columnDescription">Summary</h4>
            </li>
            <li
              class="userCart__product"
              v-for="product in userCart"
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
                <button @click="deleteProductFromCart(product._id)">
                  <font-awesome-icon
                    :icon="['fas', 'times']"
                  ></font-awesome-icon>
                </button>
                <input-number
                  class="userCart__inputNumber"
                  :initialNumber="product.quantity"
                  @valueChange="
                    changeProductQuantityInCart($event, product._id)
                  "
                ></input-number>
              </div>
              <div class="userCart__productInfomartionBox">
                <p class="userCart__productInformation">
                  {{ product.price }} $
                </p>
              </div>
              <div class="userCart__productInfomartionBox">
                <p class="userCart__productInformation">
                  {{ (product.price * product.quantity).toFixed(2) }} $
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p class="userCart__summaryCost">Summary: {{ summaryCost }}$</p>
        <button
          class="userCart__confirmationButton"
          @click="this.showUserConfimationDialog()"
        >
          Confirm order
        </button>
      </div>
      <p v-else class="userCart__summaryCost">There is no product in cart !</p>
    </div>

    <user-confirmation
      v-if="this.userConfirmationDialog"
      @hideUserConfirmationDialog="hideUserConfirmationDialog"
    ></user-confirmation>
  </section>
</template>
<script>
import UserConfirmation from "../../components/UserActions/userOrderConfirmation.vue";
import InputNumber from "../../components/common/InputNumber.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import useToken from "../../components/hooks/logger.js";

export default {
  components: { UserConfirmation, InputNumber },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const userConfirmationDialog = ref(
      route.params.showConfirmOrderDialog || false
    );

    const userCartClick = ref(false);
    const { token } = useToken();

    const userCart = computed(() => {
      return store.getters["Cart/getCart"];
    });
    const summaryCost = computed(() => {
      const summaryCost = userCart.value.reduce((acc, element) => {
        const sum = Number(element.price) * Number(element.quantity);
        return acc + sum;
      }, 0);
      return summaryCost.toFixed(2);
    });
    function deleteProductFromCart(prodId) {
      store.dispatch("Cart/deleteItemFromCart", prodId);
    }
    function changeProductQuantityInCart(number, prodId) {
      const payload = {
        newQuantity: number,
        prodId,
      };
      store.dispatch("Cart/updateProductQuantityInCart", payload);
    }
    function showUserConfimationDialog() {
      if (!token.value) {
        router.push({ name: "user-login", params: { view: "login" } });
        return;
      }
      userConfirmationDialog.value = true;
      fetchUserAddress();
    }
    function hideUserConfirmationDialog() {
      userConfirmationDialog.value = false;
    }
    function fetchUserAddress() {
      store.dispatch("UserAuth/fetchUserAddress");
    }
    function setUserClick() {
      userCartClick.value = true;
    }
    onMounted(() => {
      if (userConfirmationDialog.value) {
        fetchUserAddress();
      }
    });
    return {
      userConfirmationDialog,
      userCartClick,
      token,
      userCart,
      summaryCost,
      deleteProductFromCart,
      changeProductQuantityInCart,
      showUserConfimationDialog,
      hideUserConfirmationDialog,
      setUserClick,
    };
  },
};
</script>
<style lang='scss'>
.userCart {
  @include basicCart;
  margin: 1rem;
  min-height: 60rem;

  h2 {
    padding: 2rem;
  }
}
.userCart__cartContainer {
  position: relative;
  padding: 1rem;
  overflow: scroll;
}
.userCart__productList {
  margin: 5rem auto;
  width: 60rem;
  border: solid;
  border-radius: 10px;
  overflow-x: scroll;
}

.userCart__columnDescription {
  margin: auto;
  font-weight: 600;
  text-align: center;
}
.userCart__product {
  display: grid;
  grid-template-columns: 13rem 2fr 1fr 1fr 1fr;
  grid-gap: 0;
  border: 1px solid black;
  border-bottom: none;

  background-color: white;
  font-size: $font-md;

  color: black;

  &:nth-child(odd) {
    background-color: $main-color;
    color: white;
    .userCart__productInfomartionBox {
      button {
        color: white;
      }
      .customInputRange {
        border: 2px solid white;
        label {
          color: white;
        }
        svg {
          color: white;
        }
        input {
          color: White;
        }
      }
    }
  }
  &:last-child {
    border-bottom: 1px solid black;
  }
}
.userCart__arrowForMobile {
  position: absolute;
  top: 50%;
  right: 10rem;
  font-size: 4rem;
  color: $chartrouse-color;
  z-index: 1;
  animation-name: arrowMove;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.userCart__product--tableDescription {
  background-color: $main-color !important;
  color: white;
}
.userCart__productInfomartionBox {
  @include flexLayout;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  border-left: 1px solid black;

  button {
    @include buttonTransparent;

    align-self: flex-end;
    font-size: 2rem;
  }
  .customInputRange {
    border: 2px solid black;
  }
}

.userCart__productInformation {
  @include flexLayout;
  height: 100%;
  justify-content: center;

  font-weight: 600;
}
.userCart__productImage {
  margin: 0 auto;
  width: 100%;
}

.userCart__summaryPrice {
  text-align: right;
}
.userCart__summaryCost {
  font-size: 2rem;
  font-weight: 600;

  color: $main-color;
}
.userCart__adressConfirmation {
  width: 50%;
}
.userCart__confirmationButton {
  @include button;
  margin: 1rem;
  padding: 1rem;

  font-size: $font-md;
  color: white;
  font-weight: 600;
}

.userCart__modalMessage {
  font-size: $font-md;
  color: white;
}

@keyframes arrowMove {
  0% {
    transform: translate(0, -50%);
  }
  50% {
    transform: translate(2rem, -50%);
  }
  100% {
    transform: translate(0rem, -50%);
  }
}
@media (min-width: 768px) {
  .userCart {
    margin: 0 auto;
    width: 90%;
    max-width: 135rem;
  }
  .userCart__arrowForMobile {
    display: none;
  }
  .userCart__productList {
    overflow: initial;
  }
}
@media (min-width: 1024px) {
  .userCart {
    max-width: $max-width;
  }
  .userCart__cartContainer {
    overflow: initial;
  }
}
</style>