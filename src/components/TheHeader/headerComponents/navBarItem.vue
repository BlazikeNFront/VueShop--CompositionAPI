<template>
  <li
    class="mainNavList__item"
    :class="{ letterSpacing: isShortTitle }"
    @click="searchAction(this.title)"
  >
    {{ this.title }}
    <ul class="mainNavList__subList">
      <li>{{ this.title }}</li>
      <!-- i want to same color gradient continues in sublist item, so to achive that  sublist works like popUp replaceing original nav -->
      <li
        v-for="element in this.listElements"
        :key="element"
        @click.stop="searchAction(this.title, element)"
      >
        {{ element }}
      </li>
    </ul>
  </li>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["title"],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const listElement = ref(["Rods", "Reels", "Lines", "Other"]);
    const isShortTitle = computed(() => {
      if (props.title.length < 9) {
        return true;
      } else {
        return false;
      }
    });
    function searchAction(title, element) {
      const category = title.split(" ")[0];

      let query;
      if (element) {
        query = category + " " + element;
      } else {
        query = category;
      }

      const payload = {
        query: query,
        page: 1,
      };

      store.dispatch("UserSearch/handleSearchRequest", payload);
      router.push({
        name: "search-for-product",
        params: { searchQuery: payload.query },
        query: { page: 1 },
      });
    }
    return { listElement, isShortTitle, searchAction };
  },
};
</script>
<style lang='scss'>
.mainNavList__item {
  @include bluesGradient;
  position: relative;
  margin: 0 0.5rem;
  padding: 1rem 0;
  width: 9rem;
  border-radius: 10px 10px 0 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  z-index: 10000;

  li {
    padding: 1rem;
    width: 100%;
    font-size: 1.2rem;
  }
  li:nth-child(1) {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
.mainNavList__subList {
  @include flexLayout;
  @include centerWithTranslate;
  @include bluesGradient;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 50%;
  font-size: 1.5rem;
  width: 9rem;
  height: 18rem;
  border-radius: 0 0 5px 5px;
  flex-direction: column;
  font-size: 1.5rem;
  color: white;
  transition: all 0.5s ease;

  li {
    position: relative;
    border-radius: 10px;
  }
  li::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 1px;
    left: 50%;
    width: 70%;
    height: 0.1rem;
    transform: translate(-50%);
    background-color: white;
  }
}
.mainNavList__item:hover {
  .mainNavList__subList {
    display: block;
  }
  li {
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      font-weight: 700;

      &::after {
        background-color: #bdbb40;
      }
    }
  }
}
.letterSpacing {
  letter-spacing: 2px;
}
@media (min-width: 1024px) {
  .mainNavList__item {
    width: 20rem;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .mainNavList__subList {
    width: 20rem;
  }
  .mainNavList__item li:nth-child(1) {
    font-size: 1.4rem;
  }
}
</style>