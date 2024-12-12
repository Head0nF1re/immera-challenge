<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { LocalStorage } from '@/utils/localStorage';

const alertMessage = LocalStorage.getItem('alertMessage')
LocalStorage.removeItem('alertMessage')

</script>

<template>
  <BaseLayout>
    <div class="card flex justify-center">
      <div class="flex-row text-center">
        <h1>403 - Forbidden</h1>
        <p v-if="alertMessage">{{ alertMessage }}</p>
      </div>
    </div>
  </BaseLayout>
</template>
