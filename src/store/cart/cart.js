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
    toggleCart(state, payload) {
      state.showCart = payload;
      console.log(state.showCart);
    },
  },
  actions: {
    toggleCart(context) {
      const curentState = context.getters["getShowCart"];

      context.commit("toggleCart", !curentState);
    },
    async fetchCartFromDb(context, token) {
      try {
        const rawData = await fetch("http://localhost:3000/getUserCart", {
          headers: { Authorization: token },
        });
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
      console.log(payload);
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
      const productIndex = newCard.findIndex((product) => product.id === id);

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
        const payload = {
          cart,
          token,
        };
        const updateCartResult = await fetch(
          "http://localhost:3000/updateUserCart",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
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
