<template>
  <div>
    <div class="paginationButtons">
      <button
        @click="previousPageClick()"
        class="pagination__pageChangersButtons"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-right']"
          class="paginationButtons__previousButton"
        ></font-awesome-icon>
      </button>
      <div class="paginationButtons__pages" ref="buttons">
        <hexagonal-shape
          :color="this.backgroundOfHexagon || '#01baef'"
          v-for="page in numberOfPages"
          :key="page"
          @click="pageClick($event, page)"
          class="paginationButtons__hexagonShapes"
        >
          <button
            class="paginationButtons__hexagonButtons"
            :class="{ activePage: currentPage == parseInt(page) }"
          >
            {{ page }}
          </button>
        </hexagonal-shape>
      </div>
      <button
        @click="nextPageClick($event)"
        class="pagination__pageChangersButtons"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-right']"
          class="paginationButtons__nextButton"
        ></font-awesome-icon>
      </button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import HexagonalShape from "./HexagonalShape.vue";

export default {
  props: ["numberOfPages", "backgroundOfHexagon", "currentPage"],
  emits: ["pageChange", "previousPageClick", "nextPageClick"],
  components: {
    HexagonalShape,
  },
  setup(props, context) {
    const buttons = ref(null);

    function previousPageClick() {
      if (parseInt(props.currentPage) === 1) {
        return;
      }
      const buttonToAnimate = buttons.value.children[props.currentPage - 2];
      buttonToAnimate.classList.remove("buttonClickAnimation");
      void buttonToAnimate.offsetWidth; //force reflow
      buttonToAnimate.classList.add("buttonClickAnimation");
      context.emit("previousPageClick");
    }
    function pageClick(e, page) {
      const element = e.path[1];
      element.classList.remove("buttonClickAnimation");
      void element.offsetWidth; //force reflow
      element.classList.add("buttonClickAnimation");
      context.emit("pageChange", page);
    }
    function nextPageClick() {
      const buttonsNumber = Array.from(buttons.value.children).length;
      if (parseInt(props.currentPage) === buttonsNumber) {
        return;
      }
      const buttonToAnimate = buttons.value.children[props.currentPage];
      buttonToAnimate.classList.remove("buttonClickAnimation");
      void buttonToAnimate.offsetWidth; //force reflow
      buttonToAnimate.classList.add("buttonClickAnimation");
      context.emit("nextPageClick");
    }
    return { buttons, previousPageClick, pageClick, nextPageClick };
  },
};
</script>
<style lang="scss">
.paginationButtons {
  @include flexLayout;
  margin: 4rem auto;
  width: 90%;

  .pagination__pageChangersButtons {
    @include button;
    margin: 3rem;
    padding: 1rem;
    color: white;
    font-size: $font-md;
  }
  button:hover {
    color: #2c3e50;
  }
}
.paginationButtons__hexagonButtons {
  @include mainFontBold;
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  outline: none;
  z-index: 1;
}

.paginationButtons__pages {
  @include flexLayout;
  justify-content: center;
  flex-wrap: wrap;
}
.paginationButtons__hexagonShapes {
  margin: 0 1rem;
  transform: scale(1.4);
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    button {
      color: #2c3e50;
    }
  }
}
.paginationButtons__previousButton {
  transform: rotate(180deg);
}
.activePage {
  color: #2c3e50;
}

.buttonClickAnimation {
  animation-name: buttonAnimation;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

@keyframes buttonAnimation {
  0% {
    transform: rotateY(0turn) scale(1.4);
  }

  100% {
    transform: rotateY(1turn) scale(1.4);
  }
}

@media (min-width: 768px) {
  .paginationButtons {
    width: 70%;
  }
}
</style>