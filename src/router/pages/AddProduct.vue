<template>
  <div>
    <form
      ref="addProductFrom"
      class="form-addProduct"
      @submit.prevent="handleFormRequest"
      @click="cleanErrors"
    >
      <h4 class="form-addProduct__h4">Add product to store:</h4>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox">
          <p class="form-addProduct__para">Select type of product:</p>
          <div class="addProduct__formControl__radioInput">
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
          <div class="addProduct__formControl__radioInput">
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

        <p class="addProduct__errorMsg" v-if="formInputs.typeOfProduct.error">
          {{ formInputs.typeOfProduct.errorMsg }}
        </p>
      </div>
      <div class="addProduct__formControl">
        <div class="addProduct__formControl__inputBox">
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
        <div class="addProduct__formControl__inputBox">
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
        <div class="addProduct__formControl__inputBox">
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
        <div class="addProduct__formControl__inputBox">
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
          {{ formInputs.image.error.errorMsg }}
        </p>
      </div>
      <button class="form-addProduct__button">Create product</button>
    </form>
    <confirmation-modal
      v-if="this.formRequestConfirmation.visible"
      @closeDialog="closeModal"
      @confirmError="closeModal"
    >
      <h4 class="addProduct__errorMsg__moddalText">
        {{ formRequestConfirmation.text }}
      </h4>
    </confirmation-modal>
  </div>
</template>
<script>
import ConfirmationModal from "../../components/common/ModalDialog.vue";
export default {
  components: {
    ConfirmationModal,
  },
  data() {
    return {
      formRequestConfirmation: { visible: false, text: null },
      formInputs: {
        typeOfProduct: { value: null, error: false, errorMsg: null },
        categoryOfProduct: { value: null, error: false, errorMsg: null },
        name: { value: null, error: false, errorMsg: null },
        descritpion: { value: null, error: false, errorMsg: null },
        price: { value: null, error: false, errorMsg: null },
        quantity: { value: null, error: false, errorMsg: null },
        image: { value: null, error: false, errorMsg: null },
      },
    };
  },

  methods: {
    closeModal() {
      this.formRequestConfirmation.visible = false;
      this.formRequestConfirmation.text = null;
    },
    updateImageFile(e) {
      this.formInputs.image.value = e.target.files[0];
    },
    checkForm() {
      const {
        typeOfProduct,
        categoryOfProduct,
        name,
        descritpion,
        price,
        quantity,
        image,
      } = this.formInputs;

      if (typeOfProduct.value === null) {
        this.formInputs.typeOfProduct.error = true;
        this.formInputs.typeOfProduct.errorMsg =
          "U need to pick a type of product";
        return false;
      }
      if (categoryOfProduct.value === null) {
        this.formInputs.categoryOfProduct.error = true;
        this.formInputs.categoryOfProduct.errorMsg =
          "U need to pick a category of product";
        return false;
      }
      if (name.value === null || name.value.length < 5) {
        this.formInputs.name.error = true;
        this.formInputs.name.errorMsg =
          "Name should contaitn at least 5 characters";
        return false;
      }
      if (
        descritpion.value === null ||
        descritpion.value.split(" ").length < 30
      ) {
        this.formInputs.descritpion.error = true;
        this.formInputs.descritpion.errorMsg =
          "Descritpion should contain at least 30 words";
        return false;
      }
      if (price.value === null || price.value < 0) {
        this.formInputs.price.error = true;
        this.formInputs.price.errorMsg = "Price is not provided";
        return false;
      }

      if (
        quantity.value === null ||
        quantity.value < 0 ||
        !Number.isInteger(Number(quantity.value))
      ) {
        this.formInputs.quantity.error = true;
        this.formInputs.quantity.errorMsg = "Quantity number must be integer";
        return false;
      }
      if (image.value === null) {
        this.formInputs.image.error = true;
        this.formInputs.image.errorMsg = "Image of product must be provided";
        return false;
      }
      return true;
    },
    async handleFormRequest() {
      const {
        typeOfProduct,
        categoryOfProduct,
        name,
        descritpion,
        price,
        quantity,
        image,
      } = this.formInputs;

      const formValidation = this.checkForm();
      const product = new FormData();

      product.append("type", typeOfProduct.value);
      product.append("category", categoryOfProduct.value);
      product.append("name", name.value);
      product.append("description", descritpion.value);
      product.append("price", price.value);
      product.append("quantity", quantity.value);
      product.append("image", image.value);

      if (formValidation === true) {
        const productId = await this.addProduct(product);

        if (!productId) {
          this.formRequestConfirmation.text =
            "Server couldnt add product :( Try again";
          this.formRequestConfirmation.visible = true;
          throw new Error("no product iD in VUE PAGE");
        }
        this.formRequestConfirmation.text = "Added product succesfully";
        this.formRequestConfirmation.visible = true;
        this.cleanForm();
      }
    },
    async addProduct(product) {
      try {
        const response = await fetch("http://localhost:3000/admin/addProduct", {
          method: "POST",
          hheaders: { "Content-Type": "application/json" },
          body: product,
        });
        if (response.status !== 200) {
          throw new Error("add product// status != 200");
        }
        const responseJSON = await response.json();
        if (!responseJSON.productId) {
          throw new Error(
            "add prooduct action // backend did not send productId"
          );
        }

        return responseJSON.productId;
      } catch (err) {
        console.log(err);
        this.$store.dispatch("ErrorHandler/showError", err.message);
      }
    },
    cleanErrors() {
      for (const input in this.formInputs) {
        this.formInputs[input]["error"] = false;
        this.formInputs[input]["errorMsg"] = null;
      }
    },
    cleanForm() {
      for (const input in this.formInputs) {
        this.formInputs[input]["value"] = null;
        this.$refs["addProductFrom"].reset();
      }
    },
  },
};
</script>
<style lang='scss'>
.form-addProduct {
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
.addProduct__formControl__radioInput {
  @include flexLayout;
  margin: 0.5rem;

  justify-content: space-around;
}
.addProduct__formControl__lables {
  margin-right: 1rem;
}
.form-addProduct__h4 {
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

  width: 150%;
  font-size: $font-sm;
  color: red;
}
.addProduct__errorMsg__moddalText {
  font-size: $font-bg;
  color: $primiary-color;
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