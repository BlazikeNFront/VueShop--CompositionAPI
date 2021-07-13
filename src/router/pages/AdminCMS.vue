<template>
  <section class="adminCMS">
    <h3 class="adminCMS__h3">Hello Admin. What you want to do today ?</h3>
    <div class="adminCMS__options">
      <router-link class="adminCMS__a" to="/Admin/AddProduct"
        >Add product</router-link
      >
      <router-link class="adminCMS__a" :to="ordersLink"
        >Check Orders</router-link
      >
    </div>
  </section>
</template>
<script>
import { computed } from "vue";
export default {
  setup() {
    const ordersLink = computed(() => {
      return { name: "admin-orders", query: { page: 1 } };
    });
    return { ordersLink };
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
  width: 90%;
  max-width: 50rem;
}
.adminCMS__a {
  @include button;
  padding: 1rem;
  border: 2px solid white;
  font-size: $font-md;
  font-weight: 600;
  color: white;
  letter-spacing: 1px;
}
</style>