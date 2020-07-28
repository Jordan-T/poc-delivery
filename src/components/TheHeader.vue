<template>
  <div class="c-header">
    <BaseButton
      class="c-header__button"
      rounded
    >
      M
    </BaseButton>
    <BaseButton
      class="c-header__button c-header__button--main"
      rounded
    >
      INTINERAIRE
    </BaseButton>
    <BaseButton
      class="c-header__button"
      rounded
      @click="toggleTheme"
    >
      S
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'TheHeader',
  components: {
    BaseButton
  },
  methods: {
    toggleTheme() {
      document.documentElement.classList.toggle('dark-mode')
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-header {
  display: flex;
  align-items: center;
  padding: space(3) space(4);

  &__button {
    width: $control-height;
    height: $control-height;

    &--main {
      flex-grow: 1;
      margin: 0 space(4);
      width: auto;
      justify-content: flex-start;
    }
  }
}
</style>