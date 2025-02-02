<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

const userValidate = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'))
  if (userTokens) {
    authStore.userData.token = userTokens.token
    authStore.userData.refreshToken = userTokens.refreshToken
    authStore.userData.expiresIn = userTokens.expiresIn
  }
}

onMounted(() => {
  userValidate()
})
</script>

<template>
  <header>
    <div class="container">
      <nav class="menu">
        <router-link to="/">Главная</router-link>
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/signin">Вход</router-link>
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
  justify-content: center;
  gap: 40px;
  font-size: 18px;
}
</style>
