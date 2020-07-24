<template>
  <button class="c-status-bar-item" :class="{'c-status-bar-item--tooltip': tooltip, 'c-status-bar-item--active': active}" type="button">
    <span class="c-status-bar-item__number">{{ number }}</span>
    <span class="c-status-bar-item__title">{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'TheStatusBarItem',
  props: {
    number: Number,
    title: String,
    active: Boolean,
    tooltip: Boolean,
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-status-bar-item {
  flex-grow: 1;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: var(--grey-100);
  color: var(--grey-400);
  line-height: 1.1;
  padding: space(3) space(2);

  &:hover,
  &:focus {
    background: var(--grey-200);
  }

  &__number {
    font-size: $size-large;
  }

  &__title {
    font-size: $size-small;
  }

  &--tooltip {
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 1em;
      height: 1em;
      margin: -.5em;
      font-size: .75rem;
      border-radius: 50%;
      background: var(--danger);
    }
    &::before {
      transform: scale(1.75);
      background: inherit;
      z-index: -1;
    }
  }

  &--active {
    color: var(--grey-800)
  }
}
</style>