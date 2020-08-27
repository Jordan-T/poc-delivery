<template>
  <div class="c-header">
    <BaseButton
      class="c-header__button"
      :class="[showNav && 'c-header__button--active']"
      rounded
      @click="toggleNav"
    >
      M
    </BaseButton>
    <BaseButton
      class="c-header__button c-header__button--main"
      :class="[showItinerary && 'c-header__button--active']"
      rounded
      @click="toggleItinerary"
    >
      INTINERAIRE
    </BaseButton>
    <BaseButton
      class="c-header__button"
      :class="[showSearch && 'c-header__button--active']"
      rounded
      @click="toggleSearch"
    >
      S
    </BaseButton>

    <TheHeaderDrawer :show="showNav" position="left">
      <h1>The nav</h1>
      <div class="mt-3">
        <BaseButton
          type="is-primary"
          tag="router-link"
          to="/"
          rounded
          @click="toggleNav"
        >
          Prepa
        </BaseButton>
      </div>

      <div class="mt-3">
        <BaseButton
          type="is-primary"
          tag="router-link"
          to="/livraison"
          rounded
          @click="toggleNav"
        >
          Livraison
        </BaseButton>
      </div>

      <div class="mt-6">
        <BaseButton rounded @click="toggleTheme"> Switch theme </BaseButton>
      </div>
    </TheHeaderDrawer>

    <TheHeaderDrawer :show="showItinerary">
      <h1>Itinéraires</h1>
    </TheHeaderDrawer>

    <TheHeaderDrawer :show="showSearch" position="right">
      <h1>Search</h1>
    </TheHeaderDrawer>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import TheHeaderDrawer from "./TheHeaderDrawer.vue";

export default {
  name: "TheHeader",
  components: {
    BaseButton,
    TheHeaderDrawer,
  },
  data() {
    return {
      showNav: false,
      showItinerary: false,
      showSearch: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
    toggleItinerary() {
      this.showItinerary = !this.showItinerary;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    toggleTheme() {
      document.documentElement.classList.toggle("dark-mode");
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-header {
  display: flex;
  align-items: center;
  padding: space(3) $gap;

  &__button {
    &.button {
      // fix css order import
      width: $control-height;
      height: $control-height;
      position: relative;
      z-index: 1;
      transition: 150ms, z-index 1ms 300ms;
    }

    &--main {
      &.button {
        // fix css order import
        flex-grow: 1;
        margin: 0 space(4);
        width: auto;
        justify-content: flex-start;
      }
    }

    &--active {
      &.button {
        // fix css order import
        z-index: 3;
        transition: 150ms, z-index 1ms;
      }
    }
  }
}
</style>
