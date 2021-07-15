import { createRouter, createWebHistory } from "vue-router";
import globalStore from "../store/index.js";
import MainPage from "./pages/MainPage.vue";
import SearchResult from "./pages/SearchResult.vue";
import UserAuth from "./pages/UserAuth.vue";
import ProductDetails from "./pages/ProductDetails.vue";
import AddProduct from "./pages/AddProduct.vue";
import AdminOrders from "./pages/AdminCheckOrders.vue";
import AdminCMS from "./pages/AdminCMS.vue";
import UserCart from "./pages/UserCart.vue";
import UserOrders from "./pages/UserOrders.vue";

// const SearchResult = () =>
//   import(/* webpackChunkName: "SearchResult" */ "./pages/SearchResult.vue");

// const UserAuth = () =>
//   import(/* webpackChunkName: "UserAuth" */ "./pages/UserAuth.vue");

// const ProductDetails = () =>
//   import(/* webpackChunkName: "ProductDetails" */ "./pages/ProductDetails.vue");

// const AddProduct = () =>
//   import(/* webpackChunkName: "AddProduct" */ "./pages/AddProduct.vue");

// const AdminCMS = () =>
//   import(/* webpackChunkName: "AdminCMS" */ "./pages/AdminCMS.vue");

// const AdminOrders = () =>
//   import(/* webpackChunkName: "AdminOrders" */ "./pages/AdminCheckOrders.vue");

// const UserCart = () =>
//   import(/* webpackChunkName: "UserCart" */ "./pages/UserCart.vue");

// const UserOrders = () =>
//   import(/* webpackChunkName: "UserOrders" */ "./pages/UserOrders.vue");

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
      beforeEnter(to, from, next) {
        if (globalStore.getters["UserAuth/getToken"]) {
          next({ name: "main-page" });
          return;
        }
        if (from.name) {
          to.params.fromName = from.name;
        }
        next();
      },
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
      component: AddProduct,
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
          const rotuerParams = {
            view: "login",
          };
          if (to.params.redirectAfterLogin) {
            rotuerParams.redirectAfterLogin = to.params.redirectAfterLogin;
          }

          next({ name: "user-login", params: rotuerParams });
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
      el: "#header",
      behavior: "smooth",
    };
  },
});

export default router;
