import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './index.scss'
import './assets/scss/index.scss'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/prepa.vue'),
      children: [
        {
          path: '',
          component: () => import('./components/PrepaSlider.vue'),
        },
        {
          path: 'show/:type',
          component: () => import('./components/PrepaPopin.vue'),
          props({params}) {
            let typeText = '';
            
            switch(params.type) {
              case 'complete':
                typeText = 'fermés';
                break;
              case 'rest':
                typeText = 'restants';
                break;
              case 'rupture':
                typeText = 'en rupture';
                break;
              case 'canceled':
                typeText = 'annulés';
                break;
            }

            return {
              title: `Sacs ${typeText}`
            }
          }
        }
      ]
    },
    {
      path: '/livraison',
      component: () => import('./pages/livraison.vue'),
    }
  ],
})

createApp(App).use(router).mount('#app')
