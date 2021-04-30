<template>
  <header class="header">
    <promo-bar class="header__promoBar"></promo-bar>
    <div class="header__elements">
      <shop-logo></shop-logo>
      <search-bar></search-bar>
      <div class="header__userActions">
        <user-control-panel></user-control-panel>
        <user-cart></user-cart>
      </div>
    </div>
    <nav-bar id="nav"></nav-bar>
  </header>
</template>
<script>
import PromoBar from "./headerComponents/promoBar.vue";
import ShopLogo from "./headerComponents/shopLogo.vue";
import SearchBar from "./headerComponents/searchBar.vue";
import UserControlPanel from "./headerComponents/UserControlPanel.vue";
import UserCart from "./headerComponents/userCart.vue";
import NavBar from "./headerComponents/TheNavBar.vue";
export default {
  components: {
    PromoBar,
    ShopLogo,
    SearchBar,
    UserCart,
    UserControlPanel,
    NavBar,
  },
};
</script>
<style lang='scss'>
.header {
  @include flexLayout;
  margin: 0 auto;
  flex-direction: column;
}
.header__elements {
  @include flexLayout;
  @include mainWidthClamp;
  position: relative;
  height: 7rem;
}
.header__button {
  @include buttonTransparent;
  width: 3rem;
  height: 3rem;
  font-size: $font-bg;
}
.header__userActions {
  @include flexLayout;
  width: 8rem;
}
@media (min-width: 768px) {
  .header__userActions {
    width: 12rem;
  }
}
@media (min-width: 1024px) {
  .header__elements {
    height: 9rem;
  }
}
</style>