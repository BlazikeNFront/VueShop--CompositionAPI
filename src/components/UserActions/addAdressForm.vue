<template>
  <div class="addAddressBox">
    <button
      class="confirmationBox__formExitButton"
      @click.prevent="this.$emit('exitButton')"
    >
      <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
    </button>
    <div>
      <p v-if="this.userAddressList.length === 0">
        Theres is no saved addresses.
      </p>
      <drop-down
        v-else
        class="addAddress__dropdown"
        :defaultCategory="this.createDefaultDropdownValue"
        :listOfCategories="this.createDropDownListItems"
        @categoryChange="setUserAddress"
      ></drop-down>
    </div>
    <h4>Add new delivery address</h4>
    <form class="confirmationBox__form">
      <div
        @click="clearFormError"
        class="confirmationForm__formControl"
        :class="{ newAddressError: this.newAddressForm.name.error }"
      >
        <label for="Name">Name: </label
        ><input
          id="Name"
          name="name"
          type="text"
          placeholder="Name"
          v-model.trim="newAddressForm.name.value"
        />
      </div>
      <div
        @click="clearFormError"
        class="confirmationForm__formControl"
        :class="{ newAddressError: this.newAddressForm.surname.error }"
      >
        <label for="Surname">Surname: </label
        ><input
          id="Surname"
          name="Surname"
          type="text"
          placeholder="Surname"
          v-model.trim="newAddressForm.surname.value"
        />
      </div>
      <div
        @click="clearFormError"
        class="confirmationForm__formControl"
        :class="{ newAddressError: this.newAddressForm.address.error }"
      >
        <label for="Addres">Address: </label
        ><input
          id="Name"
          name="name"
          type="text"
          placeholder="Name"
          v-model.trim="newAddressForm.address.value"
        />
      </div>
      <p v-if="this.formErrorMsg">{{ formErrorMsg }}</p>
      <button
        type="submit"
        class="confirmationForm__button"
        v-if="!this.formLoader"
        @click.prevent="addNewAddress"
      >
        Confirm address
      </button>
      <loader v-else></loader>
      <p v-if="this.addressUpdateResult">{{ addressUpdateResult }}</p>
    </form>
  </div>
</template>
<script>
import DropDown from "../common/dropDown.vue";
export default {
  components: {
    DropDown,
  },
  emits: ["exitButton"],
  data() {
    return {
      newAddressForm: {
        name: { value: "", error: false },
        surname: { value: "", error: false },
        address: { value: "", error: false },
      },

      formErrorMsg: null,
      addressUpdateResult: null,
      formLoader: false,
    };
  },
  computed: {
    userAddressList() {
      return this.$store.getters["UserAuth/getAllUserAddresses"];
    },
    createDefaultDropdownValue() {
      if (this.$store.getters["UserAuth/getLastUsedAddress"]) {
        const { name, surname, address } = this.$store.getters[
          "UserAuth/getLastUsedAddress"
        ];
        return `${name} ${surname} ${address}`;
      } else {
        return this.createDropDownListItems[0];
      }
    },
    createDropDownListItems() {
      return this.userAddressList.map(
        (element) => `${element.name} ${element.surname} ${element.address}`
      );
    },
  },
  methods: {
    setUserAddress(category, index) {
      const addressObject = this.userAddressList[index];

      this.$store.dispatch("UserAuth/setLastUsedUserAddress", addressObject);
      this.$emit("exitButton");
    },
    clearFormError() {
      this.formErrorMsg = null;
      for (let key in this.newAddressForm) {
        this.newAddressForm[key].error = false;
      }
    },
    async addNewAddress() {
      try {
        if (this.formValidation() === false) {
          return;
        }

        this.formLoader = true;
        const payload = {
          token: this.$store.getters["UserAuth/getToken"].token,
          name: this.newAddressForm.name.value,
          surname: this.newAddressForm.surname.value,
          address: this.newAddressForm.address.value,
        };
        const postResult = await fetch("http://localhost:3000/addUserAddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: await JSON.stringify(payload),
        });
        if (postResult.status !== 200) {
          this.formLoader = false;
          throw new Error("Server did not accepted address");
        } else {
          this.formLoader = false;
          this.addressUpdateResult = "Address added successfully";
          this.clearFormError();
          this.clearUserInputs();
        }
      } catch (err) {
        this.formLoader = false;
        this.$store.dispatch("ErrorHandler/showError", err.message);
      }
    },
    clearUserInputs() {
      for (let key in this.newAddressForm) {
        this.newAddressForm[key].value = "";
      }
    },
    formValidation() {
      const { name, surname, address } = this.newAddressForm;

      const regexOnlyLetters = /^[A-Za-z'/s]+$/;
      const regexForAddress = /^[\sA-Za-z0-9-']+$/;

      if (
        !regexOnlyLetters.test(name.value) ||
        this.newAddressForm.name.value.length < 2
      ) {
        this.newAddressForm.name.error = true;
        this.formErrorMsg =
          "Name field should contain at least 2 letters and also not contain special signs like ?,&";
        return false;
      }
      if (
        !regexOnlyLetters.test(surname.value) ||
        this.newAddressForm.surname.value.length < 2
      ) {
        this.newAddressForm.surname.error = true;
        this.formErrorMsg =
          "Surname field should contain at least 2 letters and also not contain special signs like ?,&";
        return false;
      }
      if (
        !regexForAddress.test(address.value) ||
        this.newAddressForm.address.value.length < 5
      ) {
        this.newAddressForm.address.error = true;
        this.formErrorMsg =
          "Surname field should contain at least 5 characters and also not contain special signs like ?,&";
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
.addAddressBox {
  @include basicCart;
  position: absolute;
  margin: 0 auto;
  padding: 1.5rem;
  padding-top: 2.5rem;
  width: 28rem;
  opacity: 1;

  h4 {
    margin-top: 1rem;

    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }
  p {
    font-weight: 600;
    text-align: center;
  }
}
.confirmationBox__form {
  @include flexLayout;
  position: relative;
  max-width: 35rem;
  margin: 1rem;
  flex-direction: column;

  p {
    position: absolute;
    bottom: 4.5rem;
    width: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    color: $red-error;

    text-align: center;
  }
}
.addAddress__dropdown {
  @include button;
  @include flexLayout;
  position: relative;
  margin: 0rem auto;
  margin-top: 2rem;
  width: 100%;
  height: 5rem;
  border-radius: 20px 20px 0 0;
  color: white;

  .customSelect {
    width: 100%;
    z-index: $addAddressDropDown;
    p {
      width: 100%;
      font-size: 1.2rem;
      font-weight: 600;
      color: white;

      text-align: center;
    }
  }
  svg {
    font-size: 3rem;
  }
  .customSelect__selectOption {
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    margin: 0 auto;
    border-radius: 0 0 20px 20px;
    background-color: $main-color;
    text-align: center;

    z-index: $addAddressDropDown;
    cursor: pointer;

    li {
      padding: 1rem;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.confirmationBox__infoBox {
  @include flexLayout;
  margin: 2rem;
}
.confirmationForm__formControl {
  @include flexLayout;
  margin: 1rem;
  width: 25rem;
  padding: 0.5rem;
  border-radius: 10px;
  flex-direction: column;

  justify-content: flex-end;

  input {
    width: 95%;
    height: 90%;
    padding: 1rem;
    border: none;
    border-bottom: 2px solid #2c3e50;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    background: transparent;
    font-family: inherit;
    font-weight: 600;
    text-align: center;
    &:focus {
      outline: none;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border: none;
    box-shadow: 0 0 0 30px #f5e3e6 inset;
    -webkit-text-fill-color: #2c3e50;
    -webkit-box-shadow: 0 0 0 30px #f5e3e6 inset;
  }
}

.newAddressError {
  border: 1px solid red;
}

.confirmationForm__button {
  @include button;
  margin-top: 2rem;
  padding: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
}
.confirmationBox__formExitButton {
  @include button;
  position: absolute;
  top: 1rem;
  right: 4rem;
  margin: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  font-size: 2rem;
  font-weight: 600;
  svg {
    margin-left: 1%;
  }
}

@media (min-width: 768px) {
  .addAddressBox {
    position: absolute;
    top: 0;
    left: 50%;
    width: 40rem;
    opacity: 1;

    transform: translate(-50%);
    .customSelect {
      svg {
        left: 33rem;
      }
    }
  }
  .confirmationForm__formControl {
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.2);
    input {
      background-color: transparent;
      border-width: 1px;
      border-radius: 0;
    }
  }
}
</style>