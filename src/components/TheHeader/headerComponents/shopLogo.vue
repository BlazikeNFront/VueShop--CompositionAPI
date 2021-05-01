<template>
  <div class="header__logo" @click="redirectToMainPage">
    <img
      class="header__fishImg"
      src="../../../assets/companyFishIcon.png"
      alt="Taimen Company Logo"
    />
    <img
      class="header__textImg"
      src="../../../assets/companyTextLogo.png"
      alt="Taimen Company Logo"
    />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function redirectToMainPage() {
      router.push("/");
    }
    return { redirectToMainPage };
  },
};
</script>
<style lang='scss'>
.header__logo {
  @include flexLayout;
  width: 9.5rem;
  height: 100%;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 17.5rem;
  }
}
.header__fishImg {
  width: 12rem;
  height: 100%;
}
.header__textImg {
  display: none;
  width: 14rem;
  height: 100%;
  @media (min-width: 768px) {
    display: block;
  }
}
@media (min-width: 1024px) {
  .header__logo {
    width: 27.5rem;
  }
  .header__fishImg {
    width: 16rem;
  }
  .header__textImg {
    width: 18rem;
  }
}
</style>
