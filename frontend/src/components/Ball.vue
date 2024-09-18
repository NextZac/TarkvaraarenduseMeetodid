<script setup>

</script>

<template>
    <button type="button" class="flex w-[60px] h-[60px] p-[10px] rounded-full text-center content-center justify-center bg-[#EAEAEA] hover:bg-[#B9A2FF] hover:scale-105 active:scale-100 transition duration-100">
        <div class="w-full h-full flex content-center justify-center">
            <slot />
        </div>
    </button>
</template>