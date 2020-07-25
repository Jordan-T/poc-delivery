<template>
  <div class="c-prepa-slider">
    <div class="c-prepa-slider__progress">{{ currentIndex + 1 }} / {{ items.length }}</div>
    <VueAgile
      ref="carousel"
      class="c-prepa-slider__carousel"
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
          @success="onSuccess(item, index)"
        />
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
  methods: {
    onSuccess(item, index) {
      item.closed = true;
      this.goTo(index + 1);
    },
    goNext() {
      this.$refs.carousel.goToNext()
    },
    goTo(index: number) {
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

      this.goTo(firstIndexNotClosed === -1 ? 1 : firstIndexNotClosed)
    }
  },
  mounted() {
    this.goToFirstNotClosed()
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
    &-slide {
      align-self: stretch;
      padding: 0 $gap;
    }
  }
}
</style>