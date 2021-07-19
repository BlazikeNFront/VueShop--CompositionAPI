<template>
  <section class="containerForMainImg">
    <div class="containerForMainImg__InfoDisplay">
      <div class="containerForMainImg__text">
        <img src="../../../assets/img/savagearLogo.png" alt="savagear logo" />

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </p>
        <router-link :to="redirectToSearchPage">
          CLICK HERE TO CHECK IT OUT
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    redirectToSearchPage() {
      return {
        name: "search-for-product",
        params: { searchQuery: "savage" },
        query: { page: 1 },
      };
    },
  },
};
</script>
<style lang='scss'>
.containerForMainImg {
  position: relative;
  width: 100%;
  height: 80rem;
  background-image: url("../../../assets/img/mainInformationBackgroundWebp.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.containerForMainImg__text {
  @include flexLayout;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 130rem;
  height: 80%;
  transform: translate(-50%, -50%);
  border: 4px solid $chartrouse-color;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 1);
  background-image: url("../../../assets/img/mainInformationBoxPicure.jpg");
  background-position-y: 7rem;
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  animation: 0.5s ease-in 1s 1 normal both running mainInformationBoxAppearence;

  h1 {
    font-family: $secondaryFont;
    font-size: 5rem;
    font-weight: 800;
    color: $primary-color;
  }
  img {
    width: 90%;
    height: 40%;
    max-width: 50rem;
    max-height: 12rem;
    object-fit: cover;
  }
  p {
    margin-top: 18rem;
    width: 90%;
    font-family: $secondaryFont;
    font-size: $font-md;
    color: white;
  }
  a {
    display: block;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: $orange-color;
    text-shadow: 0 0 3px $orange-color;
    font-family: $mainInformationBoxLinkFont;
    text-decoration: none;
    &:hover {
      text-shadow: 0 0 5px $orange-color;
    }
  }
}
@media (min-width: 425px) {
  .containerForMainImg__text {
    p {
      margin-top: 25rem;
    }
  }
}
@media (min-width: 768px) {
  .containerForMainImg__text {
    background-position-y: -4rem;
    p {
      margin-top: 37rem;
    }
  }
}
@media (min-width: 1024px) {
  .containerForMainImg {
    background-attachment: fixed;
  }
  .containerForMainImg__text {
    height: 90%;
    background-position-y: -12rem;
    p {
      margin-top: 42rem;
    }
  }
}
@media (min-width: 1440px) {
  .containerForMainImg__text {
    height: 90%;
    background-position-x: -4rem;
    background-position-y: -10rem;
    p {
      margin-top: 0rem;
      margin-right: 1rem;
      font-size: 2rem;
      width: 35%;
      align-self: flex-end;
    }
    a {
      margin-bottom: 10rem;
      width: 50%;
      align-self: flex-end;
      font-size: 4rem;
    }
  }
}
@keyframes mainInformationBoxAppearence {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>