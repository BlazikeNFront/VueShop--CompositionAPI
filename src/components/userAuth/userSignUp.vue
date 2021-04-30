<template>
  <div class="userAuth__userSignUp">
    <form
      class="loginForm__form"
      @click="clearErrors"
      @submit.prevent="handleSignUp"
    >
      <div class="loginForm__inputs loginForm__signUpInputs">
        <div class="loginFormControl">
          <label class="loginForm_label" for="signupEmail">Email:</label>
          <input
            class="loginFormControll__input"
            :class="{ userInputError: !!formErrors.userNameErrorMsg }"
            @blur="formErrors.userNameErrorMsg = null"
            type="email"
            id="signupEmail"
            placeholder="Type your email"
            v-model.trim="email"
            autocomplete="email"
          />

          <p>{{ formErrors.userNameErrorMsg }}</p>
        </div>
        <div class="loginFormControl">
          <label class="loginForm_label" for="signupPassword">Password:</label>
          <input
            class="loginFormControll__input"
            type="password"
            id="signupPassword"
            placeholder="Type your passowrd"
            autocomplete="current-password"
            v-model.trim="userPassword"
            @blur="formErrors.userPassword = null"
            :class="{ userInputError: formErrors.passwordErrorMsg }"
          />
        </div>
        <div class="loginFormControl">
          <label class="loginForm_label" for="confirmPassword"
            >Confirm password:</label
          >
          <input
            class="loginFormControll__input"
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            autocomplete="current-password"
            @blur="formErrors.userPassword = null"
            v-model.trim="confirmPassword"
            :class="{ userInputError: formErrors.passwordErrorMsg }"
          />
          <p class="loginFormControl__errorMsg">
            {{ formErrors.passwordErrorMsg }}
          </p>
        </div>
      </div>
      <button class="loginFormControl__button loginFormControl__button--signUp">
        Sign Me Up !
      </button>
      <loader v-if="loader"></loader>
      <p class="signUpLink">
        U dont have an account? Click
        <span class="loginForm__routerLink" @click="this.$emit('changeView')"
          >Here</span
        >
        to Log in !
      </p>
    </form>

    <modal-dialog
      v-if="dialogModal.type"
      @closeDialog="closeErrorModal"
      @confirmError="closeErrorModal"
      ><p class="signUpForm__errorMsg">
        {{ dialogModal.msg }}
      </p>
    </modal-dialog>
  </div>
</template>
<script>
export default {
  emits: ["changeView"],
  data() {
    return {
      email: null,
      userPassword: null,
      confirmPassword: null,
      formErrors: {
        passwordErrorMsg: null,
        userNameErrorMsg: null,
      },
      loader: false,
      dialogModal: {
        type: null,
        msg: null,
      },
    };
  },
  methods: {
    clearErrors() {
      this.formErrors.passwordErrorMsg = null;
      this.formErrors.userNameErrorMsg = null;
    },
    closeForm() {
      this.$router.push("/");
    },
    async handleSignUp() {
      if (this.checkForm() === false) {
        return;
      }
      try {
        this.loader = true;
        const userData = {
          email: this.email,
          password: this.userPassword,
        };

        const data = await fetch("http://localhost:3000/SignUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const dataJSON = await data.json();

        if (data.status !== 200) {
          this.dialogModal.type = "error";
          this.dialogModal.msg = dataJSON.message;
          this.loader = false;
          return;
        }
        this.dialogModal.type = "confirmation";
        this.dialogModal.msg = dataJSON.message;
        this.loader = false;
      } catch (err) {
        this.loader = false;
        console.log(err.message);
        this.$store.dispatch("ErrorHandler/showError", err.message);
      }
    },
    checkForm() {
      const regexForEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const regexForPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Requirements -minimum eight characters, at least one letter and one number

      if (regexForEmail.test(this.email) === false) {
        this.formErrors.userNameErrorMsg = "Invalid email";

        return false;
      }

      if (regexForPassword.test(this.userPassword) === false) {
        this.formErrors.passwordErrorMsg =
          "Password should be minimum eight characters,contain one letter and one number";

        return false;
      }
      if (this.userPassword !== this.confirmPassword) {
        this.formErrors.passwordErrorMsg = "Passwords do not match :(";

        return false;
      }
      this.formErrors.userNameErrorMsg = null;
      this.formErrors.passwordErrorMsg = null;
    },
    closeErrorModal() {
      if (this.dialogModal.type === "confirmation") {
        this.$router.push("/");
      }
      this.dialogModal.type = null;
      this.dialogModal.msg = null;
    },
  },
};
</script>
<style lang='scss'>
.loginForm_label {
  margin: 0.5rem;
  font-size: 2rem;
}
.loginForm__form--signUp {
  padding: 5rem 0 10rem 0;
}
.loginForm__signUpInputs {
  margin-top: 5rem;
}

.signupForm__form {
  margin: 0 auto;
  width: 40rem;
  height: 50rem;
  border: 2px solid $primary-color;
  label {
    margin: 1rem;
    font-size: $font-bg;
  }
  .formControl {
    @include flexLayout;
    margin: 2rem;
    flex-direction: column;

    input {
      width: 100%;
      padding: 5%;
      font-size: $font-md;
      border: 2px solid $primiary-color;
      background-color: transparent;
      color: $primiary-color;
    }
  }
}
.loginFormControl__button--signUp {
  margin-top: 2rem;
}
.signUpForm__errorMsg {
  color: $primiary-color;
  font-size: $font-bg;
}
.userInputError {
  border: 2px solid red;
}
@media (min-width: 1024px) {
  .userAuth__userSignUp {
    width: 50%;
    opacity: 1;
    transition: all 0.2s;
    transition-delay: 0.5s;
  }
}
</style>