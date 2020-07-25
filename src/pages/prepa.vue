<template>
  <div class="p-prepa">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component
            class="p-prepa__main"
            :is="Component"
            :items="viewItems"
          />
        </keep-alive>
      </transition>
    </router-view>

    <TheStatusBar
      class="p-prepa__status"
      :complete="complete.length"
      :complete-notif="false"
      :rest="rest.length"
      :rest-notif="false"
      :rupture="rupture.length"
      :rupture-notif="false"
      :canceled="canceled.length"
      :canceled-notif="true"
    />
  </div>
</template>

<script lang="ts">
import PrepaSlider from '../components/PrepaSlider.vue'
import TheStatusBar from '../components/TheStatusBar.vue'

export default {
  components: {
    PrepaSlider,
    TheStatusBar
  },
  data() {
    const items = (new Array(54)).fill({}).map((_, index) => ({
      title: `NOC ${index + 1}`,
      canceled: index === 2,
      closed: index === 2,
    }))

    return {
      items
    }
  },
  computed: {
    complete() {
      return this.items.filter(it => it.closed && !it.canceled)
    },
    canceled() {
      return this.items.filter(it => it.canceled)
    },
    rupture() {
      return []
    },
    rest() {
      return this.items.filter(it => !it.closed && !it.canceled)
    },
    viewItems() {
      switch (this.$route.params.type) {
        case 'complete':
          return this.complete;
        case 'canceled':
          return this.canceled;
        case 'rupture':
          return this.rupture;
        case 'rest':
          return this.rest;
        default:
          return this.items
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.p-prepa {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  &__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: space(4);
  }

  &__status {
    flex-shrink: 0;
    width: 100%;
    position: sticky;
    z-index: 5;
    bottom: 0;
  }

}
</style>