<template>
  <div
    class="c-header-drawer"
    :class="[
      show && 'c-header-drawer--show',
      position && `c-header-drawer--${position}`,
    ]"
  >
    <div class="c-header-drawer__main">
      <slot />
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'TheHeader',
  components: {
    BaseButton
  },
  props: {
    show: Boolean,
    /** @values '', left, right */
    position: String,
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-header-drawer {
  $clip-radius: $control-height / 2;
  $clip-at-top: calc(#{space(4)} + #{$clip-radius});
  $clip-at: var(--drawer-start-position);
  --drawer-start-position: #{50% $clip-at-top};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: $white-ter;
  font-size: $size-normal;
  padding: space(6) $gap space(3);
  clip-path: circle(#{$clip-radius} at #{$clip-at});
  transition: 250ms ease 50ms;
  visibility: hidden;
  pointer-event: none;

  &__main {
    opacity: 0;
    transition: 250ms ease;
    transform: translate(0, -7vh);
  }

  &--left {
    --drawer-start-position: #{calc(#{space(3)} + #{$clip-radius}) #{$clip-at-top}};

    .c-header-drawer {
      &__main {
        transform: translate(-7vw, -7vh);
      }
    }
  }

  &--right {
    --drawer-start-position: #{calc(100% - #{space(3)} - #{$clip-radius}) #{$clip-at-top}};

    .c-header-drawer {
      &__main {
        transform: translate(7vw, -7vh);
      }
    }
  }

  &--show {
    z-index: 1;
    clip-path: circle(calc(75vh + 75vw) at #{$clip-at});
    visibility: visible;
    transition: 300ms ease;
    pointer-event: default;

    .c-header-drawer {
      &__main {
        opacity: 1;
        transition: 300ms ease 100ms;
        transform: translate(0, 0);
      }
    }
  }
}
</style>