<template>
  <section class="productDetails">
    <loader v-if="!product"></loader>
    <div class="productDetails_productBox" v-else>
      <img
        :src="product.imagePath.large"
        alt="rod"
        class="productDetails__image"
      />

      <h4 class="productDetails__title">{{ product.name }}</h4>
      <p class="productDetails__desc">{{ product.description }}</p>
      <p class="productDetails__price">{{ product.price }} $</p>
      <form class="producyDetails__form" @submit.prevent="addToCart">
        <input-range
          class="productDetails__inputRange"
          @valueChange="changeQuantity"
        ></input-range>
        <div class="productDetails__addProductToCartBox">
          <button class="productBoxSmall__addToCartBtn">
            Add to cart
            <font-awesome-icon
              :icon="['fas', 'cart-arrow-down']"
            ></font-awesome-icon>
          </button>
          <transition name="productDetailsNotifacation">
            <div
              class="productDetails__addedToCartNotification"
              v-if="this.showNotifaction"
            >
              <font-awesome-icon :icon="['fas', 'check']"></font-awesome-icon>
              <p>Product added to cart</p>
            </div>
          </transition>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import InputRange from "../../components/common/InputNumber.vue";

export default {
  components: {
    InputRange,
  },

  data() {
    return {
      quantity: 1,
      showNotifaction: false,
    };
  },
  mounted() {
    const routerProductId = this.$route.params.productId;
    if (this.product === null || this.product._id !== routerProductId) {
      this.$store.dispatch("UserSearch/setProductDetails", routerProductId);
    }
  },
  methods: {
    changeQuantity(number) {
      this.quantity = number;
    },
    addToCart() {
      const payload = {};
      payload._id = this.product._id;
      payload.name = this.product.name;
      payload.imagePath = this.product.imagePath.small;
      payload.price = this.product.price;
      payload.quantity = this.quantity;
      this.$store.dispatch("Cart/addItemtoCart", payload);
      this.$store.dispatch("Cart/toggleCart");
      this.showNotifaction = true;
      this.$store.dispatch("Cart/setCartInLocalStorage");
    },
  },
  computed: {
    product() {
      return this.$store.getters["UserSearch/getProductDetails"];
    },
  },
};
</script>
<style lang='scss'>
.productDetails {
  @include flexLayout;
  @include mainBorder;
  margin: 2rem auto;
  padding-bottom: 3rem;
  width: 100%;

  flex-direction: column;
  background-color: white;
  font-size: $font-md;
  color: black;
  img {
    width: 100%;
    //72rem on desktop
  }
}

.productDetails__title {
  @include mainFontBold;
  margin: 5rem 0 3rem 0;
  font-size: 4rem;
}
.productDetails__desc {
  margin: 0 auto;
  width: 80%;
  text-align: justify;
  font-size: 1.4rem;
  white-space: pre-wrap;
  line-height: 3.5rem;
}
.producyDetails__form {
  margin: 2rem auto;

  width: 23rem;

  button {
    @include button;
    padding: 1rem;
    width: 80%;
    border-radius: 20px;
    box-shadow: 3px 3px 8px black;
    font-family: inherit;
    font-weight: 600;
    letter-spacing: 1px;

    &:hover {
      transform: scale(1.01);
    }
  }
}

.productDetails__price {
  margin: 1rem;
  font-size: 3.5rem;
  font-weight: 500;
}
.productDetails__inputRange {
  margin: 1rem;
}
.productDetails__addProductToCartBox {
  position: relative;
  width: 100%;
}
.productDetails__addedToCartNotification {
  @include flexLayout;
  display: flex;

  position: absolute;
  bottom: 0.8rem;
  left: 24rem;
  width: 20rem;

  color: rgb(62, 175, 124);
  font-size: 1.5rem;
  opacity: 1;

  svg {
    height: 100%;
  }
  p {
    width: 100%;
  }
}

.productDetailsNotifacation-enter-active {
  transition: all 0.5s ease-out;
}
.productDetailsNotifacation-enter-from {
  opacity: 0;
}
.productDetailsNotifacation-enter-to {
  opacity: 1;
}
@media (min-width: 1024px) {
  .productDetails {
    width: 90%;
    max-width: $max-width;
    img {
      width: 72rem;
    }
  }
  .productDetails__addedToCartNotification {
    display: flex;
  }
}
</style>