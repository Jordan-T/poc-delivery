<template>
  <div class="c-status-bar">
    <TheStatusBarItem
      :number="40"
      title="Fermés"
      active
    />
    <TheStatusBarItem
      :number="10"
      title="Restants"
      tooltip
    />
    <TheStatusBarItem
      :number="5"
      title="Rupture"
      tooltip
    />
    <TheStatusBarItem
      :number="1"
      title="Annulés"
      tooltip
    />
  </div>
</template>

<script>
import TheStatusBarItem from './TheStatusBarItem.vue'

export default {
  name: 'TheStatusBar',
  components: {
    TheStatusBarItem
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-status-bar {
  display: flex;
  align-items: stretch;
  text-align: center;
}
</style>