import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/custom-component',
      name:'custom-component',
      component: () => import('../components/FormComponents/index.vue')
    },
    {
      
      path:'/amap-component',
      name:'amap-component',
      component: () => import('../views/AmapView.vue')
    },
    {
      path:'/monaco-editor',
      name:'monaco-editor',
      component: () => import('../views/MonacoEditor.vue')
    },
    {
      path:'/chart-view',
      name:'chart-view',
      component: () => import('../views/ChartView.vue')
    }
  ]
})

export default router
