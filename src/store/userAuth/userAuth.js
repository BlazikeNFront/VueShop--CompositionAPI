export default {
  namespaced: true,
  state() {
    return {
      token: null,
      admin: false,
      addresses: {
        lastUsed: null,
        all: [],
      },
    };
  },
  mutations: {
    handleLogin(state, payload) {
      state.token = payload;
    },

    handleAdminLogin(state, payload) {
      state.token = payload;
      state.admin = true;
    },
    logout(state) {
      state.token = null;
    },

    setUserAddress(state, payload) {
      state.addresses.all = payload; //PAYLOAD SHOULD BE AN ARRAY
    },
    setLastUsedUserAddress(state, payload) {
      state.addresses.lastUsed = payload;
    },
    adminLogout(state) {
      state.token = null;
      state.admin = false;
    },
  },
  actions: {
    //login is made out of promises instead of async await because i want to handle login errors in userLogin component where i use async await syntax ( await need promise to work properly);
    handleLogin(context, payload) {
      const userData = {
        email: payload.userName,
        password: payload.password,
      };
      return new Promise((resolve, reject) => {
        const userDataJSON = () => {
          return new Promise((resolve) => {
            const json = JSON.stringify(userData);
            resolve(json);
          });
        };

        userDataJSON().then((userDataJSON) => {
          fetch("http://localhost:3000/userAuth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: userDataJSON,
            credentials: "include",
          })
            .then((data) => {
              if (data.status !== 200) {
                throw data;
              } else {
                return data.json();
              }
            })
            .then((dataJSON) => {
              const tokenPayload = dataJSON.token;
              if (dataJSON.userAdmin) {
                context.commit("handleAdminLogin", tokenPayload);
              } else {
                context.commit("handleLogin", tokenPayload);
              }
              resolve();
              //user cart disptaches are not essential ...

              document.cookie = "tokenProvided=true;Max-Age=1800000; Secure";

              const localStorageUserCart = this.dispatch(
                "Cart/fetchCartFromLocalStorage",
                {
                  root: true,
                }
              );
              if (localStorageUserCart === false) {
                this.dispatch("Cart/fetchCartFromDb", dataJSON.token, {
                  root: true,
                });
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },
    async authUserWithCookie(context) {
      try {
        const response = await fetch("http://localhost:3000/authWithCookie", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const dataJSON = await response.json();
        const tokenPayload = dataJSON.token;
        context.commit("handleLogin", tokenPayload);

        document.cookie = "tokenProvided=true;Max-Age=1800000; Secure";
        this.dispatch("Cart/fetchCartFromLocalStorage", {
          root: true,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUserAddress(context) {
      try {
        const token = context.rootGetters["UserAuth/getToken"] || null;
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        if (token) {
          requestHeaders.append("Authorization", `Bearer ${token}`);
        }

        const rawData = await fetch("http://localhost:3000/getUserAddresses", {
          headers: requestHeaders,
          credentials: "include",
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

    setUserAddresses(context, payload) {
      context.commit("setUserAddress", payload);
    },
    logout(context) {
      if (context.getters["getAdminState"] === true) {
        document.cookie = "tokenProvided=false; Secure";
        context.commit("adminLogout");
        return;
      }
      document.cookie = "tokenProvided=false; Secure";
      context.commit("logout");

      this.dispatch("Cart/resetCartFron", {
        root: true,
      });
    },
    async fetchLastUsedUserAddress(context, payload) {
      try {
        context.commit("setLastUsedUserAddress", payload);
        const token = context.rootGetters["UserAuth/getToken"] || null;
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        if (token) {
          requestHeaders.append("Authorization", `Bearer ${token}`);
        }
        const payloadForServer = {
          token,
          address: payload,
        };

        const responseFromServer = await fetch(
          "http://localhost:3000/updateDefaultUserAddress",
          {
            method: "POST",
            headers: requestHeaders,
            body: await JSON.stringify(payloadForServer),
            credentials: "include",
          }
        );

        if (responseFromServer.status !== 200) {
          throw new Error("Server did not saved last used user address");
        }
      } catch (err) {
        console.log(err);
      }
    },
    setLastUsedUserAddress(context, payload) {
      context.commit("setLastUsedUserAddress", payload);
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
