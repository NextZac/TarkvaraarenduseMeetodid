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
const textField = ref("");

async function FormValitation(questions) {
    console.log(textField.value);
    let response = [];

    questions.forEach((question) => {
        let ballsContainer = document.getElementById(question.id + "a");

        try {
            let ball = ballsContainer.querySelector(
                "[type='button'][aria-checked='true']",
            );

            let answer = ball.getAttribute("id");

            if (answer != null) {
                response.push({
                    question: question.question,
                    answer: answer,
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

    response.push({
        textField: textField.value,
    });

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
        if (data["msg"] == "success") {
            console.log("Success");
        }
    } catch (error) {
        console.log(error);
    }
}

const route = useRoute();

console.log(route);

const fetchFormData = async (formId) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/form/${formId}`,
        );
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
        <BallSystem v-for="question in questions" :id="question.id + 'a'">{{
            question.question
        }}</BallSystem>
        <InputSystem v-model="textField">Your thoughts</InputSystem>
        <Button @click="FormValitation(questions)">Submit feedback</Button>
    </div>
</template>
