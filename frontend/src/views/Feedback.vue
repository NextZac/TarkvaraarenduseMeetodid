<script setup>
import BallSystem from "../components/BallSystem.vue";
import InputSystem from "../components/InputSystem.vue";
import Button from "../components/Button.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const form = ref(null);
const questions = ref([]);
const textField = ref("");

async function FormValitation(questions) {
    console.log(textField.value);
    let response = [];

    questions.forEach((question) => {
        const ballsContainer = document.getElementById(question.id + "a");
        if (ballsContainer) {
            const ball = ballsContainer.querySelector(
                "[type='button'][aria-checked='true']",
            );
            if (ball) {
                const answer = ball.getAttribute("id");
                if (answer != null) {
                    response.push({
                        question: question.question,
                        answer: answer,
                    });
                }
            }
        }
    });

    // Add text field response
    response.push({
        textField: textField.value,
    });

    // Send the response
    try {
        const resp = await fetch(
            `http://localhost:8080/api/sendform/${route.params.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
            },
        );
        const data = await resp.json();
        if (data["msg"] === "success") {
            console.log("Success");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}

const fetchFormData = async (formId) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/form/${formId}`,
        );
        const data = await response.json();
        form.value = data.form_name; // Ensure this matches your API's response
        questions.value = data.questions; // Ensure this matches your API's response
    } catch (error) {
        console.error("Error fetching form data:", error);
    }
};

onMounted(() => {
    fetchFormData(route.params.id);
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
        <BallSystem
            v-for="question in questions"
            :key="question.id"
            :id="question.id + 'a'"
        >
            {{ question.question }}
        </BallSystem>
        <InputSystem v-model="textField">Your thoughts</InputSystem>
        <Button @click="FormValitation(questions)">Submit feedback</Button>
    </div>
</template>
