<script setup>
import { ref, onMounted } from "vue";

const answers = ref([]);

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
onMounted(fetchAnswers);
</script>

<template>
    <div>
        <h1>Answers</h1>
        <ul>
            <li v-for="(item, index) in answers" :key="index">
                <strong>Question:</strong> {{ item.question || item.textField
                }}<br />
                <strong>Answer:</strong>
                {{ item.answer || "No answer provided" }}
                <br />
            </li>
        </ul>
    </div>

    <div class="flex flex-col w-full h-full gap-8">
        <h1 class="text-3xl font-bold">Answers</h1>
        <div class="flex flex-col gap-8 w-full h-full border-t border-[#B8B8B8] pt-8">

            <div v-for="(item, index) in answers" class="flex flex-col w-full h-min bg-[#d1d1d1] rounded-lg p-6">
                <h1 class="text-2xl font-bold border-b border-[#B8B8B8] pb-2 mb-2"> Form ID: {{ item.question }} </h1>
                <span class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2 w-full h-full">
                        <h1 class="text-xl font-bold">Question: {{ item.question }}</h1>
                        <h1 class="text-xl font-bold">Answer: {{ item.answer }}</h1>
                    </div>
                    <div class="flex flex-col gap-2 w-full h-full">
                        <h1 class="text-xl font-bold">Question: {{  }}</h1>
                        <h1 class="text-xl font-bold">Answer: {{  }}</h1>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>