<script setup>
import { ref } from 'vue';
import Ball from './Ball.vue'

const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  submitted: {
    type: Boolean,
    default: false
  }
})

const buttonArr = ref([
  {
    name: '1',
    selected: false
  },
  {
    name: '2',
    selected: false
  },
  {
    name: '3',
    selected: false
  },
  {
    name: '4',
    selected: false
  },
  {
    name: '5',
    selected: false
  }])

function buttonSelect(button, index) {
  button.selected = !button.selected
  for (let i = 0; i < buttonArr.value.length; i++) {
    if (i !== index) {
      buttonArr.value[i].selected = false
    }
  }
}

</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">
    <p class="text-xl">
      <slot /> <span class="text-red-500"> *</span>
    <p v-if="!selected & submitted" class="text-red-500 text-base">This field is required. Please fill it out.</p>
    </p>
    <div class="flex gap-3">
      <Ball v-for="(button, index) in buttonArr" :selected="button.selected" @click="buttonSelect(button, index)" :aria-checked="button.selected" :id="index + 1">
        {{ button.name }}
      </Ball>
    </div>

  </div>
</template>
