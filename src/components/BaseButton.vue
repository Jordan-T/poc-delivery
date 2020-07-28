<template>
  <component
    :is="component"
    :to="to"
    :type="nativeType"
    class="button"
    :class="[
      type,
      size,
      rounded && 'is-rounded',
    ]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    href: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null,
      validator: (value) => [null, 'is-success', 'is-warning', 'is-danger'].includes(value)
    },
    nativeType: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    size: {
      type: String,
      default: null,
      validator: (value) => [null, 'is-small', 'is-medium', 'is-large'].includes(value)
    },
    rounded: {
      type: Boolean,
    }
  },
  computed: {
    component() {
      if (this.to !== null) {
        return 'RouterLink'
      }
      if (this.href !== null) {
        return 'a'
      }
      return 'button'
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.button {
  border-radius: $radius;
  font-size: $size-normal;
  color: $black;
  background-color: $grey-lighter;
  cursor: pointer;
  justify-content: center;
  padding-bottom: .5em;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: .5em;
  text-align: center;
  white-space: nowrap;

  &:focus,
  &:hover {
    opacity: .9;
  }

  &:active {
    opacity: .8;
  }

  // types
  &.is-danger {
    color: $danger-invert;
    background: $danger;
  }
  
  &.is-success {
    color: $success-invert;
    background: $success;
  }
  
  &.is-warning {
    color: $warning-invert;
    background: $warning;
  }

  // sizes
  &.is-small {
    font-size: $size-small;
  }
  
  &.is-medium {
    font-size: $size-medium;
  }

  &.is-large {
    font-size: $size-large;
  }

  // specifics
  &.is-rounded {
    border-radius: $radius-rounded;
  }
}
</style>