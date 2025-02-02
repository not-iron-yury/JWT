import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/HomeView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./../views/SignUp.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./../views/SignIn.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/CatalogView.vue'),
      meta: {
        auth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.userData.token) {
    next('/signin')
  } else {
    next()
  }
})

export default router
