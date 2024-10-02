<script setup>

import Input from './Input.vue'

</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">
    <p class="text-xl">
      <slot />
    </p>
      <Input placeholder="Anything you’d like to add?" />
  </div>
</template>