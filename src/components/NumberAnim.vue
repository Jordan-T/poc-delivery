<template>
  <span>
    <transition
      :name="transitionName"
      :css="!!transitionName"
      @after-leave="onEnd"
    >
      <span 
        v-if="oldValue !== internalValue"
        :key="internalValue"
        class="number"
        :class="[horizontal && 'is-horizontal']"
      >{{ internalValue }}</span>
      <span
        v-else
        :key="internalValue"
        class="number"
        :class="[horizontal && 'is-horizontal']"
      >{{ internalValue }}</span>
    </transition>
  </span>
</template>

<script lang="ts">
export default {
  name: 'NumberAnim',
  props: {
    value: Number,
    horizontal: Boolean
  },
  data() {
    return {
      internalValue: this.value,
      oldValue: this.value,
      invert: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (oldValue == null) {
        this.oldValue = newValue
        return
      }
      this.invert = oldValue > newValue
      this.internalValue = newValue
      this.oldValue = oldValue
    }
  },
  computed: {
    animate() {
      return this.internalValue !== this.oldValue
    },
    transitionName() {
      if (!this.animate) {
        return ''
      }
      return this.invert
        ? 'number-down'
        : 'number-up'
    }
  },
  methods: {
    onEnd() {
      this.oldValue = this.internalValue
    }
  }
}
</script>

<style lang="scss">
.number {
  display: inline-block;
  transform: translateY(0);
}

.number-up,
.number-down {
  &-enter-active,
  &-leave-active {
    transition: all .25s ease-out .05s;
  }
  
  &-leave-active {
    position: absolute;
    transition-delay: 0s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.number-up-enter-from,
.number-down-leave-to {
  transform: translateY(.75em);
}
.number-up-leave-to,
.number-down-enter-from {
  transform: translateY(-.75em);
}
.number.is-horizontal {
  &.number-up-enter-from,
  &.number-down-leave-to {
    transform: translateX(.75em);
  }
  &.number-up-leave-to,
  &.number-down-enter-from {
    transform: translateX(-.75em);
  }
}
</style>