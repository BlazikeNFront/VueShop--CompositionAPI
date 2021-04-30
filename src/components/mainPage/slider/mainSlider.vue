<template>
  <div class="sliderContainer">
    <h2>Latest Gear</h2>
    <ul>
      <li>
        <p class="sliderContainer__para sliderContainer__para--normal">RODS</p>
        <img
          class="sliderItem_visible"
          src="../../../assets/rodCategoryImage.jpg"
          alt="picture of fishing rod"
        />
        <p class="sliderContainer__para sliderContainer__para--hover">RODS</p>
        <router-link class="sliderContainer__link" :to="rodsLink"
          >Discover</router-link
        >
      </li>
      <li>
        <div>
          <p class="sliderContainer__para sliderContainer__para--normal">
            REELS
          </p>
        </div>
        <img
          class="sliderItem1"
          src="../../../assets/reelsCategoryImage.jpg"
          alt="picture of fishing reel"
        />
        <p class="sliderContainer__para sliderContainer__para--hover">REELS</p>
        <router-link class="sliderContainer__link" :to="reelsLink"
          >Discover</router-link
        >
      </li>
      <li>
        <div>
          <p class="sliderContainer__para sliderContainer__para--normal">
            LURES
          </p>
        </div>
        <img
          class="sliderItem1"
          src="../../../assets/luresCategoryImage.jpg"
          alt="picture of fishing reel"
        />
        <p class="sliderContainer__para sliderContainer__para--hover">LURES</p>
        <router-link class="sliderContainer__link" :to="luresLink"
          >Discover</router-link
        >
      </li>
      <li>
        <div>
          <p class="sliderContainer__para sliderContainer__para--normal">
            LINES
          </p>
        </div>
        <img
          class="sliderItem1"
          src="../../../assets/lineCategoryImage.jpg"
          alt="picture of fishing reel"
        />
        <p class="sliderContainer__para sliderContainer__para--hover">LINES</p>
        <router-link class="sliderContainer__link" :to="linesLink"
          >Discover</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    rodsLink() {
      return {
        name: "search-for-product",
        params: {
          searchQuery: "rod",
        },
        query: {
          page: 1,
        },
      };
    },
    reelsLink() {
      return {
        name: "search-for-product",
        params: {
          searchQuery: "reel",
        },
        query: {
          page: 1,
        },
      };
    },
    luresLink() {
      return {
        name: "search-for-product",
        params: {
          searchQuery: "lure",
        },
        query: {
          page: 1,
        },
      };
    },
    linesLink() {
      return {
        name: "search-for-product",
        params: {
          searchQuery: "line",
        },
        query: {
          page: 1,
        },
      };
    },
  },
};
</script>
<style lang='scss'>
.sliderContainer {
  width: 100%;
  height: 100%;
  font-family: $secondaryFont;

  h2 {
    position: relative;
    margin-bottom: 2rem;
    font-family: $secondaryFont;
    font-size: 4rem;
    font-weight: 800;
    text-align: right;
    color: black;

    &::before {
      content: "Discover";
      position: absolute;
      top: -2rem;
      right: 0;
      font-size: 2rem;
      color: gray;
    }
  }
  ul {
    @include flexLayout;
    height: 50rem;
    border-radius: 30px;
    justify-content: initial;
    flex-direction: column;
    overflow: hidden;
  }
  li {
    position: relative;
    width: 100%;
    height: inherit;
    background-color: black;
    overflow: hidden;
    cursor: pointer;
    transition: all 1s ease;

    img {
      opacity: 0.4;
    }
    &:hover {
      & img {
        opacity: 0.4;
      }
      .sliderContainer__para--normal {
        transform: translate(-50rem, -50%);
      }
      .sliderContainer__para--hover {
        transform: translate(-50%, -50%);
      }
      a {
        transform: translate(-50%, -50%);
      }
    }

    img {
      width: 100%;
      height: 100%;
      background-color: black;
      object-fit: cover;
    }
  }
}
.sliderContainer__para {
  display: block;
  position: absolute;
  font-family: $secondaryFont;
  font-size: 5rem;
  font-weight: 600;
  color: white;
  z-index: 100;
  transition: all 0.6s;
}
.sliderContainer__para--normal {
  margin-left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.sliderContainer__para--hover {
  display: none;
  top: 10rem;
  margin-left: 50%;
  transform: translate(-50rem, -50%);
  font-size: 5rem;
}
.sliderContainer__link {
  @include centerAbsolute;
  display: block;
  width: 23rem;
  text-decoration: none;
  transform: translate(-50rem, -50%);
  font-family: $secondaryFont;
  font-weight: 800;
  color: $light-blue;
  font-size: 5rem;
  letter-spacing: 2px;
  z-index: 100;
  transition: all 0.6s;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 58%;
    left: -4rem;
    width: 4rem;
    height: 0.2rem;
    background-color: $light-blue;
    transition: 0.2s all ease-in-out;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 58%;
    right: -4rem;
    width: 4rem;
    height: 0.2rem;
    background-color: $light-blue;
    transition: 0.2s all ease-in-out;
  }
  &:hover {
    color: $light-blue;
    transform: translate(1rem, -50%);
    &::before {
      width: 4rem;
      background-color: $light-blue;
    }
    &::after {
      width: 4rem;
      background-color: $light-blue;
    }
  }
}
@media (min-width: 768px) {
  .sliderContainer {
    width: 95%;
    ul {
      flex-direction: row;

      li {
        width: 25%;
        p {
          font-size: 4rem;
        }
        img {
          opacity: 0.4;
        }
        &:hover {
          width: 70%;
          img {
            opacity: 1;
          }
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .sliderContainer {
    width: 100rem;
    ul {
      li {
        p {
          display: block;
          font-size: 5rem;
        }
      }
    }
  }
  .sliderContainer__para--hover {
    display: block;
    font-size: 8rem;
    color: black;
    -webkit-text-stroke: 1px white;
  }

  .sliderContainer__link {
    &::before {
      width: 0rem;
    }

    &:hover {
      &::before {
        width: 4rem;
      }
      &::after {
        width: 0rem;
      }
    }
  }
}
@media (min-width: 1440px) {
  .sliderContainer {
    width: 100%;
  }
}
</style>