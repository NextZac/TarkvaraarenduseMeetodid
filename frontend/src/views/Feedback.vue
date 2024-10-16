<script setup>
import BallSystem from "../components/BallSystem.vue";
import InputSystem from "../components/InputSystem.vue";
import Button from "../components/Button.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // Use Vue Router for accessing route parameters
import { watch } from "vue";

const form = ref(null);
const questions = ref([]);

const route = useRoute();

console.log(route);

const fetchFormData = async (formId) => {
    try {
        const response = await fetch(`/api/form/${formId}`);
        const data = await response.json();
        form.value = data.form_name; // assuming your API returns form_name
        questions.value = data.questions; // assuming your API returns questions array
    } catch (error) {
        console.error("Error fetching form data:", error);
    }
};

onMounted(() => {
    watch(
        () => route.params.id,
        (newId) => {
            if (newId) {
                fetchFormData(newId);
            }
        },
    );
});
</script>

<template>
    <div
        class="flex flex-col gap-8 bg-white w-full h-full rounded-[10px] p-6 sm:p-16"
    >
        <p class="font-bold text-[32px]">Feedback</p>

        <BallSystem v-for="question in questions">{{
            question.question
        }}</BallSystem>
        <InputSystem>Your thoughts</InputSystem>
        <Button>Submit feedback</Button>
    </div>
</template>
