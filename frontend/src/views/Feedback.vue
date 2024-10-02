<script setup>
import BallSystem from '../components/BallSystem.vue'
import InputSystem from '../components/InputSystem.vue';
import Button from '../components/Button.vue';
</script>

<template>
    <div class="flex flex-col gap-8 bg-white w-full h-full rounded-[10px] p-6 sm:p-16">
        <p class="font-bold text-[32px]">Feedback</p>

        <BallSystem>How would you rate your experience?</BallSystem>
        <BallSystem>How would you rate your experience?</BallSystem>
        <BallSystem>How would you rate your experience?</BallSystem>
        <BallSystem>How would you rate your experience?</BallSystem>
        <InputSystem>Your thoughts</InputSystem>
        <Button>Submit feedback</Button>
    </div>
</template>

