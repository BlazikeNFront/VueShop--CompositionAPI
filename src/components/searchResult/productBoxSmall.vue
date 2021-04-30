<template>
  <div class="productBoxSmall">
    <div class="productBoxSmall__hoverBackdrop"></div>
    <div class="productBoxSmall__imageBox">
      <img
        :src="product.imagePath.medium"
        :alt="product.name + ' image'"
        class="productBoxSmall__imageBox__img"
      />
    </div>
    <div class="productBoxSmall__textContent">
      <h4 class="productBoxSmall__productTitle">{{ this.product.name }}</h4>
      <div class="testProduct">
        <p class="productBoxSmall__productPrice">{{ this.product.price }} $</p>
        <p class="productBoxSmall__productDesc">{{ cutDesc }}</p>
      </div>
    </div>
    <button class="productBoxSmall__button" @click="checkDetails">
      <font-awesome-icon
        :icon="['fas', 'arrow-right']"
        class="productBoxSmall__arrowIcon"
      ></font-awesome-icon>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      shortDesc: this.cutDesc,
    };
  },
  computed: {
    cutDesc() {
      return this.product.description.split("").splice(0, 100).join("") + "...";
    },
  },
  methods: {
    checkDetails() {
      this.$store.dispatch("UserSearch/setProductDetails", this.product._id);
      this.$router.push(`/productDetails/${this.product._id}`);
    },
  },
};
</script>
<style lang='scss'>
.testProduct {
  @include flexLayout;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #2a2a72;
  color: white;
}
.productBoxSmall {
  position: relative;
  margin: 1rem;
  width: 25rem;
  height: 40rem;
  border: 2px solid #2a2a72;
  border-radius: 10px;
  box-shadow: 1px 1px 8px #2a2a72;
  background-color: White;
  font-size: $font-md;
  overflow: hidden;

  &:hover .productBoxSmall__hoverBackdrop {
    display: block;
    z-index: 200;
  }

  &:hover button {
    transform: translate(-50%, 150%);
    opacity: 1;
    z-index: 300;
    &:hover {
      background-color: #78a4eb;
    }
  }
}
.productBoxSmall__hoverBackdrop {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.productBoxSmall__imageBox__img {
  max-width: 100%;
  height: 22rem;
  transition: all 0.1s ease;
}
.productBoxSmall__imageBox {
  width: 100%;
  margin: 0;
}
.productBoxSmall__button {
  @include centerAbsolute;
  top: 25%;
  padding: 1rem 5rem;
  border: #2a2a72 3px solid;
  border-radius: 20px;
  background-color: white;
  color: #2a2a72;
  opacity: 0;
  transition: all 0.5s ease;
  cursor: pointer;
}
.productBoxSmall__textContent {
  @include flexLayout;
  height: 18rem;
  flex-direction: column;
}
.productBoxSmall__productTitle {
  margin-bottom: 1rem;
  height: 5rem;
  font-size: $font-bg;
  font-weight: 600;
}
.productBoxSmall__productPrice {
  position: absolute;
  left: 50%;
  bottom: 8.5rem;
  transform: translate(-50%);
  font-size: 1.7rem;
  font-weight: 600;
}
.productBoxSmall__arrowIcon {
  font-size: $font-md;
}
.productBoxSmall__productDesc {
  display: block;
  margin: 0 0.5rem;
  position: absolute;
  bottom: 3rem;
  font-size: $font-sm;
}
@media (min-width: 1024px) {
  .productBoxSmall {
    margin: 2.5rem;
  }
}
</style>