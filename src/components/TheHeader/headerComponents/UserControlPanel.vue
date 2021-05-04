<template>
  <div class="userControlPanel">
    <button @click="handleUserButton" class="userControlPanel__showPanelButton">
      <font-awesome-icon
        :class="{ loggedUserIcon: token }"
        :icon="['fa', 'user']"
      ></font-awesome-icon>
    </button>

    <back-drop v-if="showUserPanel" @click="hideUserPanel"></back-drop>
    <transition name="user-panel">
      <div class="userControlPanel__panelContainer" v-if="showUserPanel">
        <div class="userControlPanel__panel">
          <a @click.prevent="redirectToUserCart">Check current cart</a>
          <a @click.prevent="redirectToUserOrder">Check orders</a>
          <a v-if="userIsAdmin" @click.prevent="redirectToAdminPanel">ADMIN</a>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useToken from "../../hooks/logger.js";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const { token, userIsAdmin } = useToken();

    const showUserPanel = ref(false);

    function hideUserPanel() {
      showUserPanel.value = false;
    }
    function handleUserButton() {
      if (token.value) {
        showUserPanel.value = !showUserPanel.value;
      } else {
        router.push({ path: "/User/login" });
      }
    }
    function logout() {
      store.dispatch("UserAuth/logout");
      hideUserPanel();
      router.push("/");
    }
    function redirectToUserCart() {
      hideUserPanel();
      router.push({ name: "user-cart" });
    }
    function redirectToUserOrder() {
      hideUserPanel();
      router.push({ name: "user-orders", query: { page: 1 } });
    }
    function redirectToAdminPanel() {
      hideUserPanel();
      router.push({ name: "admin-cms" });
    }

    return {
      showUserPanel,
      token,
      userIsAdmin,
      hideUserPanel,
      handleUserButton,
      logout,
      redirectToUserCart,
      redirectToUserOrder,
      redirectToAdminPanel,
    };
  },
};
</script>
<style lang="scss">
.userControlPanel {
  button {
    border: none;
    background: none;
    font-size: 2.5rem;
    color: $main-color;
  }
  a {
    cursor: pointer;
  }
  .backdrop {
    z-index: $backdrop;
  }
}
.userControlPanel__panelContainer {
  position: absolute;
  right: -6%;
  width: 19rem;
  height: 21rem;
  overflow: hidden;
  z-index: 2000;
}
.userControlPanel__panel {
  @include flexLayout;
  @include bluesGradient;
  width: 19rem;
  height: 21rem;

  border: 2px solid white;
  border-radius: 15px 0 0 15px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;

  a {
    @include button;
    padding: 1rem;
    background-color: white;
    border-radius: 20px 0 0 20px;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
  }
  button {
    @include button;
    padding: 0.5rem 1rem;
    border-radius: 20px 0 0 20px;
    background-color: white;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
  }
}

.loggedUserIcon {
  color: #01baef;
}
.user-panel-enter-active {
  transition: all 0.3s ease-out;
}
.user-panel-leave-active {
  transition: all 0.3s ease-in;
}
.user-panel-enter-from,
.user-panel-leave-to {
  transform: translate(20rem);
}
.user-panel-enter-to,
.user-panel-leave-from {
  transform: translate(0rem);
}
@media (min-width: 768px) {
  .userControlPanel__panelContainer {
    position: absolute;
    left: 0;
    right: 0%;
    width: 19rem;
    height: 21rem;
    transform: translate(-8rem, 0rem);

    overflow: hidden;
    z-index: 2000;
  }
  .userControlPanel {
    position: relative;
  }
  .userControlPanel__panel {
    border-radius: 10px;
    align-items: center;

    a {
      border-radius: 20px;
    }
    button {
      border-radius: 20px;
    }
  }
  .user-panel-enter-from,
  .user-panel-leave-to {
    width: 0rem;
    height: 0rem;
    transform: translate(1rem, -2rem);
  }
  .user-panel-enter-to,
  .user-panel-leave-from {
    width: 19rem;
    height: 21rem;
    transform: translate(-8rem, 0rem);
  }
}
</style>