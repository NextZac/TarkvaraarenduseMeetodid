<script setup>

import { computed } from 'vue';

const props = defineProps({
    selected: {
        type: Boolean,
        default: false
    }
})

const isSelected = computed(() => props.selected);
</script>

<template>
    <button type="button" :class="[{'!bg-[#896be6]': selected}, 'flex size-10 sm:size-12 p-[10px] rounded-full text-center border-0 content-center justify-center hover:bg-[#B9A2FF] hover:scale-105 active:scale-100 transition duration-100 bg-[#EAEAEA]']">
        <div class="w-full h-full flex content-center justify-center items-center text-lg font-medium">
            <slot />
        </div>
    </button>
</template>