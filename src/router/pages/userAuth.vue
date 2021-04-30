<template>
  <div class="userAuth" :class="{ changedHeight: !this.showUserLogin }">
    <div
      class="userAuth__logoBox"
      :class="{ loginToSignupAnim: !this.showUserLogin }"
    >
      <div class="userAuth__companyLogoText"></div>
      <div
        class="userAuth__companyLogoIcon"
        :class="{ iconReverseAnim: !this.showUserLogin }"
      ></div>
    </div>
    <user-login
      :class="{ changeViewTransition: !this.showUserLogin }"
      @changeView="changeView"
    ></user-login>
    <user-sign-up
      :class="{ changeViewTransition: this.showUserLogin }"
      @changeView="changeView"
    ></user-sign-up>
  </div>
</template>
<script>
import userLogin from "../../components/userAuth/userLogin.vue";
import UserSignUp from "../../components/userAuth/userSignUp.vue";

export default {
  components: { userLogin, UserSignUp },

  methods: {
    changeView() {
      if (this.showUserLogin) {
        this.$router.push("/User/signUp");
      } else {
        this.$router.push("/User/login");
      }
    },
  },
  computed: {
    showUserLogin() {
      if (this.$route.params.view === "login") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
.userAuth {
  @include flexLayout;
  @include greenToBlueGradient;
  position: relative;
  margin-left: 3%;
  width: 95%;
  height: 55rem;
  border-radius: 10px;
  box-shadow: 5px 5px 15px black;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  transition: all 1s;
}
.userAuth__logoBox {
  width: 100%;
  height: 27rem;
}

.userAuth__companyLogoText {
  margin: 0 auto;
  width: 29rem;
  height: 12rem;
  background-image: url("../../assets/companyTextLogo.png");
  background-size: cover;
}
.userAuth__companyLogoIcon {
  margin: 0 auto;
  width: 23rem;
  height: 14rem;
  background-image: url("../../assets/companyFishIcon.png");
  background-size: cover;
  transform: scaleX(1);
  transition: all 2s;
}

.loginToSignupAnim {
  transition: all 2s;
}
.changeViewTransition {
  opacity: 0;
}
.changedHeight {
  height: 73rem;
}
.iconReverseAnim {
  transform: scaleX(-1);
}
@media (min-width: 1024px) {
  .userAuth {
    margin: 0 auto;
    width: 90%;
    height: 55rem;
    max-width: $max-width;

    flex-direction: row;
    justify-content: initial;
  }
  .userAuth__logoBox {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10rem 0 10rem 0;
    width: 50%;
    height: 70rem;

    border-radius: 10px;
    transition: all 2s;
  }
  .loginToSignupAnim {
    transition: all 2s;
    transform: translateX(-90%);
  }
}
</style>