<template>
  <div>
    <form
      ref="addProductForm"
      class="addProduct__form"
      @submit.prevent="handleFormRequest"
      @click="cleanErrors"
    >
      <h4 class="addProduct__h4">Add product to store:</h4>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox">
          <p class="form-addProduct__para">Select type of product:</p>
          <div class="addProduct__formControl__radioInput" id="typeOfProduct">
            <input
              id="rod"
              type="radio"
              name="productType"
              value="rod"
              v-model="formInputs.typeOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="rod">Rod</label>
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="reel"
              type="radio"
              name="productType"
              value="reel"
              v-model="formInputs.typeOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="reel"
              >Reel</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="line"
              type="radio"
              name="productType"
              value="line"
              v-model="formInputs.typeOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="line"
              >Line</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="lure"
              type="radio"
              name="productType"
              value="lure"
              v-model="formInputs.typeOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="lure"
              >Lure</label
            >
          </div>

          <div class="addProduct__formControl__radioInput">
            <input
              id="other"
              type="radio"
              name="productType"
              value="other"
              v-model="formInputs.typeOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="other"
              >Other</label
            >
          </div>
        </div>

        <p class="addProduct__errorMsg" v-if="formInputs.typeOfProduct.error">
          {{ formInputs.typeOfProduct.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox">
          <p class="form-addProduct__para">Select category of product:</p>
          <div
            class="addProduct__formControl__radioInput"
            id="categoryOfProduct"
          >
            <input
              id="spinning"
              type="radio"
              name="categoryType"
              value="spinning"
              v-model="formInputs.categoryOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="rod"
              >Spinning</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="bait"
              type="radio"
              name="categoryType"
              value="bait"
              v-model="formInputs.categoryOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="reel"
              >Bait</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="fly"
              type="radio"
              name="categoryType"
              value="fly"
              v-model="formInputs.categoryOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="line"
              >Fly</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="casting"
              type="radio"
              name="categoryType"
              value="casting"
              v-model="formInputs.categoryOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="lure"
              >Casting</label
            >
          </div>
          <div class="addProduct__formControl__radioInput">
            <input
              id="other"
              type="radio"
              name="categoryType"
              value="other"
              v-model="formInputs.categoryOfProduct.value"
            />
            <label class="addProduct__formControl__lables" for="other"
              >Other</label
            >
          </div>
        </div>

        <p
          class="addProduct__errorMsg"
          v-if="formInputs.categoryOfProduct.error"
        >
          {{ formInputs.categoryOfProduct.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl" id="nameOfProduct">
        <div
          class="
            addProduct__formControl__inputBox
            addProduct__formControl__inputBox--marginBottom
          "
        >
          <label
            class="addProduct__formControl__lables"
            for="addProduct__productTile"
            >Name:</label
          >
          <input
            class="addProduct__formControl__input"
            id="addProduct__productTile"
            type="text"
            placeholder="Enter product name"
            v-model="formInputs.name.value"
          />
        </div>
        <p class="addProduct__errorMsg" v-if="formInputs.name.error">
          {{ formInputs.name.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div
          class="
            addProduct__formControl__inputBox
            addProduct__formControl__inputBox--marginBottom
          "
          id="descriptionOfProduct"
        >
          <label class="addProduct__formControl__lables" for="desc"
            >Enter description of product:</label
          >
          <textarea
            class="addProduct__formControl__textarea"
            id="desc"
            rows="10"
            cols="50"
            placeholder="Enter a description"
            v-model="formInputs.descritpion.value"
          ></textarea>
        </div>
        <p class="addProduct__errorMsg" v-if="formInputs.descritpion.error">
          {{ formInputs.descritpion.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox" id="productPrice">
          <label class="addProduct__formControl__lables" for="price">
            Price:</label
          >
          <input
            class="addProduct__formControl__input"
            id="price"
            type="number"
            name="price"
            min="0.01"
            placeholder="100"
            step="0.01"
            v-model="formInputs.price.value"
          />
        </div>
        <p class="addProduct__errorMsg" v-if="formInputs.price.error">
          {{ formInputs.price.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div
          class="
            addProduct__formControl__inputBox
            addProduct__formControl__inputBox--marginBottom
          "
          id="productQuantitiy"
        >
          <label class="addProduct__formControl__lables" for="quantity">
            Quantity:</label
          >
          <input
            class="addProduct__formControl__input"
            id="quantity"
            type="number"
            name="quantity"
            min="1"
            placeholder="1"
            step="1"
            v-model="formInputs.quantity.value"
          />
        </div>
        <p class="addProduct__errorMsg" v-if="formInputs.quantity.error">
          {{ formInputs.quantity.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox">
          <label class="addProduct__formControl__lables" for="image"
            >Upload product image</label
          >
          <input
            class="addProduct__formControl__input"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            ref="imageInput"
            @change="updateImageFile"
          />
        </div>
        <p class="addProduct__errorMsg" v-if="formInputs.image.error">
          {{ formInputs.image.errorMsg }}
        </p>
      </div>
      <div class="addProduct__submitContainer">
        <button>Create product</button>
        <loader v-if="loader" class="addProduct__loader"></loader>
      </div>
    </form>
    <confirmation-modal
      v-if="formRequestConfirmation.visible"
      @closeDialog="closeModal"
    >
      <p class="addProduct__modalText">{{ formRequestConfirmation.text }}</p>
    </confirmation-modal>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import ConfirmationModal from "../../components/common/ModalDialog.vue";
import useToken from "../../components/hooks/logger.js";
import Loader from "../../components/common/loader.vue";
export default {
  components: {
    ConfirmationModal,
    Loader,
  },
  setup() {
    const store = useStore();
    const { token } = useToken();
    const loader = ref(false);
    const addProductForm = ref(null);
    const formRequestConfirmation = reactive({ visible: false, text: null });
    const formInputs = reactive({
      typeOfProduct: { value: null, error: false, errorMsg: null },
      categoryOfProduct: { value: null, error: false, errorMsg: null },
      name: { value: null, error: false, errorMsg: null },
      descritpion: { value: null, error: false, errorMsg: null },
      price: { value: null, error: false, errorMsg: null },
      quantity: { value: null, error: false, errorMsg: null },
      image: { value: null, error: false, errorMsg: null },
    });
    function scrollToElement(idOfElement) {
      const element = document.getElementById(idOfElement);
      element.scrollIntoView();
    }
    function closeModal() {
      formRequestConfirmation.visible = false;
      formRequestConfirmation.text = null;
    }
    function updateImageFile(e) {
      formInputs.image.value = e.target.files[0];
    }
    function checkForm() {
      const {
        typeOfProduct,
        categoryOfProduct,
        name,
        descritpion,
        price,
        quantity,
        image,
      } = formInputs;

      if (typeOfProduct.value === null) {
        scrollToElement("typeOfProduct");
        formInputs.typeOfProduct.error = true;
        formInputs.typeOfProduct.errorMsg = "U need to pick a type of product";
        return false;
      }

      if (categoryOfProduct.value === null) {
        scrollToElement("categoryOfProduct");
        formInputs.categoryOfProduct.error = true;
        formInputs.categoryOfProduct.errorMsg =
          "U need to pick a category of product";
        return false;
      }
      if (name.value === null || name.value.length < 5) {
        scrollToElement("nameOfProduct");
        formInputs.name.error = true;
        formInputs.name.errorMsg = "Name should contaitn at least 5 characters";
        return false;
      }
      if (
        descritpion.value === null ||
        descritpion.value.split(" ").length < 20
      ) {
        scrollToElement("descriptionOfProduct");

        formInputs.descritpion.error = true;
        formInputs.descritpion.errorMsg =
          "Descritpion should contain at least 20 words";
        return false;
      }
      if (price.value === null || price.value < 0) {
        scrollToElement("productPrice");

        formInputs.price.error = true;
        formInputs.price.errorMsg = "Price is not provided";
        return false;
      }

      if (
        quantity.value === null ||
        quantity.value < 0 ||
        !Number.isInteger(Number(quantity.value))
      ) {
        scrollToElement("productQuantitiy");
        formInputs.quantity.error = true;
        formInputs.quantity.errorMsg = "Quantity number must be integer";
        return false;
      }
      if (image.value === null) {
        formInputs.image.error = true;
        formInputs.image.errorMsg = "Image of product must be provided";
        return false;
      }
      return true;
    }
    async function handleFormRequest() {
      const {
        typeOfProduct,
        categoryOfProduct,
        name,
        descritpion,
        price,
        quantity,
        image,
      } = formInputs;

      const formValidation = checkForm();
      const product = new FormData();

      product.append("type", typeOfProduct.value);
      product.append("category", categoryOfProduct.value);
      product.append("name", name.value);
      product.append("description", descritpion.value);
      product.append("price", price.value);
      product.append("quantity", quantity.value);
      product.append("image", image.value);

      if (formValidation === true) {
        addProduct(product);
      }
    }
    async function addProduct(product) {
      try {
        loader.value = true;
        //since it is uploading image it cant use header hook where one  of headers is default set to JSON
        const requestHeaders = new Headers();

        if (token.value) {
          requestHeaders.append("Authorization", `Bearer ${token.value}`);
        }
        const response = await fetch(
          "https://vueshopcompback.herokuapp.com/admin/addProduct",
          {
            method: "POST",
            headers: requestHeaders,
            body: product,
            credentials: "include",
          }
        );
        if (response.status !== 200) {
          throw new Error();
        }

        formRequestConfirmation.visible = true;
        formRequestConfirmation.text = "Product added successfully";
        cleanForm();
        loader.value = false;
      } catch (err) {
        loader.value = false;
        console.log(err);
        store.dispatch(
          "ModalHandler/showModal",
          "Server did not accept product"
        );
      }
    }
    function cleanErrors() {
      for (const input in formInputs) {
        formInputs[input]["error"] = false;
        formInputs[input]["errorMsg"] = null;
      }
    }
    function cleanForm() {
      for (const input in formInputs) {
        formInputs[input]["value"] = null;
        addProductForm.value.reset();
      }
    }
    return {
      formRequestConfirmation,
      formInputs,
      closeModal,
      updateImageFile,
      checkForm,
      handleFormRequest,
      addProduct,
      cleanErrors,
      cleanForm,
      addProductForm,
      loader,
    };
  },
};
</script>
<style lang='scss'>
.addProduct__form {
  @include basicCart;
  @include flexLayout;
  margin: 3rem auto;
  padding: 2rem;
  width: 95%;
  height: 80%;
  flex-direction: column;
  font-size: $font-md;
  color: black;
  font-weight: 600;

  textarea {
    padding: 1rem;
    width: 100%;
    font-family: inherit;
  }
}
.addProduct__formControl {
  @include flexLayout;
  position: relative;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid grey;
  flex-direction: column;
}
.addProduct__formControl__inputBox {
  @include flexLayout;
  margin: 1rem;
  flex-direction: column;
}
.addProduct__formControl__inputBox--marginBottom {
  margin-bottom: 2rem;
}
.addProduct__formControl__radioInput {
  @include flexLayout;
  margin: 0.5rem;

  justify-content: space-around;
}
.addProduct__formControl__lables {
  margin-right: 1rem;
}
.addProduct__h4 {
  margin-top: 4rem;
  font-size: $font-bg;
}
.form-addProduct__para {
  margin-right: 1rem;
  font-weight: 600;
}
.form-addProduct__button {
  @include button;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  font-weight: 600;
  color: white;
}
.addProduct__formControl__input {
  text-align: center;
}
.addProduct__errorMsg {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: $font-sm;
  color: #b50909;
  font-weight: 600;
}
.addProduct__modalText {
  font-size: $font-bg;
  color: $primiary-color;
}
.addProduct__submitContainer {
  @include flexLayout;
  position: relative;
  button {
    @include button;
    padding: 0.5rem 1rem;
    font-size: 2rem;
    font-weight: 600;
    color: white;
  }
}
.addProduct__loader {
  position: absolute;
  right: -8rem;
  transform: scale(0.7);
}
@media (min-width: 768px) {
  .addProduct__formControl {
    flex-direction: row;
  }
  .addProduct__formControl__inputBox {
    flex-direction: row;
  }
}
@media (min-width: 1024px) {
  .form-addProduct {
    max-width: $max-width;
  }
}
</style>