<template>
  <div class="c-status-bar">
    <TheStatusBarItem
      :number="complete"
      title="Fermés"
      :tooltip="completeNotif"
      to="/show/complete"
    />
    <TheStatusBarItem
      :number="rest"
      title="Restants"
      :tooltip="restNotif"
      to="/show/rest"
    />
    <TheStatusBarItem
      :number="rupture"
      title="Rupture"
      :tooltip="ruptureNotif"
      to="/show/rupture"
    />
    <TheStatusBarItem
      :number="canceled"
      title="Annulés"
      :tooltip="canceledNotif"
      to="/show/canceled"
    />
  </div>
</template>

<script>
import TheStatusBarItem from './TheStatusBarItem.vue'

export default {
  name: 'TheStatusBar',
  components: {
    TheStatusBarItem
  },
  props: {
    complete: Number,
    completeNotif: Boolean,
    rest: Number,
    restNotif: Boolean,
    rupture: Number,
    ruptureNotif: Boolean,
    canceled: Number,
    canceledNotif: Boolean,
  }
}
</script>

<style lang="scss">
.c-status-bar {
  display: flex;
  align-items: stretch;
  text-align: center;
}
</style>