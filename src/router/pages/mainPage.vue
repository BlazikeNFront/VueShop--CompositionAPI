<template>
  <div>
    <div class="mainPage"></div>
    <main-information-box></main-information-box>

    <main-slider class="slides"></main-slider>
  </div>
</template>
<script>
import MainInformationBox from "../../components/mainPage/mainInformationBox/mainInformationBox.vue";
import MainSlider from "../../components/mainPage/slider/mainSlider.vue";

export default {
  mounted() {
    this.$store.dispatch("Cart/fetchCartFromLocalStorage");
  },
  components: { MainInformationBox, MainSlider },
};
</script>
<style lang='scss'>
.mainPage {
  margin: 2rem auto;
  width: 100%;
  overflow: hidden;
  color: $primiary-color;
}
.slides {
  margin: 0 auto;
  margin-top: 7rem;
  max-width: 130rem;
}
</style>
