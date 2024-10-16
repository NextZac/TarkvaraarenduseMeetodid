<script setup>
import { ref } from 'vue';
import BallSystem from '../components/BallSystem.vue'
import InputSystem from '../components/InputSystem.vue';
import Button from '../components/Button.vue';
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // Use Vue Router for accessing route parameters
import { watch } from "vue";

const isSubmitted = ref(false)

const questions = ref({
    id: 1,
    question: 'Mata',
},
{
    id: 2,
    question: 'Mata',
},
{
    id: 3,
    question: 'Mata',
},
{
    id: 4,
    question: 'Mata',
},
{
    id: 5,
    question: 'Mata',
});

const isQuestionAnswered = (questionId) => {
    return true
}

function FormValitation(questions) {
    let response = [];
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

            if (ball != null) {
                let answer = ball.getAttribute('id');

                response.push({
                    id: question.id,
                    question: question.question,
                    answer: answer
                });

                isSubmitted.value = true
            }
        } catch (error) {
            console.log(error);

        }
    });

    let textField = document.getElementById('textField');

    response.push({
        textField: textField
    })

    console.log(response);
}
const form = ref(null);

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

        <BallSystem :submitted="isSubmitted" :selected="isQuestionAnswered(question.id)" v-for="question in questions"
            :id="question.id + 'a'">{{ question.question }}</BallSystem>

        <InputSystem id="textField">Your thoughts</InputSystem>
        <Button @click="FormValitation(questions)">Submit feedback</Button>
    </div>
</template>

