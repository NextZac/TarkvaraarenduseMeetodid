<script setup>

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Insert Text'
    }
})
</script>

<template>
<div class="flex w-full bg-transparent border border-[#B8B8B8] p-4 rounded-xl text-wrap h-min align-top">
    <textarea class="w-full h-[150px] bg-transparent border-0 text-wrap focus:ring-0 focus:border-transparent font-medium outline-none" :placeholder="props.placeholder" />
</div>
</template>