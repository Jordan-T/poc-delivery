<template>
  <div class="c-header">
    <button class="c-header__button" type="button">M</button>
    <button class="c-header__button c-header__button--main">INTINERAIRE</button>
    <button class="c-header__button" type="button">S</button>
  </div>
</template>

<script>
  export default {
    
  };
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-header {
  display: flex;
  align-items: center;
  padding: space(3) space(4);

  &__button {
    @extend %control;
    border-radius: 999px;
    color: var(--grey-500);
    background: var(--grey-200);
    width: $control-height;
    height: $control-height;
    justify-content: center;

    &--main {
      flex-grow: 1;
      margin: 0 space(4);
      width: auto;
      justify-content: flex-start;
    }
  }
}
</style>