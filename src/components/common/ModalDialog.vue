<template>
  <teleport to="body">
    <back-drop @click="emitCloseDialog"></back-drop>
    <div class="modalDialog" :style="boxDimension">
      <h3 class="modalDialog__h3">Infomation</h3>
      <slot> </slot>
      <button class="modalDialog__button" @click="emitCloseDialog">
        Close
      </button>
    </div>
  </teleport>
</template>
<script>
import { computed } from "vue";
export default {
  emits: ["closeDialog"],
  props: {
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },

  setup(props, context) {
    const boxDimension = computed(() => {
      return "width:" + props.width + "; height:" + props.height + ";";
    });
    function emitCloseDialog() {
      context.emit("closeDialog");
    }
    return { boxDimension, emitCloseDialog };
  },
};
</script>
<style lang='scss'>
.modalDialog {
  @include centerAbsolute;
  @include flexLayout;
  position: fixed;
  width: 90%;
  max-width: 135rem;
  height: fit-content;
  min-height: 75rem;
  border: 2px solid $primiary-color;
  border-radius: 10px;
  background-color: #d9e4f5;
  background-image: linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%);
  flex-direction: column;
  z-index: $modal-dialog;
  overflow: hidden;
}
.backdrop {
  z-index: $modal-dialog;
}
.modalDialog__h3 {
  margin: 1rem;
  color: black;
  font-size: 3rem;
  text-align: center;
}
.modalDialog__button {
  @include button;
  margin: 2rem;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  font-weight: 600;
}
</style>