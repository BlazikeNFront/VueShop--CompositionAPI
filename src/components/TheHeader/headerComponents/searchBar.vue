<template>
  <div class="searchBarContainer">
    <form>
      <drop-down
        class="searchBarContainer__dropdown"
        defaultCategory="Search In"
        :class="{ clickedDropDownStyle: dropDownVisibility }"
        :listOfCategories="['Rods', 'Reels', 'Lures', 'Lines', 'Any']"
        @categoryChange="addCategoryToSearchQuery"
        @selectCategory="setDropDownStyles"
      ></drop-down>
      <div class="searchBarInput" @click.prevent="submitSearchBarForm">
        <input
          type="text"
          id="searchBarInput"
          name="searchBarInputArea"
          :placeholder="placeholder"
          v-model.trim="searBarInputValue"
        />
        <button type="submit" aria-label="Toggle search action">
          <font-awesome-icon
            :icon="['fa', 'search']"
            class="searchBarContainer__submitIcon"
          ></font-awesome-icon>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import DropDown from "../../common/dropDown.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    DropDown,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const searBarInputValue = ref("");
    const selectedCategory = ref(null);
    const dropDownVisibility = ref(false);

    const placeholder = computed(() => {
      if (selectedCategory.value) {
        return `Search in ${selectedCategory.value}`;
      } else {
        return "Search products";
      }
    });

    function setDropDownStyles(e) {
      if (e) {
        dropDownVisibility.value = true;
      } else {
        dropDownVisibility.value = false;
      }
    }

    function addCategoryToSearchQuery(e) {
      if (e === "Any") {
        selectedCategory.value = null;
        return;
      }
      selectedCategory.value = e;
    }

    function submitSearchBarForm() {
      if (searBarInputValue.value.length === 0) {
        return;
      }
      let query = searBarInputValue.value;

      if (selectedCategory.value !== null) {
        query = query + ` ${selectedCategory.value}`;
      }

      const payload = {
        query,
      };

      store.dispatch("UserSearch/handleSearchRequest", payload);

      router.push({
        name: "search-for-product",
        params: { searchQuery: query },
        query: { page: 1 },
      });
    }
    return {
      searBarInputValue,
      setDropDownStyles,
      placeholder,
      dropDownVisibility,
      addCategoryToSearchQuery,
      submitSearchBarForm,
    };
  },
};
</script>
<style lang='scss'>
.searchBarContainer {
  form {
    @include flexLayout;
    width: 100%;
  }
}
.searchBarInput {
  @include flexLayout;
  margin-left: 1rem;
  width: 15rem;
  border-bottom: 1px solid grey;

  input {
    width: 11rem;
    border: none;
    background: transparent;
    font-size: 1.2rem;
    font-family: inherit;
    font-weight: 600;
    text-align: center;

    &::placeholder {
      color: $main-color;
    }
    &:-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #d9e4f5 inset;
    }
  }

  button {
    @include buttonTransparent;
    font-size: 2rem;
    svg {
      color: $main-color;
    }
  }
}
.searchBarContainer__dropdown {
  position: relative;
  border-radius: 20px;
  width: 3rem;

  background-color: $main-color;
  color: white;
  z-index: $headerDropDown;

  .customSelect {
    @include flexLayout;
    position: relative;
    padding: 1rem 1.5rem;
    border-radius: inherit;
    cursor: pointer;
    z-index: 1750;
    p {
      display: none;
      color: White;
    }
    svg {
      position: absolute;
      left: 0.5rem;
      width: 2rem;
    }
    .backdrop {
      z-index: $headerDropDown;
    }
    &:hover {
      background-color: #4545ba;
    }
  }
  .customSelect__selectOption {
    position: absolute;
    top: 3.5rem;
    left: -5.5rem;
    width: 14rem;
    margin-top: 1rem;
    padding: 1rem;
    padding-top: 0;
    border-radius: 10px;
    background-color: $main-color;
    font-size: 1.4rem;
    letter-spacing: 3px;
    overflow: hidden;
    z-index: 1700;

    li {
      position: relative;
      padding: 1rem;
      cursor: pointer;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 1px;
        left: 50%;
        width: 70%;
        height: 0.1rem;
        transform: translate(-50%);
        background-color: white;
      }
      &:hover {
        background-color: #4545ba;
        font-weight: 600;
      }
    }
  }
}
.clickedDropDownStyle {
  border-radius: 20px 20px 0 0;
}
@media (min-width: 768px) {
  .searchBarContainer {
    width: 28rem;
  }
  .searchBarContainer__dropdown {
    width: 10rem;

    .customSelect {
      width: 100%;
      p {
        display: block;
        font-size: 1.1rem;
        letter-spacing: 1px;
      }
      svg {
        left: 8rem;
        width: 1.5rem;
      }
    }
    .customSelect__selectOption {
      position: absolute;
      padding-top: 0.5rem;
      top: 2rem;
      left: 0;
      width: 10rem;
      border-radius: 0 0 20px 20px;
      border-top: none;
      font-size: 1.2rem;
      overflow: hidden;
      cursor: pointer;

      li {
        @include mainFontBold;
        position: relative;
        font-weight: 400;
        padding: 1rem;
        border-radius: 5px;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 1px;
          left: 50%;
          width: 70%;
          height: 0.1rem;
          transform: translate(-50%);

          background-color: white;
        }
        &:hover {
          background-color: #4545ba;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .searchBarContainer {
    width: 40rem;
  }
  .searchBarContainer__dropdown {
    width: 17rem;

    .customSelect {
      padding: 1rem 2.5rem;
      svg {
        left: 13.5rem;
      }
      p {
        width: 80%;
        font-size: 1.5rem;
      }
    }
    .customSelect__selectOption {
      left: 0;
      width: 100%;
    }
  }

  .searchBarInput {
    width: 22rem;

    input {
      width: 22rem;
      font-size: 1.3rem;
    }
  }
}
</style>
