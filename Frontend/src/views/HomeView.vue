<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode')
}
</script>

<template>
  <BaseLayout>
    <template #header>
      <!-- <Header /> -->
      <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
    </template>

    <i class="pi pi-check"></i>
  </BaseLayout>
</template>
