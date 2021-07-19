<template>
  <div class="userAuth__userLogin">
    <form
      class="loginForm__form"
      @submit.prevent="handleLogin"
      @click="clearErrors"
      v-if="!token"
    >
      <div class="loginForm__inputs">
        <div class="loginFormControl">
          <label for="userName" class="loginFormControll__label">Email:</label>
          <input
            class="loginFormControll__input"
            type="email"
            id="userName"
            v-model.trim="userName"
            autocomplete="username"
            placeholder="Email"
          />

          <p v-if="userNameError">{{ userNameError }}</p>
        </div>
        <div class="loginFormControl">
          <label for="password" class="loginFormControll__label"
            >Password:</label
          >
          <input
            class="loginFormControll__input"
            type="password"
            id="password"
            v-model.trim="userPassword"
            autocomplete="current-password"
            placeholder="Password"
          />
          <p v-if="passwordError" class="loginFormControl__errorMsg">
            {{ passwordError }}
          </p>
          <p v-if="serverErrorMsg" class="loginFormControl__errorMsg">
            {{ serverErrorMsg }}
          </p>
        </div>
      </div>
      <div class="loginFormControl__buttonContainer">
        <button>Login</button>
        <loader class="loginFormControl__loader" v-if="loader"></loader>
      </div>

      <p class="signUpLink">
        U dont have an account? Click
        <span @click="this.$emit('changeView')">Here</span>
        to Sign up !
      </p>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import useToken from "../hooks/logger.js";
export default {
  emits: ["changeView"],
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { token } = useToken();

    const loginPage = ref(true); //true === userLogin page, false=== signUp page
    const nameToRedirectAfterLoginAction = ref(
      route.params.redirectAfterLogin || "main-page"
    );

    const userName = ref(null);
    const userPassword = ref(null);
    const passwordError = ref(null);
    const userNameError = ref(null);
    const serverErrorMsg = ref(null);
    const loader = ref(false);

    function clearErrors() {
      passwordError.value = null;
      userNameError.value = null;
      serverErrorMsg.value = null;
    }

    async function handleLogin() {
      loader.value = true;
      if (userPassword.value === null || userPassword.value === "") {
        passwordError.value = "Please insert password";
        loader.value = false;
        return;
      }
      if (userName.value === null || userName.value.split("").length < 5) {
        userNameError.value = "Please insert correct email";
        loader.value = false;
        return;
      }
      try {
        const payload = {
          userName: userName.value,
          password: userPassword.value,
        };
        await store.dispatch("UserAuth/handleLogin", payload);
        loader.value = false;
        router.push({ name: nameToRedirectAfterLoginAction.value });
      } catch (err) {
        console.log(err);
        loader.value = false;
        serverErrorMsg.value = "Couldn't log in :( Try again later";
      }
    }

    function changeRoute() {
      router.push({ name: "user-signUp" });
    }

    return {
      token,
      loginPage,
      passwordError,
      handleLogin,
      userName,
      userPassword,
      userNameError,
      serverErrorMsg,
      changeRoute,
      clearErrors,
      loader,
    };
  },
};
</script>
<style lang='scss'>
.userAuth__userLogin {
  margin: 0 auto;
  width: 90%;
  transition: all 0.2s;
  transition-delay: 0.5s;
}
.loginForm__form {
  @include flexLayout;
  width: 100%;
  flex-direction: column;
  color: white;
}
.loginForm__inputs {
  @include flexLayout;
  margin: 2rem;
  flex-direction: column;
}
.loginFormControl {
  @include flexLayout;
  margin-bottom: 1rem;
  flex-direction: column;
}
.loginFormControll__label {
  visibility: hidden;
}

.loginFormControll__input {
  width: 25rem;
  padding: 1rem 0 1rem 1rem;
  border: none;
  border-radius: 5px;

  background-color: #efefef;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
}
.signUpLink {
  margin: 3rem;
  font-size: 1.5rem;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    cursor: pointer;
  }
}
.loginFormControl__errorMsg {
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: $red-error;
}
.loginFormControl__buttonContainer {
  position: relative;
  button {
    width: 25rem;
    padding: 0.5rem;
    background-color: white;
    border: none;
    border-radius: 20px;
    font-family: inherit;
    font-size: 2.5rem;
    font-weight: 600;
    text-decoration: none;
    color: #2c3e50;
  }
}
.loginFormControl__loader {
  position: absolute;
  right: -7rem;
  top: -2rem;
  transform: scale(0.6);
}
.login .login__modalErrorMsg {
  font-size: $font-bg;
  color: $primiary-color;
}
@media (min-width: 768px) {
  .loginFormControl__loader {
    right: -8rem;
    transform: scale(0.8);
  }
}
@media (min-width: 1024px) {
  .userAuth__userLogin {
    display: block;
    margin: 0;
    width: 50%;
    opacity: 1;
  }
  .signUpLink {
    margin-top: 7rem;
  }
  .loginFormControl__loader {
    top: initial;
    right: initial;
    left: 50%;
    bottom: -8rem;
    transform: translate(-50%);
  }
}
</style>