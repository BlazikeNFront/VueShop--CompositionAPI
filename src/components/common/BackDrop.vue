<template>
  <div
    class="backdrop"
    :style="` background-color: rgba(0, 0, 0, ${this.blackOpacity || 0.5});`"
  ></div>
</template>
<script>
export default {
  props: {
    blackOpacity: {
      type: String,
      required: false,
    },
    zIndex: {
      type: String,
      required: false,
    },
  },
};
</script>
<style lang='scss'>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: default;
}
</style>