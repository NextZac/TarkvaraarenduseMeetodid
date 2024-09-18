<script setup>
import Ball from './Ball.vue'

</script>

<template>
  <div>
    <p>
      <slot />
    </p>
    <div>
      <Ball>
        1
      </Ball>
    </div>
  </div>
</template>