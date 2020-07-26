<template>
  <div class="c-prepa-slider">
    <div class="c-prepa-slider__progress">
      {{ currentIndexDisplay }} / {{ items.length }}
    </div>
    <VueAgile
      ref="carousel"
      class="c-prepa-slider__carousel"
      :initial-slide="currentIndex"
      :dots="false"
      :infinite="false"
      :nav-buttons="false"
      @before-change="beforeChange"
      @after-change="afterChange"
    >
      <div 
        v-for="(item, index) in items"
        :key="item.title"
        class="c-prepa-slider__carousel-slide"
      >
        <PrepaCard
          :title="item.title"
          :canceled="item.canceled"
          v-model:closed="item.closed"
          :items="item.items"
          @success="onSuccess(item, index)"
        />
      </div>
      <div
        key="end"
        class="c-prepa-slider__carousel-slide c-prepa-slider__carousel-slide--end"
      >
        <p class="mb-4 is-size-3">THE END</p>
        <button
          v-if="canEnd"
          type="button"
          class="button is-success"
          @click="onEnd"
        >
          Go next
        </button>
        <button
          v-else
          type="button"
          class="button is-warning"
          @click="goToFirstNotClosed"
        >
          Show not closed
        </button>
      </div>
    </VueAgile>
  </div>
</template>

<script lang="ts">
import { VueAgile } from 'vue-agile'
import PrepaCard from './PrepaCard.vue'

export default {
  name: 'PrepaSlider',
  components: {
    PrepaCard,
    VueAgile,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  watch: {
    items: {
      handler(newValue, oldValue) {
        if (oldValue == null
          || newValue.length !== oldValue.length
          || newValue.some((it, index) => it.title !== oldValue[index].title)
        ) {
          this.goToFirstNotClosed()
        }
      },
      immediate: true,
    }
  },
  computed: {
    currentIndexDisplay() {
      return Math.min(this.items.length, this.currentIndex + 1) || 1
    },
    canEnd() {
      return this.items.every(it => it.closed)
    }
  },
  methods: {
    onSuccess(item, index) {
      item.closed = true;
      this.goTo(index + 1);
    },
    goTo(index: number) {
      if (this.$refs.carousel == null) {
        this.currentSlide = index
        return
      }
      this.$refs.carousel.goTo(index)
    },
    beforeChange() {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },
    afterChange(data: {currentSlide: number}) {
      this.currentIndex = data.currentSlide;
    },
    goToFirstNotClosed() {
      const firstIndexNotClosed = this.items.findIndex((it) => !it.closed)
      const nextIndex = firstIndexNotClosed === -1 ? this.items.length : firstIndexNotClosed

      this.goTo(nextIndex)
    },
    onEnd() {
      console.log('AAA')
      this.$emit('newItems')
    }
  },
  activated() {
    this.goToFirstNotClosed()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-prepa-slider {
  &__progress {
    text-align: center;
    margin: 0 0 space(2);
    color: $text-light;
    font-size: $size-small;
  }

  &__carousel {
    flex-grow: 1;
    display: flex;
    align-items: stretch;

    .agile__list {
      display: flex;
      align-items: stretch;
    }

    &-slide {
      align-self: stretch;
      padding: 0 $gap;

      &--end {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
  }
}
</style>