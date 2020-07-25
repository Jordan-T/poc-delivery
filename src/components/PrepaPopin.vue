<template>
  <div class="c-prepa-popin">
    <div class="c-prepa-popin__header">
      <div class="c-prepa-popin__title">
        {{ title }}
      </div>
      <RouterLink to="/">X</RouterLink>
    </div>
    <div class="c-prepa-popin__main">
      <div
        v-if="items.length === 0"
        class="c-prepa-popin__empty"
      >
        Liste vide
      </div>
      <PrepaCard 
        v-for="item in items"
        :key='item.title'
        class="mb-5"
        :title="item.title"
        :canceled="item.canceled"
        v-model:closed="item.closed"
        @success="onSuccess(item)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PrepaCard from './PrepaCard.vue'

export default defineComponent({
  name: 'PrepaPopin',
  components: {
    PrepaCard,
  },
  props: {
    items: Array,
    title: String,
  },
  methods: {
    onSuccess(item) {
      item.closed = true
    }
  }
})
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-prepa-popin {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  color: $text;
  background: $white-ter;
  border-radius: $radius-large $radius-large 0 0;
  overflow: auto;
  flex-basis: 0;

  &__header,
  &__main {
    width: 100%;
    padding: 0 $gap;
  }

  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: space(3);
    padding-bottom: space(3);
    background: linear-gradient(to bottom, $white-ter, $white-ter 80%, transparent);
    border-radius: $radius-large $radius-large 0 0;

    a {
      position: relative;
      color: inherit;

      &::after {
        content: '';
        position: absolute;
        top: space(-3);
        right: space(-3);
        bottom: space(-3);
        left: space(-3);
      }
    }
  }

  &__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__empty {
    justify-self: center;
    align-self: center;
    text-align: center;
    font-size: $size-3;
    margin: auto 0;
  }
}
</style>
