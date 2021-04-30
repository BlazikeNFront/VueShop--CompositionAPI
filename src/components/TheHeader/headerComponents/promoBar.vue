<template>
  <div class="promoBar">
    <div class="promoBar__mobile"><h3>TAIMEN</h3></div>
    <div class="promoBar__box">
      <div>
        <font-awesome-icon :icon="['fa', 'truck']"></font-awesome-icon>
        <p>Next Day Delivery From $2.99</p>
      </div>
      <div>
        <font-awesome-icon :icon="['fa', 'star']"></font-awesome-icon>
        <font-awesome-icon :icon="['fa', 'star']"></font-awesome-icon>
        <font-awesome-icon :icon="['fa', 'star']"></font-awesome-icon>
        <font-awesome-icon :icon="['fa', 'star']"></font-awesome-icon>
        <font-awesome-icon :icon="['fa', 'star']"></font-awesome-icon>
        <p>More than 30000 Star Service Reviews</p>
      </div>
      <div>
        <font-awesome-icon
          :icon="['fa', 'coins']"
          class="promoBar__icon"
        ></font-awesome-icon>
        <p>Best Choice And Prices</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.promoBar {
  display: block;
  width: 100%;
  background-color: #2d2d2d;
  color: white;
}
.promoBar__mobile {
  @include flexLayout;

  height: 3rem;
  h3 {
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 2rem;
  }
  @media (min-width: 768px) {
    display: none;
  }
}
.promoBar__box {
  @include flexLayout;
  display: none;
  margin: 0 auto;
  width: clamp(57rem, 90%, 100rem);
  @media (min-width: 768px) {
    display: flex;
  }

  div {
    @include flexLayout;
    width: 18rem;
    height: 100%;
    justify-content: space-around;

    p {
      font-weight: 500;
    }
    svg {
      font-size: 1.5rem;
      color: #4aa6c6;
    }
    &:nth-child(2) {
      width: 20rem;
    }
    &:nth-child(3) {
      width: 15rem;
      svg {
        font-size: 2rem; //coins icon looks unproportional smalller than others icons
      }
    }
  }
}
.promoBar__icon {
  font-size: 1.2rem;
  color: #03a49b;
}
</style>
