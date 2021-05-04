export default {
  namespaced: true,
  state() {
    return {
      token: null,
      admin: true,
      addresses: {
        lastUsed: null,
        all: [],
      },
    };
  },
  mutations: {
    handleLogin(state, payload) {
      state.token = payload.token;
    },
    handleAdminLogin(state, payload) {
      state.token = payload;
      state.admin = true;
    },
    logout(state) {
      state.token = null;
      state.admin = false;
    },
    setUserAddress(state, payload) {
      state.addresses.all = payload; //PAYLOAD SHOULD BE AN ARRAY
    },
    setLastUsedUserAddress(state, payload) {
      state.addresses.lastUsed = payload;
    },
  },
  actions: {
    async handleLogin(context, payload) {
      try {
        const userData = {
          email: payload.userName,
          password: payload.password,
        };
        const data = await fetch("http://localhost:3000/userAuth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: await JSON.stringify(userData),
        });

        const dataJSON = await data.json();

        if (data.status !== 200) {
          throw new Error(data.message);
        } else {
          const { token, userAdmin } = dataJSON;
          const localStorageUserCart = await this.dispatch(
            "Cart/fetchCartFromLocalStorage",
            {
              root: true,
            }
          );
          if (localStorageUserCart === false) {
            this.dispatch("Cart/fetchCartFromDb", token, {
              root: true,
            });
          }

          if (userAdmin === true) {
            context.commit("handleAdminLogin", token);
            return;
          }
          context.commit("handleLogin", token);
        }
      } catch (err) {
        console.log(err);
        this.dispatch("ErrorHandler/showError", err.message, {
          root: true,
        });
      }
    },
    async fetchUserAddress(context) {
      try {
        const token = context.getters["getToken"];

        const rawData = await fetch("http://localhost:3000/getUserAddresses", {
          headers: { Authorization: token },
        });

        if (rawData.status !== 200) {
          throw new Error("Server couldnt fetch user address");
        }
        const data = await rawData.json();
        context.commit("setLastUsedUserAddress", data.lastUsed);
        context.commit("setUserAddress", data.all);
      } catch (err) {
        console.log(err);
      }
    },
    logout(context) {
      context.commit("logout");
      this.dispatch("Cart/resetCartFron", {
        root: true,
      });
    },
    async setLastUsedUserAddress(context, payload) {
      try {
        context.commit("setLastUsedUserAddress", payload);
        const token = context.getters["getToken"];

        const payloadForServer = {
          token,
          address: payload,
        };
        console.log("poszedl request");
        const responseFromServer = await fetch(
          "http://localhost:3000/updateDefaultUserAddress",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: await JSON.stringify(payloadForServer),
          }
        );

        if (responseFromServer.status !== 200) {
          throw new Error("Server did not saved last used user address");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getAdminState(state) {
      return state.admin;
    },
    getLastUsedAddress(state) {
      return state.addresses.lastUsed;
    },
    getAllUserAddresses(state) {
      return state.addresses.all;
    },
  },
};
