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
</template>

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
