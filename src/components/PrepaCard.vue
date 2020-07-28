<template>
  <div
    class="c-prepa-card"
    :class="{
      'c-prepa-card--warning': canceled
    }"
  >
    <div class="c-prepa-card__header">
      {{ title }}
      <div
        v-if="canceled"
        class="c-prepa-card__header-info"
      >
        Commande annulée
      </div>
    </div>
    <div class="c-prepa-card__main">
      <template v-if="closed">
        <div class="c-prepa-card__closed">
          <template v-if="canceled">Annulé</template>
          <template v-else>Fermé</template>
        </div>
        <div class="c-prepa-card__actions buttons">
          <BaseButton
            type="is-success"
            @click="onShow"
          >
            Afficher le contenu
          </BaseButton>
        </div>
      </template>
      <template v-else>
        <div class="c-prepa-card__grid">
          <div
            v-for="item in internalItems"
            :key="item.title"
            class="c-prepa-card__grid-item"
          >
            <div class="c-prepa-card__grid-item-title">{{ item.title }}</div>
            <ul class="c-prepa-card__grid-item-list">
              <li v-for="it in item.items" :key="it.name">
                <span v-if="it.quantity > 1 || item.alwaysQuantity">{{ it.quantity }}x</span>
                {{ it.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="c-prepa-card__actions buttons">
          <template v-if="canceled">
            <BaseButton
              type="is-success"
              @click="onHide"
            >
              Masquer le contenu
            </BaseButton>
          </template>
          <template v-else>
            <BaseButton
              type="is-danger"
            >
              Rupture
            </BaseButton>
            <BaseButton
              type="is-success"
              @click="onSuccess"
            >
              Sac fermé
            </BaseButton>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from './BaseButton.vue'

export default {
  name: 'PrepaCard',
  components: {
    BaseButton,
  },
  props: {
    title: String,
    canceled: Boolean,
    closed: Boolean,
    items: Object
  },
  computed: {
    internalItems() {
      return [
        {
          title: 'Plats',
          alwaysQuantity: false,
          items: this.items.dishes,
        },
        {
          title: 'Desserts',
          alwaysQuantity: false,
          items: this.items.desserts,
        },
        {
          title: 'Boissons',
          alwaysQuantity: false,
          items: this.items.drinks,
        },
        {
          title: 'Epicerie',
          alwaysQuantity: false,
          items: this.items.grocery,
        },
        {
          title: 'Couvers',
          alwaysQuantity: true,
          items: this.items.cutleries,
        },
        {
          title: 'Pain',
          alwaysQuantity: true,
          items: this.items.breads,
        },
        {
          title: 'Carte',
          alwaysQuantity: false,
          items: this.items.cards,
        },
        {
          title: 'Goodies',
          alwaysQuantity: false,
          items: this.items.goodies,
        },
      ]
    }
  },
  methods: {
    onShow() {
      this.$emit('update:closed', false)
    },
    onHide() {
      this.$emit('update:closed', true)
    },
    onSuccess() {
      this.$emit('success')
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-prepa-card {
  border: solid 2px $grey-lighter;
  background: $white-ter;
  border-radius: $radius-large;
  color: $black;

  &__header {
    margin: space(3);
    text-align: center;
    font-size: $size-large;
    line-height: 1.15;

    &-info {
      font-size: $size-small;
    }
  }
  
  &__main {
    margin: 0 -2px -2px;
    border: solid 1px $grey-lighter;
    border-radius: $radius-large;
    color: $text;
    background: $white;
  }

  &__closed {
    padding: space(6) space(3);
    text-align: center;
    text-transform: uppercase;
    font-size: $size-3;
    border-bottom: solid 1px $grey-lighter;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: -1px;
    border-radius: $radius-large $radius-large 0 0;
    border-bottom: solid 1px $grey-lighter;
    overflow: hidden;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      border-top: solid 1px $grey-lighter;
      border-right: solid 1px $grey-lighter;
      padding: space(2) space(2) space(3);

      &:last-child:nth-child(2n+1) {
        grid-column: span 2;
      }

      &-title {
        font-size: $size-small;
        color: $text-light;
        margin-bottom: space(1);
        font-weight: $weight-bold;
      }

      &-list {
        margin: auto;
      }

      li {
        line-height: 1.15;
        font-weight: $weight-bold;

        + li {
          margin-top: space(2);
        }
      }

    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin: space(0) space(0);

    .button {
      flex-grow: 1;
      flex-basis: 0;
      max-width: 60%;
      margin: space(3) space(3);
    }
  }

  &--warning {
    background: $warning;
    color: $warning-invert;
  }
}
</style>