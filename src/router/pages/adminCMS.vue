<template>
  <section class="adminCMS">
    <h3 class="adminCMS__h3">Hello Mr.Admin. What you want to do today ?</h3>
    <div class="adminCMS__options">
      <router-link class="adminCMS__a" to="/Admin/AddProduct"
        >Add product</router-link
      >
      <router-link class="adminCMS__a" :to="ordersLink"
        >Check Orders</router-link
      >
    </div>
    <slider class="test"></slider>
  </section>
</template>
<script>
import Slider from "../../components/common/Slider.vue";

export default {
  components: { Slider },
  computed: {
    ordersLink() {
      return { name: "admin-orders", query: { page: 1 } };
    },
  },
};
</script>
<style lang="scss">
.adminCMS {
  @include basicCart;

  margin: 0 auto;
  padding: 2rem;
  width: 90%;
  height: 100%;
  max-width: 135rem;
  min-height: 60rem;
}
.adminCMS__h3 {
  margin: 3rem;
  font-size: 3rem;
  font-weight: 600;
  color: $primiary-color;
}
.adminCMS__options {
  @include flexLayout;
  margin: 0 auto;
  width: 50%;
}
.adminCMS__a {
  @include button;
  padding: 3rem;
  font-size: $font-md;
  font-weight: 600;
  color: white;
  letter-spacing: 1px;
}
.test {
  margin: 2rem auto;
}
</style>