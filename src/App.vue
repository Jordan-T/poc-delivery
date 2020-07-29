<template>
  <div class="l-base">
    <TheHeader class="l-base__header" />
    <main class="l-base__main">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TheHeader from './components/TheHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
  },
})
</script>

<style lang="scss">
@import "./assets/scss/_imports.scss";

.l-base {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  &__header {
    flex-shrink: 0;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(to bottom, $body-background-color, $body-background-color 80%, transparent);
  }

  &__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
