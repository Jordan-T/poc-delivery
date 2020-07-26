<template>
  <div class="p-prepa">
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <component
            class="p-prepa__main"
            :is="Component"
            :key="type"
            :items="viewItems"
            @newItems="generateNew"
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

const DISHES = [
  'Poulet nouilles Teriyaki',
  'Le poke bowl saumon',
  'La salade niçoise',
  'Lasagnes',
]

const DESSERTS = [
  'Mousse au chocolat',
  'Brownie',
  'Cookie',
]

const DRINKS = [
  'Coca cola',
  'Coca cola zero',
  'Fanta',
  'Eau',
]

const CUTLERIES = [
  'Jetables',
  'Réutilisable',
]

const BREADS = [
  'pain'
]

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateInternalItems = (items, min = 0, max = items.length - 1) => {
  const internalItems = [...items]
  const nbItems = randomInt(min, max)
  const newItems = []

  for (let i = 0; i < nbItems; i++) {
    const item = internalItems.splice(randomInt(0, internalItems.length - 1), 1)[0]
    newItems.push({
      name: item,
      quantity: randomInt(1, 2)
    })
  }

  return newItems
}

const generateItems = () => (
  new Array(54)
    .fill({})
    .map((_, index) => ({
      title: `NOC ${index + 1}`,
      canceled: index === 2,
      closed: index === 2,
      items: {
        dishes: generateInternalItems(DISHES, 1, 3),
        desserts: generateInternalItems(DESSERTS, 0, 2),
        drinks: generateInternalItems(DRINKS, 0, 2),
        grocery: [],
        cutleries: generateInternalItems(CUTLERIES, 0, 1),
        breads: generateInternalItems(BREADS, 0, 1),
        cards: [],
        goodies: []
      }
    })))

export default {
  components: {
    PrepaSlider,
    TheStatusBar
  },
  data() {
    const items = generateItems()

    return {
      items
    }
  },
  computed: {
    type() {
      return this.$route?.params?.type || ''
    },
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
      switch (this.type) {
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
    },
    generateNew() {
      console.trace('END')
      this.items = generateItems()
    }
  },
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

.fade-enter-active {
  transition: opacity .3s ease-out;
}
.fade-leave-active {
  transition: opacity .15s ease-out;
}
.fade-enter-from,
.fade-leave-from {
  opacity: 0;
}
</style>