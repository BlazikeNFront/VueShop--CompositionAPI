<template>
  <footer class="footer">
    <div class="footerSingleList">
      <h2>COMPANY</h2>
      <ul class="footerSingleList__listBox">
        <li class="footerSingleList__listElement">
          <router-link to="/">About Us</router-link>
        </li>
        <li class="footerSingleList__listElement">
          <router-link to="/">Partners</router-link>
        </li>
        <li class="footerSingleList__listElement">
          <router-link to="/">TAIMEN Support</router-link>
        </li>
        <li class="footerSingleList__listElement">
          <router-link to="/">Terms and condition</router-link>
        </li>
      </ul>
    </div>
    <div class="footerSingleList">
      <h2>ACCOUNT</h2>
      <ul class="footerSingleList__listBox">
        <li class="footerSingleList__listElement">
          <router-link :to="{ name: 'user-login', params: { view: 'login' } }"
            >Sign in</router-link
          >
        </li>
        <li class="footerSingleList__listElement">
          <router-link :to="{ name: 'user-signUp', params: { view: 'signUp' } }"
            >Sign Up</router-link
          >
        </li>
        <li class="footerSingleList__listElement">
          <router-link :to="{ name: 'user-orders' }">Orders</router-link>
        </li>
      </ul>
    </div>
    <div class="footerSingleList">
      <h2>CONTACT US</h2>
      <ul class="footerSingleList__listBox">
        <li class="footerSingleList__listElement">
          <address class="footerSingleList__box">
            <font-awesome-icon
              :icon="['fas', 'map-marker-alt']"
            ></font-awesome-icon>
            <p class="footerSingleList__paragraph">
              2534 London Suite B Downers Grove, IL 60515
            </p>
          </address>
        </li>
        <li class="footerSingleList__listElement">
          <address class="footerSingleList__box">
            <font-awesome-icon
              :icon="['fas', 'envelope']"
              class="envelope_icon"
            ></font-awesome-icon>
            <a
              href="mailto: sales@taimen.com"
              class="footerSingleList__paragraph"
            >
              sales@taimen.com
            </a>
          </address>
        </li>
        <li class="footerSingleList__listElement">
          <address class="footerSingleList__box">
            <font-awesome-icon
              :icon="['fas', 'envelope']"
              class="envelope_icon"
            ></font-awesome-icon>
            <a
              href="mailto:support@taimen.com"
              class="footerSingleList__paragraph"
            >
              support@taimen.com
            </a>
          </address>
        </li>
        <li class="footerSingleList__listElement">
          <address class="footerSingleList__box">
            <font-awesome-icon :icon="['fas', 'phone']"></font-awesome-icon>
            <a href="tel:888-777-666" class="footerSingleList__paragraph"
              >888-777-666</a
            >
          </address>
        </li>
        <li class="footerSingleList__listElement">
          <address class="footerSingleList__box">
            <font-awesome-icon :icon="['fas', 'fax']"></font-awesome-icon>
            <a href="tel:324-534-8824" class="footerSingleList__paragraph"
              >(324) 534-8824</a
            >
          </address>
        </li>
      </ul>
      <div class="icons">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          class="icons__facebookIcon"
        >
          <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          class="icons__twitterIcon"
        >
          <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          class="icons__instagramIcon"
        >
          <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang='scss'>
.footer {
  margin: 0 auto;
  margin-top: 10rem;
  max-width: 130rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: black;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
}
.footerSingleList {
  margin: 3rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.footerSingleList__listBox {
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  a {
    text-decoration: none;
    color: black;
  }
}
.footerSingleList__box {
  @include flexLayout;
  justify-content: left;
}
.footerSingleList__listElement {
  padding: 1rem;
  width: inherit;
  font-size: $font-md;
  text-align: inherit;
  cursor: pointer;
  &:hover {
    color: $primiary-color;
  }
}
.footerSingleList__paragraph {
  margin-left: 0.7rem;
  text-align: left;
}

.icons {
  @include flexLayout;
  margin: 1rem 0;
  width: 100%;
  justify-content: space-around;
  font-size: $font-bg;
  color: black;
  a {
    color: black;
  }
  & * {
    width: 2.5rem;
    cursor: pointer;
  }
}
.icons__facebookIcon:hover {
  :nth-child(1) {
    color: rgb(59, 89, 152);
  }
}
.icons__twitterIcon:hover {
  :nth-child(1) {
    color: rgb(8, 160, 233);
  }
}
.icons__instagramIcon:hover {
  width: 2.5rem;
  border-radius: 50%;
  color: white;
  background: radial-gradient(
      circle farthest-corner at 35% 90%,
      #fec564,
      transparent 50%
    ),
    radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%),
    radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%),
    radial-gradient(
      ellipse farthest-corner at 20% -50%,
      #5258cf,
      transparent 50%
    ),
    radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%),
    radial-gradient(
      ellipse farthest-corner at 60% -20%,
      #893dc2,
      transparent 50%
    ),
    radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent),
    linear-gradient(
      #6559ca,
      #bc318f 30%,
      #e33f5f 50%,
      #f77638 70%,
      #fec66d 100%
    );
}
</style>