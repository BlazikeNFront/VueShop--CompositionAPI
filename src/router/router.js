import { createRouter, createWebHistory } from "vue-router";
import globalStore from "../store/index.js";
import MainPage from "./pages/mainPage.vue";

import SearchResult from "./pages/searchResult.vue";
import UserAuth from "./pages/userAuth.vue";

import ProductDetails from "./pages/productDetails.vue";
import AdminAddProduct from "./pages/AddProduct.vue";
import AdminCMS from "./pages/adminCMS.vue";
import AdminOrders from "./pages/adminCheckOrders.vue";
import UserCart from "./pages/UserCart.vue";
import UserOrders from "./pages/UserOrders.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "main-page", path: "/", component: MainPage },
    {
      name: "search-for-product",
      path: "/search/:searchQuery",
      component: SearchResult,
    },
    { path: "/productDetails/:productId", component: ProductDetails },
    {
      name: "user-login",
      path: "/User/:view",

      component: UserAuth,
    },

    {
      name: "user-signUp",
      path: "/User/:view",

      component: UserAuth,
    },

    {
      name: "admin-cms",
      path: "/Admin",
      component: AdminCMS,
      beforeEnter(to, from, next) {
        if (
          !globalStore.getters["UserAuth/getAdminState"] ||
          !globalStore.getters["UserAuth/getToken"]
        ) {
          next({ name: "main-page" });
        } else {
          next();
        }
      },
    },
    {
      path: "/Admin/AddProduct",
      component: AdminAddProduct,
      beforeEnter(to, from, next) {
        if (
          !globalStore.getters["UserAuth/getAdminState"] ||
          !globalStore.getters["UserAuth/getToken"]
        ) {
          next({ name: "main-page" });
        } else {
          next();
        }
      },
    },
    {
      name: "admin-orders",
      path: "/Admin/orders",
      component: AdminOrders,
      beforeEnter(to, from, next) {
        if (
          !globalStore.getters["UserAuth/getAdminState"] ||
          !globalStore.getters["UserAuth/getToken"]
        ) {
          next({ name: "main-page" });
        } else {
          next();
        }
      },
    },
    { name: "user-cart", path: "/UserCart", component: UserCart },
    {
      name: "user-orders",
      path: "/UserOrders",
      component: UserOrders,
      beforeEnter(to, from, next) {
        if (!globalStore.getters["UserAuth/getToken"]) {
          next({ name: "user-login", params: { view: "login" } });
        } else {
          next();
        }
      },
    },

    { path: "/user/historyOrder", component: UserCart },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      savedPosition.behavior = "smooth";
      return savedPosition;
    }
    return {
      el: "#nav",
      behavior: "smooth",
    };
  },
});

export default router;
