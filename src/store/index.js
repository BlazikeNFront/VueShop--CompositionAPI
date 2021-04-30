import { createStore } from "vuex";

import UserAuth from "./userAuth/userAuth.js";
import Cart from "./cart/cart.js";
import Admin from "./admin/admin.js";
import UserSearch from "./userSearch/userSearchStore.js";
import ErrorHandler from "./errors/errorHandler.js";

const store = createStore({
  modules: {
    UserAuth,
    Cart,
    Admin,
    UserSearch,
    ErrorHandler,
  },
});

export default store;
