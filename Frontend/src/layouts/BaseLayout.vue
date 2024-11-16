<script setup lang="ts">
</script>

<template>
  <div class="flex flex-row">
    <header class="">
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>