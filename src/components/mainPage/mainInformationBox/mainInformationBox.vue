<template>
  <section class="containerForMainImg">
    <div class="containerForMainImg__InfoDisplay">
      <div class="containerForMainImg__text">
        <h1>NEW SAVAGE GEAR</h1>
        <img src="../../../assets/savagearLogo.png" alt="savagear logo" />

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </p>
        <router-link :to="'/'">CLICK HERE TO CHECK IT OUT</router-link>
      </div>
    </div>
  </section>
</template>
<script>
</script>
<style lang='scss'>
.containerForMainImg {
  position: relative;
  width: 100%;
  height: 80rem;
  background-image: url("../../../assets/mainInformationBackground.png");
  background-attachment: fixed;
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
  height: 80%;
  transform: translate(-50%, -50%);
  border: 4px solid $chartrouse-color;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.9);
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
    max-width: 40rem;
    max-height: 12rem;
    object-fit: cover;
  }
  p {
    width: 80%;
    height: 30%;
    font-family: $secondaryFont;
    font-size: $font-md;
    color: white;
  }
  a {
    display: block;
    color: #d47304;
    font-family: "Anton", sans-serif;
    font-size: 2rem;
    text-decoration: none;
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