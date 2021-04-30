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
                <p class="userCart__productInformation">
                  {{ product.quantity }}
                </p>
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
export default {
  components: { UserConfirmation },

  data() {
    return {
      userConfirmationDialog: false,
      userCartClick: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters["UserAuth/getToken"] || false;
    },

    userCart() {
      return this.$store.getters["Cart/getCart"];
    },
    summaryCost() {
      const summaryCost = this.userCart.reduce((acc, element) => {
        const sum = Number(element.price) * Number(element.quantity);
        return acc + sum;
      }, 0);

      return summaryCost.toFixed(2);
    },
  },
  methods: {
    showUserConfimationDialog() {
      if (!this.token) {
        this.$router.push({ name: "user-login", params: { view: "login" } });
        return;
      }
      this.userConfirmationDialog = true;

      this.fetchUserAddress();
    },
    hideUserConfirmationDialog() {
      this.userConfirmationDialog = false;
    },
    fetchUserAddress() {
      this.$store.dispatch("UserAuth/fetchUserAddress");
    },
    setUserClick() {
      this.userCartClick = true;
    },
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
  }
  &:last-child {
    border-bottom: 1px solid black;
  }
}
.userCart__arrowForMobile {
  position: absolute;
  top: 50%;
  right: 4rem;
  transform: translate(0, -50%);
  font-size: 4rem;
  color: $chartrouse-color;
  animation-name: arrowMove;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.userCart__product--tableDescription {
  background-color: $main-color !important;
  color: white;
}
.userCart__productInfomartionBox {
  width: 100%;
  height: 100%;
  border-left: 1px solid black;
  justify-self: center;
  align-self: center;
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
}
</style>