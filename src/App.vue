<template>
  <div class="l-base">
    <TheHeader class="l-base__header" />
    <main class="l-base__main">
      <PrepaCard class="mb-5" />
      <PrepaCard class="mb-5" />
      <PrepaCard class="mb-5" />
    </main>
    <TheStatusBar class="l-base__status" />
  </div>
</template>

<script>
import PrepaCard from './components/PrepaCard.vue'
import TheHeader from './components/TheHeader.vue'
import TheStatusBar from './components/TheStatusBar.vue'

export default {
  name: 'App',
  components: {
    PrepaCard,
    TheHeader,
    TheStatusBar,
  }
}
</script>

<style lang="scss">
@import "./assets/scss/_imports.scss";

.l-base {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  &__header,
  &__status {
    flex-shrink: 0;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  &__header {
    background: linear-gradient(to bottom, $body-background-color, $body-background-color 80%, transparent);
  }

  &__main {
    flex-grow: 1;
    padding: 0 space(4);
  }

  &__status {
    top: auto;
    bottom: 0;
    margin-top: space(4);
  }
}
</style>
