<template>
  <div>
    <modal-dialog @closeDialog="this.$emit('hideUserConfirmationDialog')">
      <div class="confirmationBox">
        <div class="confirmationBox__pickAddressBox" v-if="!lastUsedAddress">
          <h3>There is no delivery address</h3>
          <p>
            Click
            <button
              class="confirmationBox__pickAddressButton"
              @click="showAddressForm = true"
            >
              Here
            </button>
            to pick delivery address
          </p>
        </div>
        <div v-else>
          <div class="confirmationBox__infoBox">
            <span>Name:</span>
            <p>{{ lastUsedAddress.name }}</p>
          </div>
          <div class="confirmationBox__infoBox">
            <span>Surname:</span>
            <p>{{ lastUsedAddress.surname }}</p>
          </div>
          <div class="confirmationBox__infoBox">
            <span>Address:</span>
            <p>{{ lastUsedAddress.address }}</p>
          </div>
        </div>

        <transition name="addNewAddress" mode="out-in">
          <add-address-form
            v-if="showAddressForm"
            @exitButton="showAddressForm = false"
          ></add-address-form>
        </transition>

        <div class="confirmationBox__addAdressBox__addressButtons">
          <button @click="showAddressForm = !showAddressForm">
            Add new address
          </button>
          <button @click="handleOrderRequest">Confirm Order</button>
        </div>
      </div>
      <transition name="orderResult" mode="out-in">
        <div
          class="confirmationBox__orderResultBox"
          :class="{
            orderResultBox__prodList: orderResult.productsUnavaliable,
          }"
          v-if="orderResult.visible"
        >
          <h4>Order Request Result</h4>
          <loader
            class="orderResultBox__loader"
            v-if="!orderResult.message"
          ></loader>
          <div class="orderResultBox__resultDisplay" v-else>
            <div class="orderResultBox__resultInformation">
              <span
                :style="
                  orderResult.result === true ? 'color:#3eaf7c' : 'color:red'
                "
                ><font-awesome-icon
                  v-if="orderResult.result === true"
                  :icon="['fa', 'check']"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  :icon="['fas', 'times']"
                ></font-awesome-icon
              ></span>
              <p>
                {{ orderResult.message }}
              </p>
            </div>
            <div
              class="orderResultBox__unavalibleProductsBox"
              v-if="orderResult.productsUnavaliable"
            >
              <h4>Unavalible products:</h4>
              <ul>
                <li
                  v-for="product in orderResult.productsUnavaliable"
                  :key="product._id"
                >
                  <p>{{ product.name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <button class="orderResultBox__confirmButton" @click="confirmAction">
            OK
          </button>
        </div>
      </transition>
    </modal-dialog>
  </div>
</template>
<script>
import AddAddressForm from "./addAdressForm.vue";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useToken from "../hooks/logger.js";
import useHeaderHook from "../hooks/createHeaders.js";
export default {
  components: {
    AddAddressForm,
  },
  emits: ["hideUserConfirmationDialog"],
  setup() {
    const store = useStore();
    const { token } = useToken();
    const router = useRouter();
    const createHeaders = useHeaderHook();
    const showAddressForm = ref(false);
    const orderResult = reactive({
      visible: false,
      result: null,
      message: "Shop couldnt accept order, try again later",
      productsUnavaliable: null,
    });
    const lastUsedAddress = computed(() => {
      return store.getters["UserAuth/getLastUsedAddress"];
    });

    async function handleOrderRequest() {
      try {
        orderResult.visible = true;
        orderResult.loader = true;

        const requestHeaders = createHeaders(token.value);

        const payload = {
          cart: store.getters["Cart/getCart"],
        };

        const rawData = await fetch(
          "https://vueshopcompback.herokuapp.com/confirmOrder",
          {
            method: "POST",
            headers: requestHeaders,
            body: await JSON.stringify(payload),
            credentials: "include",
          }
        );

        if (rawData.status === 406) {
          const data = await rawData.json();

          const productsUnavaliable = data.products;
          orderResult.result = false;
          orderResult.message = "One or more products are no longer avaliable";
          orderResult.productsUnavaliable = productsUnavaliable;
        } else if (rawData.status === 200) {
          orderResult.result = true;
          orderResult.message = "Order accepted";
          store.dispatch("Cart/resetCart");
        } else {
          orderResult.result = false;
          orderResult.message = "Shop couldnt accept order, try again later";
        }
        orderResult.loader = false;
      } catch (err) {
        orderResult.loader = false;
        console.log(err);
      }
    }
    function confirmAction() {
      if (orderResult.result === true) {
        router.push({ name: "user-orders" });
      } else {
        orderResult.visible = false;
      }
    }
    return {
      showAddressForm,
      orderResult,
      lastUsedAddress,
      handleOrderRequest,
      confirmAction,
    };
  },
};
</script>
<style lang="scss">
.confirmationBox {
  @include flexLayout;
  position: relative;
  width: 35rem;
  height: 45rem;
  flex-direction: column;
  justify-content: space-evenly;

  span {
    width: 30%;
    font-size: 1.5rem;
    font-weight: 600;
  }

  label {
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  p {
    font-size: 1.5rem;
  }
}

.confirmationBox__orderResultBox {
  @include basicCart;
  @include flexLayout;
  position: absolute;
  margin: 10rem auto;
  padding: 2rem;
  width: 28rem;
  height: 28rem;
  flex-direction: column;

  h4 {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
  p {
    display: flex;
    max-width: 65%;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }

  span {
    @include flexLayout;
    margin: 1rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: white;
    justify-content: center;

    font-size: 4rem;
  }
}
.orderResultBox__confirmButton {
  @include button;
  padding: 0.5rem 1rem;
  font-weight: 600;
}
.orderResultBox__resultInformation {
  @include flexLayout;
  width: 100%;
}
.orderResultBox__mainMessage {
  @include flexLayout;
}
.orderResultBox__prodList {
  height: 35rem;
}
.orderResultBox__productsUnavalible {
  @include flexLayout;
  flex-direction: column;
  ul {
    @include flexLayout;
    flex-direction: column;
  }
  p {
    width: 100%;
    max-width: 100%;
  }
}
.confirmationBox__pickAddressBox {
  h3 {
    margin: 1.5rem;
    font-size: 2rem;
    text-align: center;
  }
  p {
    width: 100%;
    font-weight: 600;
    text-align: center;
  }
  button {
    @include button;
  }
}

.confirmationBox__changeAddressButton {
  position: absolute;
  top: 0;
  right: 10rem;
}
.confirmationBox__infoBox {
  @include flexLayout;
  margin: 1.5rem;
  width: 90%;
  min-width: 20rem;
  text-align: right;
  span {
    width: 35%;
  }
  p {
    width: 60%;
    text-align: left;
    font-size: 2rem;
  }
}
.confirmationBox__addAdressBox__addressButtons {
  @include flexLayout;

  button {
    @include button;
    margin: 1rem;
    padding: 0.5rem;
  }
}

.addNewAddress-enter-active,
.orderResult-enter-active {
  transition: all 0.5s ease-out;
}
.addNewAddress-leave-active,
.orderResult-leave-active {
  transition: all 0.5s ease-in;
}
.addNewAddress-enter-from,
.addNewAddress-leave-to {
  transform: translate(30rem);
  opacity: 0;
  @media (min-width: 768px) {
    transform: translate(40rem);
  }
}
.addNewAddress-enter-to,
.addNewAddress-leave-from {
  transform: translate(0rem);
  opacity: 1;
  @media (min-width: 768px) {
    transform: translate(-50%);
  }
}

.orderResult-enter-from,
.orderResult-leave-to {
  transform: translate(30rem);
  opacity: 0;
  @media (min-width: 768px) {
    transform: translate(40rem);
  }
}
.orderResult-enter-to,
.orderResult-leave-from {
  transform: translate(0rem);
  opacity: 1;
}

@media (min-width: 768px) {
  .confirmationBox {
    width: 60rem;
    height: 50rem;
  }
  .confirmationBox__addAdressBox__addressButtons {
    button {
      padding: 1rem;
      font-weight: 600;
    }
  }
}
</style>

