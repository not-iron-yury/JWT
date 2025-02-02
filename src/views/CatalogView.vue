<script setup>
import { ref, onMounted } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import getProducts from './../API/getProducts'

const showLoader = ref(false)
const products = ref({})

onMounted(async () => {
  showLoader.value = true
  products.value = await getProducts()
  showLoader.value = false
})
</script>

<template>
  <div>
    <h1 class="title">Каталог</h1>
    <AppLoader v-if="showLoader" />
    <div class="flex-col" v-else>
      <Card v-for="product in products" :key="product.id" class="card">
        <template #header>
          <img :src="product.url" class="card-img" />
        </template>
        <template #title> {{ product.name }} </template>
        <template #subtitle> {{ product.descr }} </template>
      </Card>
    </div>
  </div>
</template>
<style>
.card {
  display: grid;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
}
.card-img {
  max-width: 468px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
</style>
