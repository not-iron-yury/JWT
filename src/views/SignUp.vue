<script setup>
import { ref } from 'vue'
import AppLoader from '../components/AppLoader.vue'
import { useAuthStore } from './../stores/auth'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const signUp = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signUp')
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
        <span>
          Вы уже зарегистрированы?
          <router-link to="/signin">Регистрироваться</router-link>
        </span>
      </div>
    </form>
  </section>
</template>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
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
</style>
