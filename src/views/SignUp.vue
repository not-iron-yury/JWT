<script setup>
import { ref } from 'vue'
import AppLoader from '../components/AppLoader.vue'
import { useAuthStore } from './../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const signUp = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signUp')
  router.push('/catalog')
}
</script>

<template>
  <section class="form-section">
    <h2 class="title">Регистрация</h2>
    <form class="flex-col">
      <Message v-if="authStore.errorMsg" severity="warn">{{ authStore.errorMsg }}</Message>
      <div class="p-inputgroup input-row">
        <span class="input-icon">
          <i class="pi pi-user"></i>
        </span>
        <InputText type="email" v-model="email" placeholder="Почта" class="input-text" />
      </div>
      <div class="p-inputgroup input-row">
        <span class="input-icon">
          <i class="pi pi-at"></i>
        </span>
        <InputText type="password" v-model="password" placeholder="Пароль" class="input-text" />
      </div>
      <AppLoader v-if="authStore.loader" />
      <div class="flex-col">
        <Button label="Регистрироваться" @click="signUp" />
        <span class="subtext">
          Уже зарегистрированы?
          <router-link to="/signin">Авторизация</router-link>
        </span>
      </div>
    </form>
  </section>
</template>

<style scoped>
.input-row {
  display: flex;
}
.input-icon {
  display: flex;
  place-items: center;
  padding: 0 10px;
  color: var(--color-text);
  background-color: var(--vt-c-text-dark-2);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.input-text {
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.subtext {
  font-size: 14px;
  opacity: 0.7;
  transition: opacity 0.25s ease;
}

.subtext:hover {
  opacity: 1;
}
</style>
