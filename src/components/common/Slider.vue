<template>
  <div class="range__slider">
    <input
      ref="rangeInput"
      class="rangeInput"
      type="range"
      min="0"
      max="100"
      value="50"
      @input="changeValue"
      :style="this.progressBar"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress: 50,
    };
  },
  computed: {
    progressBar() {
      return `background: linear-gradient(
    90deg,
    rgb(117, 252, 117),
    ${this.progress}%,
    rgb(214, 214, 214) ${this.progress}%
  );`;
    },
  },
  methods: {
    changeValue(e) {
      const newValue = (e.target.value * 100) / this.$refs.rangeInput.max;
      this.progress = newValue;
    },
  },
};
</script>
<style lang='scss'>
.range__slider {
  position: relative;
  margin: 5rem auto;
  width: 20rem;
}

.rangeInput {
  -webkit-appearance: none;
  width: 100%;
  height: 1rem;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgb(117, 252, 117),
    60%,
    rgb(214, 214, 214) 60%
  );
  outline: none;
  opacity: 0.8;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.rangeInput::-webkit-slider-thumb {
  transform: scale(1.1);
}
.rangeInput:hover {
  opacity: 1;
}
</style>
