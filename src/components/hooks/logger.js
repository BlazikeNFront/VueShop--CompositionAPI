import { computed } from "vue";
import { useStore } from "vuex";

export default function useToken() {
  const store = useStore();
  const token = computed(() => {
    return store.getters["UserAuth/getToken"];
  });
  const userIsAdmin = computed(() => {
    return store.getters["UserAuth/getAdminState"];
  });

  return { token, userIsAdmin };
}
