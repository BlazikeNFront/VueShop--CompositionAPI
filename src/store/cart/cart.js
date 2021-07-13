export default {
  namespaced: true,
  state() {
    return {
      cart: [],
      showCart: false,
    };
  },
  mutations: {
    addItemToCart(state, payload) {
      state.cart = payload;
    },
    deleteItemFromCart(state, payload) {
      state.cart = payload;
    },
    resetCart(state, payload) {
      state.cart = payload;
    },
    setCart(state, payload) {
      state.cart = payload;
    },
    toggleCartBarView(state, payload) {
      state.showCart = payload;
    },
  },
  actions: {
    toggleCartBarView(context) {
      const curentState = context.getters["getShowCart"];
      context.commit("toggleCartBarView", !curentState);
    },

    async fetchCartFromDb(context) {
      try {
        const token = context.rootGetters["UserAuth/getToken"] || null;
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        if (token) {
          requestHeaders.append("Authorization", `Bearer ${token}`);
        }
        const rawData = await fetch(
          "https://vueshopcompback.herokuapp.com/getUserCart",
          {
            headers: requestHeaders,
            credentials: "include",
          }
        );
        if (rawData.status !== 200) {
          throw new Error("Server couldnt update the cart");
        }
        const cart = await rawData.json();
        context.commit("setCart", cart.cart);
        const localStorageCart = await JSON.stringify(cart.cart);
        localStorage.setItem("userCart", localStorageCart);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchCartFromLocalStorage(context) {
      try {
        const rawData = await localStorage.getItem("userCart");
        if (rawData === null) {
          return false;
        }
        const cart = await JSON.parse(rawData);

        context.commit("setCart", cart);

        return true;
      } catch (err) {
        console.log(err);
      }
    },
    addItemtoCart(context, payload) {
      const id = payload._id;

      const newCart = [...context.state.cart];

      const productIndex = newCart.findIndex((product) => product._id === id);

      if (productIndex < 0) {
        newCart.push(payload);
        context.commit("addItemToCart", newCart);
      } else {
        newCart[productIndex].quantity += payload.quantity;
      }
      context.dispatch("updateCartInDb");
    },

    deleteItemFromCart(context, payload) {
      const id = payload;

      const newCard = [...context.getters.getCart];
      const productIndex = newCard.findIndex((product) => product._id === id);

      newCard.splice(productIndex, 1);

      context.commit("deleteItemFromCart", newCard);
      context.dispatch("setCartInLocalStorage");
      if (this.token) {
        context.dispatch("updateCartInDb");
      }
    },
    resetCart(context) {
      context.commit("resetCart", []);
      context.dispatch("setCartInLocalStorage");
      context.dispatch("updateCartInDb"); // IT SHOULD ONLOY RESET CART IN FRONT
    },
    resetCartFron(context) {
      context.commit("resetCart", []);
    },
    async updateCartInDb(context) {
      try {
        const cart = context.getters["getCart"];
        const token = context.rootGetters["UserAuth/getToken"];
        if (!token) {
          return;
        }
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        if (token) {
          requestHeaders.append("Authorization", `Bearer ${token}`);
        }
        const payload = {
          cart,
        };
        const updateCartResult = await fetch(
          "https://vueshopcompback.herokuapp.com/updateUserCart",
          {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(payload),
            credentials: "include",
          }
        );
        updateCartResult;
      } catch (err) {
        console.log(err);
      }
    },
    updateProductQuantityInCart(context, payload) {
      const { newQuantity, prodId } = payload;

      const newCart = [...context.getters.getCart];
      const productIndex = newCart.findIndex(
        (product) => product._id === prodId
      );

      newCart[productIndex].quantity = newQuantity;

      context.commit("setCart", newCart);
      context.dispatch("updateCartInDb");
      context.dispatch("setCartInLocalStorage");
    },
    setCartInLocalStorage(context) {
      try {
        const cart = context.getters.getCart;
        localStorage.setItem("userCart", JSON.stringify(cart));
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getShowCart(state) {
      return state.showCart;
    },
  },
};
