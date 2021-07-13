import { createStore } from "vuex";

import UserAuth from "./userAuth/userAuth.js";
import Cart from "./cart/cart.js";
import Admin from "./admin/admin.js";
import UserSearch from "./userSearch/userSearchStore.js";
import ModalHandler from "./modal/modalHandler.js";

const store = createStore({
  modules: {
    UserAuth,
    Cart,
    Admin,
    UserSearch,
    ModalHandler,
  },
});

export default store;
