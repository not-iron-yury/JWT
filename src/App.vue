<script setup>
import SignUp from './views/SignUp.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <main>
    <div class="container">
      <SignUp />
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
  margin-bottom: 20px;
  font-size: 20px;
}

.menu__link {
  color: #000;
  margin: 0 20px;
  font-family: 'Arial', sans-serif;
}
</style>
