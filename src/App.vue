<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { computed, onMounted } from 'vue'
import router from './router/index'

const authStore = useAuthStore()
const showCatalog = computed(() => authStore.userData.token)

const userValidate = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'))
  if (userTokens) {
    authStore.userData.token = userTokens.token
    authStore.userData.refreshToken = userTokens.refreshToken
    authStore.userData.expiresIn = userTokens.expiresIn
  }
}

const logout = () => {
  authStore.userData.token = ''
  authStore.userData.refreshToken = ''
  authStore.userData.expiresIn = ''

  localStorage.removeItem('userTokens')

  router.push('/signin')
}

onMounted(() => {
  userValidate()
})
</script>

<template>
  <header>
    <div class="container">
      <nav class="menu">
        <router-link class="menu__link" to="/">
          <i class="pi pi-home menu__icon"></i>
          Главная
        </router-link>
        <router-link class="menu__link" to="/catalog" v-if="showCatalog">
          <i class="pi pi-folder menu__icon"></i>
          Каталог
        </router-link>
        <router-link class="menu__link" to="" v-if="showCatalog" @click="logout">
          <i class="pi pi-sign-out menu__icon"></i>
          Выход
        </router-link>
        <router-link class="menu__link" to="/signin" v-if="!showCatalog">
          <i class="pi pi-sign-in menu__icon"></i>
          Вход
        </router-link>
      </nav>
    </div>
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 30px 15px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
}
.menu {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  font-size: 16px;
}
.menu__link {
  display: flex;
  align-items: center;
  gap: 8px;
}
.menu__icon {
  padding-bottom: 3px;
}
</style>
