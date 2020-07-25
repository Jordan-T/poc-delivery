<template>
  <div class="c-prepa-card">
    <div class="c-prepa-card__header">
      NOC 1
    </div>
    <div class="c-prepa-card__main">
      <div class="c-prepa-card__grid">
        <div
          v-for="item in items"
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
        <button class="button is-danger" type="button">
          Rupture
        </button>
        <button class="button is-success" type="button">
          Sac fermé
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PrepaCard',
  computed: {
    items() {
      return [
        {
          title: 'Plats',
          alwaysQuantity: false,
          items: [
            { name: 'Poulet nouilles Teriyaki', quantity: 1 },
            { name: 'Lorem', quantity: 1 }
          ]
        },
        {
          title: 'Desserts',
          alwaysQuantity: false,
          items: [
            { name: 'Mousse au chocolat', quantity: 1 }
          ]
        },
        {
          title: 'Boissons',
          alwaysQuantity: false,
          items: [
            { name: 'Coca cola zero', quantity: 1 }
          ]
        },
        {
          title: 'Epicerie',
          alwaysQuantity: false,
          items: []
        },
        {
          title: 'Couvers',
          alwaysQuantity: true,
          items: [
            { name: 'Jetables', quantity: 1 }
          ]
        },
        {
          title: 'Pain',
          alwaysQuantity: true,
          items: [
            { name: 'pain', quantity: 1 }
          ]
        },
        {
          title: 'Carte',
          alwaysQuantity: false,
          items: []
        },
        {
          title: 'Goodies',
          alwaysQuantity: false,
          items: []
        },
      ]
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

.c-prepa-card {
  border: solid 2px $white-ter;
  background: $white-bis;
  border-radius: $radius-large;

  &__header {
    margin: space(2);
    text-align: center;
    color: $black;
    font-size: $size-4;
  }
  
  &__main {
    margin: 0 -2px -2px;
    border: solid 1px $white-ter;
    border-radius: $radius-large;
    background: $white;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: -1px;
    border-radius: $radius-large $radius-large 0 0;
    border-bottom: solid 1px $white-ter;
    overflow: hidden;

    &-item {
      text-align: center;
      border-top: solid 1px $white-ter;
      border-right: solid 1px $white-ter;
      padding: space(2) space(2) space(3);

      &:last-child:nth-child(2n+1) {
        grid-column: span 2;
      }

      &-title {
        font-size: $size-7;
        color: $text-light;
        margin-bottom: space(1);
      }

      li {
        line-height: 1.15;

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
      margin: space(3) space(3);
      text-transform: uppercase;
      text-align: center;
      justify-content: center;
      border-radius: $radius;
      cursor: pointer;

      &:focus,
      &:hover {
        opacity: .9;
      }

      &:active {
        opacity: .8;
      }

      &.is-danger {
        color: $danger-invert;
        background: $danger;
      }
      &.is-success {
        color: $success-invert;
        background: $success;
      }
    }
  }
}
</style>