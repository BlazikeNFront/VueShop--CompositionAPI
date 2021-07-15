<template>
  <div>
    <back-drop
      v-if="selectCategory"
      @click="selectCategoryAction"
      blackOpacity="0"
    ></back-drop>
    <button
      class="customSelect"
      @click.prevent="selectCategoryAction"
      aria-label="open possible options panel"
    >
      <p class="customSelect__selected">
        {{ selectedCategory || this.defaultCategory }}
      </p>

      <font-awesome-icon
        :icon="['fas', 'arrow-right']"
        class="customSelect__buttonIcon"
      ></font-awesome-icon>
    </button>
    <transition
      name="dropDown"
      @enter="emitCurrentDropDownState"
      @after-leave="emitCurrentDropDownState"
    >
      <ul class="customSelect__selectOption" v-if="selectCategory">
        <li
          v-for="(category, index) in this.listOfCategories"
          :key="category"
          @click="changeSelectedCategory(category, index)"
        >
          {{ category }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    defaultCategory: {
      required: true,
      type: String,
    },
    listOfCategories: {
      required: true,
      type: Object,
    },
  },

  emits: ["categoryChange", "selectCategory"],

  setup(props, context) {
    const selectedCategory = ref(null);
    const selectCategory = ref(false);
    const indexOfSelected = ref(null);

    function selectCategoryAction() {
      selectCategory.value = !selectCategory.value;
    }
    function emitCurrentDropDownState() {
      context.emit("selectCategory", selectCategory.value);
    }

    function changeSelectedCategory(category, index) {
      selectedCategory.value = category;
      indexOfSelected.value = index;
      selectCategoryAction();
      context.emit("categoryChange", category, index);
    }

    return {
      selectedCategory,
      selectCategory,
      indexOfSelected,
      selectCategoryAction,
      emitCurrentDropDownState,
      changeSelectedCategory,
    };
  },
};
</script>
<style lang='scss'>
.customSelect {
  @include flexLayout;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;

  svg {
    width: 100%;
    height: 100%;
    color: white;
    transform: rotate(90deg);
  }
}

.dropDown-enter-active,
.dropDown-leave-active {
  transition: all 0.2s linear;
}

.dropDown-enter-from,
.dropDown-leave-to {
  max-height: 0rem;
}
.dropDown-enter-to,
.dropDown-leave-from {
  max-height: 50rem;
}
@media (min-width: 768px) {
  .dropDown-enter-active {
    transition: all 0.3s linear;
  }
  .dropDown-leave-active {
    transition: all 0.3s linear;
  }
}
</style>