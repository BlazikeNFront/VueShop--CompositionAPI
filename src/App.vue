<template>
  <div class="brandAdd">
    <week-offer-box></week-offer-box>
  </div>
  <div class="container">
    <the-header></the-header>
    <main id="main">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" :name="route.meta.transition || 'pageChange'">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer-component></footer-component>
    <modal-dialog
      v-if="this.userActionError"
      @closeDialog="this.closeErrorModal"
    >
      <h4 class="errorDialog_h4">Error occured :(</h4>
      <p class="errorDialog_p">{{ this.userActionErrorMessage }}</p>
    </modal-dialog>
  </div>
</template>

<script>
import WeekOfferBox from "./components/mainPage/currentOffersBox/currentOfferBox.vue";
import TheHeader from "./components/TheHeader/TheHeader.vue";
import FooterComponent from "./components/footer/footer.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    TheHeader,
    WeekOfferBox,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const userActionError = computed(() => {
      return store.getters["ErrorHandler/getShowErrorModal"];
    });
    const userActionErrorMessage = computed(() => {
      return store.getters["ErrorHandler/getErrorModalMsg"];
    });
    function closeErrorModal() {
      store.dispatch("ErrorHandler/closeModal");
    }

    return {
      userActionError,
      userActionErrorMessage,
      closeErrorModal,
    };
  },
};
</script>

<style lang='scss'>
html {
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  ::-webkit-scrollbar-track {
    box-shadow: none;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 12px;
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: none;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d62929;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-family: $mainFont;
}

h2 {
  font-size: 4rem;
  font-weight: 800;
}

ol,
ul {
  list-style: none;
}
button {
  cursor: pointer;
}

.brandAdd {
  position: fixed;
  top: 50%;
  z-index: 2222;
}

#app {
  background-color: #d9e4f5;
  font-family: $mainFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  position: relative;
  width: 100%;
  min-height: 100vh;

  overflow: hidden;
}

#main {
  margin: 0rem auto;
  padding: 4rem 0; // avoid margin stacking
  width: 100%;
  height: 100%;
  max-width: 192rem;
  overflow: hidden;
}

.errorDialog_h4 {
  width: 50rem;
}

.pageChange-enter-active,
.pageChange-leave-active {
  transition: all 0.5s;
}

.pageChange-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.pageChange-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.pageChange-enter-to,
.pageChange-leave-from {
  opacity: 1;
  transform: translateX(0%);
}
.rawRedirect-enter-active,
.rawRedirect-leave-active {
  opacity: 1;
}
</style>
