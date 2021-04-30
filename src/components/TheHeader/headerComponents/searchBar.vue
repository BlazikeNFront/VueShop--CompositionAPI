<template>
  <div class="searchBarContainer">
    <form>
      <drop-down
        class="searchBarContainer__dropdown"
        defaultCategory="Search In"
        :listOfCategories="['Rods', 'Reels', 'Lures', 'Lines', 'Any']"
        @categoryChange="addCategoryToSearchQuery"
      ></drop-down>
      <div class="searchBarInput" @click.prevent="submitSearchBarForm">
        <input
          type="text"
          id="searchBarInput"
          name="searchBarInputArea"
          :placeholder="placeholder"
          v-model.trim="searBarInputValue"
        />
        <button type="submit">
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

export default {
  components: {
    DropDown,
  },

  data() {
    return {
      searBarInputValue: "",
      selectedCategory: null,
    };
  },
  computed: {
    placeholder() {
      if (this.selectedCategory) {
        return `Search in ${this.selectedCategory}`;
      } else {
        return "Search products";
      }
    },
  },
  methods: {
    addCategoryToSearchQuery(e) {
      if (e === "Any") {
        this.selectedCategory = null;
        return;
      }
      this.selectedCategory = e;
    },
    async submitSearchBarForm() {
      if (this.searBarInputValue.length === 0) {
        return;
      }
      let query = this.searBarInputValue;

      if (this.selectedCategory !== null) {
        query = query + ` ${this.selectedCategory}`;
      }

      const payload = {
        query,
      };
      this.$store.dispatch("UserSearch/handleSearchRequest", payload);

      this.$router.push({
        name: "search-for-product",
        params: { searchQuery: query },
        query: { page: 1 },
      });
    },
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

    &:focus {
      outline: none;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0 30px #f5e3e6 inset;
    box-shadow: 0 0 0 30px #f5e3e6 inset;
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

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #c0e4f5;
  color: black;
  z-index: 1000;

  .customSelect {
    @include flexLayout;
    position: relative;
    padding: 1rem 1.5rem;
    height: 3rem;
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    cursor: pointer;

    z-index: 1200;
    p {
      display: none;
      color: black;
    }
    svg {
      position: absolute;
      left: 0.4rem;
      width: 2rem;
      color: black;
    }
    .backdrop {
      z-index: $headerDropDown;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .customSelect__selectOption {
    position: absolute;
    top: 3.5rem;
    left: -5.5rem;
    width: 14rem;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #c0e4f5;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 3px;
    z-index: $headerDropDown;

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
        background-color: rgba(0, 0, 0, 0.2);
        font-weight: 600;
        &::after {
          background-color: $light-Black;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .searchBarContainer {
    width: 28rem;
  }
  .searchBarContainer__dropdown {
    width: 10rem;
    border-radius: 10px 10px 0 0;

    .customSelect {
      width: 100%;
      p {
        display: block;
        font-weight: 600;
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
      top: 2.9rem;
      left: 0;
      width: 10rem;
      border-top: none;

      border-radius: 0 0 10px 10px;
      background-color: #c0e4f5;
      font-size: 1.2rem;
      overflow: hidden;
      cursor: pointer;

      z-index: 1200;

      li {
        @include mainFontBold;
        position: relative;
        padding: 0.5rem;
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
          color: rgb(44, 62, 80);
          background-color: rgba(44, 62, 80, 0.2);
          &::after {
            background-color: #2c3e50;
          }
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
      width: 17rem;
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
