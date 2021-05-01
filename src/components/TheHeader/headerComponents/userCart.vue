<template>
  <div class="cartIconContainer" @click="showUserCartAction">
    <font-awesome-icon
      :icon="['fas', 'shopping-cart']"
      class="cartContainer__cartIcon"
    ></font-awesome-icon>
    <p class="cartContainer__totalQtn">
      {{ totalQuantityOfUserProducts }}
    </p>
  </div>
  <back-drop @click="showUserCartAction" v-if="showUserCart"></back-drop>
  <transition name="cart">
    <section class="cartContainer" v-if="showUserCart">
      <h4>
        <div>
          <span>
            <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              class="cartContainer__cartIcon"
            ></font-awesome-icon
          ></span>
          YOUR CART
        </div>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="cartContainer__XButton"
          @click="showUserCartAction"
        ></font-awesome-icon>
      </h4>
      <p class="cartContainer__noProdInfo" v-if="this.userCart.length === 0">
        There is no product in your card
      </p>
      <div v-else class="cartContainer__cartList">
        <ul>
          <li v-for="product in userCart" :key="product">
            <div class="cartContainer__productDesc">
              <button
                class="cartContainer__deleteProductButton"
                @click="deleteProductFromCart(product._id)"
              >
                <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
              </button>
              <img :src="product.imagePath" :alt="product.name" />
              <p>
                {{ product.name }}
              </p>
            </div>
            <input-number
              :initialNumber="product.quantity"
              @valueChange="changeProductQuantityInCart($event, product._id)"
            ></input-number>
          </li>
        </ul>
        <div class="cartContainer__summary">
          <div class="cartContainer__SummaryBox">
            <p>Total products</p>
            <span>{{ totalQuantityOfUserProducts }}</span>
          </div>
          <div class="cartContainer__SummaryBox">
            <p>Total price</p>
            <span>{{ totalCartPrice.toFixed(2) }}$</span>
          </div>
          <button
            class="cartContainer__orderButton"
            @click="handleOrderRequest"
          >
            Order
          </button>
        </div>
      </div>
      <a @click.prevent="this.userCartPageLink">VIEW CART</a>
    </section>
  </transition>
</template>
<script>
import InputNumber from "../../common/InputNumber.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    InputNumber,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showUserCart = computed(() => {
      return store.getters["Cart/getShowCart"];
    });
    const userCart = computed(() => {
      return store.getters["Cart/getCart"];
    });
    const totalQuantityOfUserProducts = computed(() => {
      return userCart.value.reduce((qtn, elem) => (qtn += elem.quantity), 0);
    });
    const totalCartPrice = computed(() => {
      return userCart.value.reduce(
        (price, elem) => (price += elem.price * elem.quantity),
        0
      );
    });
    function showUserCartAction() {
      store.dispatch("Cart/toggleCart");
    }
    function handleOrderRequest() {
      /*  if (token) {
        router.push({ path: "/User/login" });
        return;
      } */
      router.push("/userOrder");
    }
    function userCartPageLink() {
      showUserCartAction();
      router.push({
        name: "user-cart",
      });
    }
    function changeProductQuantityInCart(number, prodId) {
      const payload = {
        newQuantity: number,
        prodId,
      };
      store.dispatch("Cart/updateProductQuantityInCart", payload);
    }
    function deleteProductFromCart(prodId) {
      store.dispatch("Cart/deleteItemFromCart", prodId);
    }
    return {
      showUserCart,
      totalQuantityOfUserProducts,
      totalCartPrice,
      showUserCartAction,
      handleOrderRequest,
      userCartPageLink,
      changeProductQuantityInCart,
      deleteProductFromCart,
    };
  },
};
</script>
<style lang='scss'>
.cartIconContainer {
  @include flexLayout;
  display: none;
  position: relative;
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  @media (min-width: 425px) {
    display: flex;
  }

  img {
    width: 100%;
    max-width: 4rem;
  }
}
.cartContainer__productDesc {
  @include flexLayout;
  width: 100%;
}
.cartContainer__deleteProductButton {
  @include buttonTransparent;
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 2rem;
}
.cartContainer__orderButton {
  @include mainFontBold;
  width: 75%;
  height: 4rem;
  border: none;
  background-color: rgb(62, 175, 124);

  font-size: $font-md;
  color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #292d2b;
  }
}
.cartContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;

  background-color: white;

  flex-direction: column;
  align-items: center;
  cursor: default;
  z-index: 1400;

  @media (min-width: 425px) {
    width: 30rem;
  }

  h4 {
    @include flexLayout;
    margin: 2rem 1rem 0 0;
    width: 80%;

    font-size: $font-md;
    float: right;
  }
  p {
    font-size: $font-md;
  }
  a {
    @include mainFontBold;
    position: relative;

    left: -3.5rem;
    width: 70%;
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #292d2b;

    text-decoration: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    &:hover {
      transform: translate(35%, 0%);
      color: #0bd3d3;
      &::before {
        width: 5rem;
        background-color: #0bd3d3;
      }
      &::after {
        width: 0rem;
        background-color: #0bd3d3;
      }
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 0rem;
      height: 0.2rem;
      background-color: #292d2d;
      transition: 0.2s all ease-in-out;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      right: 0;

      width: 5rem;
      height: 0.2rem;
      background-color: #292d2b;
      transition: 0.2s all ease-in-out;
    }
  }
}
.cartContainer__noProdInfo {
  margin-top: 3rem;
}
.cartContainer__SummaryBox {
  @include flexLayout;
  margin-right: 3rem;
  padding: 1.5rem 2rem;

  p {
    @include mainFontBold;
  }
  span {
    font-size: $font-md;
  }
}

.cartContainer__cartList {
  ul {
    height: 54vh;
    margin-top: 5rem;
    overflow-y: scroll;
  }
  li {
    @include flexLayout;
    position: relative;
    padding: 2rem;
    flex-direction: column;
  }
}

.cartContainer__cartIcon {
  font-size: 2.5rem;
}
.cartContainer__XButton {
  font-size: 3rem;
  cursor: pointer;
}
.cartContainer__totalQtn {
  @include mainFontBold;
  position: relative;
  bottom: -1.3rem;
  left: -0.2rem;
  width: 2rem;
  height: 2rem;
  font-size: $font-sm;
  color: white;

  z-index: 500;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -0.2rem;
    left: -0.4rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: red;

    z-index: -1;
  }
}

.cart-enter-active,
.cart-leave-active {
  transition: all 0.5s ease;
}

.cart-enter-from,
.cart-leave-to {
  transform: translate(30rem, 0);
  @media (min-width: 425px) {
    transform: translate(45rem, 0);
  }
}
.cart-enter-to,
.cart-leave-from {
  transform: translate(0rem, 0);
}
@media (min-width: 1024px) {
  .cartContainer__cartList {
    ul {
      height: 65vh;
    }
  }
}
</style>