import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import useToken from "../hooks/logger.js";
export default function useUserOrders() {
  const { token } = useToken();
  const route = useRoute();
  const router = useRouter();
  const store = useStore();

  const selectedOrder = ref(null);
  const showOrderDetails = ref(false);
  const numberOfPages = ref(null);
  const orders = ref([]);
  const loader = ref(false);
  const orderClicked = ref(false);

  const currentPage = computed(() => {
    return route.query.page;
  });
  function setOrderClicked() {
    orderClicked.value = true;
  }

  function handleChangePageRequest(page) {
    if (page < 1 || page > numberOfPages.value) {
      return;
    }
    router.push({
      name: route.name.value,
      query: { page },
    });
    if (route.name === "admin-orders") {
      fetchOrdersAsAdmin(page);
    } else {
      fetchOrdersAsUser(page);
    }
  }

  function updateSelectedOrder(order) {
    selectedOrder.value = order;
    showOrderDetails.value = true;
  }
  function getOrderStatus(status) {
    if (status === 0) {
      return "Waiting for acceptance";
    } else if (status === 1) {
      return "In realization";
    } else {
      return "Realized";
    }
  }
  function calculateValue(cart) {
    const value = cart.reduce(
      (acc, element) => (acc += element.price * element.quantity),
      0
    );
    return value.toFixed(2);
  }
  async function fetchOrdersAsUser(page) {
    try {
      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");
      if (token.value) {
        requestHeaders.append("Authorization", `Bearer ${token.value}`);
      }

      const rawData = await fetch(
        `https://vueshopcompback.herokuapp.com/getUserOrders?page=${page}`,
        {
          headers: requestHeaders,
          credentials: "include",
        }
      );
      if (rawData.status !== 200) {
        throw new Error("Couldnt fetched data from server");
      }
      if (rawData.status !== 200) {
        throw new Error("Couldnt fetched data from server");
      }
      const ordersData = await rawData.json();

      const { data, totalItems } = ordersData;
      numberOfPages.value = Math.ceil(totalItems / 10);
      orders.value = data;
    } catch (err) {
      console.log(err);
      store.dispatch("ModalHandler/showModal", err.message);
    }
  }
  async function fetchOrdersAsAdmin(page) {
    try {
      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      if (token.value) {
        requestHeaders.append("Authorization", `Bearer ${token.value}`);
      }
      const rawData = await fetch(
        `https://vueshopcompback.herokuapp.com/admin/getOrders?page=${page}`,
        {
          headers: requestHeaders,
          credentials: "include",
        }
      );

      if (rawData.status !== 200) {
        throw new Error("Couldnt fetched data from server");
      }
      const ordersData = await rawData.json();

      const { data, totalItems } = ordersData;
      numberOfPages.value = Math.ceil(totalItems / 10);
      orders.value = data;
    } catch (err) {
      console.log(err);
      store.dispatch("ModalHandler/showModal", err.message);
    }
  }
  return {
    selectedOrder,
    showOrderDetails,
    numberOfPages,
    orders,
    loader,
    orderClicked,
    currentPage,
    setOrderClicked,
    handleChangePageRequest,
    updateSelectedOrder,
    getOrderStatus,
    calculateValue,
    fetchOrdersAsUser,
    fetchOrdersAsAdmin,
  };
}
