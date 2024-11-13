<script setup>
import { ref, onMounted } from "vue";

const answers = ref([{ "question": { "id": 1 }, "answer": "Dont know" }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "5" }, { "question": "Why are you here?", "answer": "5" }, {}] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "5" }, { "question": "Why are you here?", "answer": "5" }, { "textField": "TETETETETETETETETE" }] }, { "question": { "id": 1 }, "answer": [{ "textField": "asd" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }, { "textField": "sadwas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }, { "textField": "sadwas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }, { "textField": "sadwas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }, { "textField": "sadwas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "4" }, { "question": "Why are you here?", "answer": "4" }, { "textField": "sadwas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }] }, { "question": { "id": 1 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "2" }] }, { "question": { "id": 2 }, "answer": "Dont know" }, { "question": { "id": 3 }, "answer": "Dont know" }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "1" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "1" }, { "textField": "wawas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "2" }, { "question": "Who are you?", "answer": "1" }, { "textField": "nigg" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "2" }, { "question": "Who are you?", "answer": "1" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "2" }, { "question": "Who are you?", "answer": "4" }, { "textField": "nigga" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdaas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "2" }, { "question": "Why are you here?", "answer": "3" }, { "question": "Who are you?", "answer": "2" }, { "textField": "asdas" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "1" }, { "question": "Why are you here?", "answer": "2" }, { "question": "Who are you?", "answer": "2" }, { "textField": "nigg" }] }, { "question": { "id": 3 }, "answer": [{ "question": "Why do birds fly?", "answer": "4" }, { "question": "Why are you here?", "answer": "2" }, { "question": "Who are you?", "answer": "3" }, { "textField": "niggaaa" }] }]);

const fetchAnswers = async () => {
    try {
        const response = await fetch("/api/answers");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        answers.value = data;
    } catch (error) {
        console.error("Error fetching answers:", error);
    }
};

const hidden = ref(false);
const sorted = ref(false);
const sortText = ref('Oldest -> Newest');

const sortNewestToOldest = () => {
    answers.value = [...answers.value].reverse();
    sorted.value = !sorted.value;
    if (sorted.value) sortText.value = 'Newest -> Oldest';
    else sortText.value = 'Oldest -> Newest';
};

onMounted(fetchAnswers);
</script>

<template>
    <div class="flex flex-col w-full h-full gap-8">
        <span class="flex justify-center gap-4 items-center">
            <h1 class="text-3xl font-bold">Answers</h1>
            <button class="p-4 rounded-lg bg-[#d1d1d1] hover:bg-[#acacac]" @click="sortNewestToOldest">Current sort: {{ sortText }}</button>
            <button class="p-4 rounded-lg bg-[#d1d1d1] hover:bg-[#acacac]" @click="hidden = !hidden">Hide "Dont know" answers</button>
        </span>
        <div class="flex flex-col gap-8 w-full h-full border-t border-[#B8B8B8] pt-8">

            <div v-for="(item, index) in answers" class="flex flex-col w-full h-min bg-[#d1d1d1] rounded-lg p-6"
                :class="{ 'border border-[#da325c] !bg-[#da325c]/30 text-[#da325c]': typeof item.answer == 'string', 'hidden': typeof item.answer == 'string' && hidden }">
                <h1 class="text-2xl font-bold border-b border-[#B8B8B8] pb-2 mb-2"
                    :class="{ 'border-[#da325c]': typeof item.answer == 'string' }"> Form ID: {{ item.question.id }}
                </h1>
                <span class="flex flex-col gap-6">
                    <div v-if="Array.isArray(item.answer)" v-for="(answer, index) in item.answer"
                        class="flex flex-col gap-2 w-full h-full">
                        <h1 v-if="answer.question" class="text-xl font-bold">Question: {{ answer.question }}</h1>
                        <h1 v-if="answer.answer" class="text-xl font-bold">Answer: {{ answer.answer }}</h1>
                        <h1 v-if="answer.textField" class="text-xl font-bold">Text Input: {{ answer.textField }}</h1>
                    </div>
                    <h1 v-if="typeof item.answer == 'string'" class="text-xl font-bold">Answer: ?</h1>
                </span>
            </div>
        </div>
    </div>
</template>