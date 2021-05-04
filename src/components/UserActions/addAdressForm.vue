<template>
  <div class="addAddressBox">
    <button
      class="confirmationBox__formExitButton"
      @click.prevent="$emit('exitButton')"
    >
      <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
    </button>
    <div>
      <p v-if="userAddressList.length === 0">Theres is no saved addresses.</p>
      <drop-down
        v-else
        class="addAddress__dropdown"
        :defaultCategory="createDefaultDropdownValue"
        :listOfCategories="createDropDownListItems"
        @categoryChange="setUserAddress"
      ></drop-down>
    </div>
    <h4>Add new delivery address</h4>
    <form class="confirmationBox__form">
      <div
        @click="clearFormError"
        class="confirmationForm__formControl"
        :class="{ newAddressError: newAddressForm.name.error }"
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
        :class="{ newAddressError: newAddressForm.surname.error }"
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
        :class="{ newAddressError: newAddressForm.address.error }"
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
      <p v-if="formErrorMsg">{{ formErrorMsg }}</p>
      <button
        type="submit"
        class="confirmationForm__button"
        v-if="!formLoader"
        @click.prevent="addNewAddress"
      >
        Confirm address
      </button>
      <loader v-else></loader>
      <p v-if="addressUpdateResult">{{ addressUpdateResult }}</p>
    </form>
  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import useToken from "../hooks/logger.js";
import DropDown from "../common/dropDown.vue";
export default {
  components: {
    DropDown,
  },
  emits: ["exitButton"],
  setup(props, context) {
    const store = useStore();
    const { token } = useToken();

    const newAddressForm = reactive({
      name: { value: "", error: false },
      surname: { value: "", error: false },
      address: { value: "", error: false },
    });

    const formErrorMsg = ref(null);
    const addressUpdateResult = ref(null);
    const formLoader = ref(false);

    const userAddressList = computed(() => {
      return store.getters["UserAuth/getAllUserAddresses"];
    });

    const createDropDownListItems = computed(() => {
      return userAddressList.value.map(
        (element) => `${element.name} ${element.surname} ${element.address}`
      );
    });

    const createDefaultDropdownValue = computed(() => {
      if (store.getters["UserAuth/getLastUsedAddress"]) {
        const { name, surname, address } = store.getters[
          "UserAuth/getLastUsedAddress"
        ];
        return `${name} ${surname} ${address}`;
      } else {
        return createDropDownListItems.value[0];
      }
    });

    function setUserAddress(category, index) {
      const addressObject = userAddressList.value[index];
      console.log(addressObject);
      store.dispatch("UserAuth/setLastUsedUserAddress", addressObject);
      context;
      context.emit("exitButton");
    }

    function clearFormError() {
      formErrorMsg.value = null;
      for (let key in newAddressForm) {
        newAddressForm[key].error = false;
      }
    }

    async function addNewAddress() {
      try {
        if (formValidation() === false) {
          return;
        }
        const userToken = token.value;
        formLoader.value = true;
        const payload = {
          token: userToken,
          name: newAddressForm.name.value,
          surname: newAddressForm.surname.value,
          address: newAddressForm.address.value,
        };
        const postResult = await fetch("http://localhost:3000/addUserAddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: await JSON.stringify(payload),
        });
        if (postResult.status !== 200) {
          formLoader.value = false;
          throw new Error("Server did not accepted address");
        } else {
          formLoader.value = false;
          addressUpdateResult.value = "Address added successfully";
          clearFormError();
          clearUserInputs();
        }
      } catch (err) {
        formLoader.value = false;
        store.dispatch("ErrorHandler/showError", err.message);
      }
    }
    function clearUserInputs() {
      for (let key in newAddressForm) {
        newAddressForm[key].value = "";
      }
    }
    function formValidation() {
      const { name, surname, address } = newAddressForm;

      const regexOnlyLetters = /^[A-Za-z'/s]+$/;
      const regexForAddress = /^[\sA-Za-z0-9-']+$/;

      if (
        !regexOnlyLetters.test(name.value) ||
        newAddressForm.name.value.length < 2
      ) {
        newAddressForm.name.error = true;
        formErrorMsg.value =
          "Name field should contain at least 2 letters and also not contain special signs like ?,&";
        return false;
      }
      if (
        !regexOnlyLetters.test(surname.value) ||
        newAddressForm.surname.value.length < 2
      ) {
        newAddressForm.surname.error = true;
        formErrorMsg.value =
          "Surname field should contain at least 2 letters and also not contain special signs like ?,&";
        return false;
      }
      if (
        !regexForAddress.test(address.value) ||
        newAddressForm.address.value.length < 5
      ) {
        newAddressForm.address.error = true;
        formErrorMsg.value =
          "Surname field should contain at least 5 characters and also not contain special signs like ?,&";
        return false;
      }
    }
    return {
      newAddressForm,
      formErrorMsg,
      addressUpdateResult,
      formLoader,
      userAddressList,
      createDefaultDropdownValue,
      setUserAddress,
      addNewAddress,
      createDropDownListItems,
    };
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