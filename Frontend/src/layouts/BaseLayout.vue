<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div>
    <header>
      <slot name="header">
        <NavBar />
      </slot>
    </header>
    <main class="my-20">
      <slot></slot>
    </main>
    <footer>
      <slot name="footer">
        <div class="h-20 bg-primary fixed left-0 bottom-0 w-full content-center text-center">
          Example footer
        </div>
      </slot>
    </footer>
  </div>
</template>
