<template>
  <div class="container">
    <the-header id="header"></the-header>
    <main id="main">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" :name="route.meta.transition || 'pageChange'">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer-component></footer-component>
    <modal-dialog v-if="this.userActionModal" @closeDialog="this.closeModal">
      <h4 class="errorDialog_h4">Error occured :(</h4>
      <p class="errorDialog_p">{{ this.userActionModalMsg }}</p>
    </modal-dialog>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader/TheHeader.vue";
import FooterComponent from "./components/footer/footer.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    TheHeader,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const userActionModal = computed(() => {
      return store.getters["ModalHandler/getShowModal"];
    });
    const userActionModalMsg = computed(() => {
      return store.getters["ModalHandler/getModalMsg"];
    });
    function closeModal() {
      store.dispatch("ModalHandler/closeModal");
    }
    function checkForToken() {
      if (document.cookie.split("=")[1] === "true") {
        store.dispatch("UserAuth/authUserWithCookie");
      }
    }
    onMounted(() => {
      checkForToken();
    });
    return {
      userActionModal,
      userActionModalMsg,
      closeModal,
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
h5 {
  font-size: 1.5rem;
  font-weight: 800;
}
ol,
ul {
  list-style: none;
}
button {
  cursor: pointer;
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
.modalDialog_p {
  margin: 0 auto;
  text-align: center;
  width: 90%;
  font-size: 2rem;
  font-weight: 600;
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
