<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import BallSystem from "../components/BallSystem.vue";
import InputSystem from "../components/InputSystem.vue";
import Button from "../components/Button.vue";

const form = ref(null);
const questions = ref([]);
const answers = ref({});  // Track answers by question ID
const textField = ref("");
const isLoading = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const route = useRoute();

// Computed Properties
const isFormValid = computed(() => {
    if (!questions.value?.length) return false;
    return questions.value.every(question => answers.value[question.id] !== undefined);
});

const unansweredQuestions = computed(() => {
    if (!questions.value) return [];
    return questions.value.filter(question => answers.value[question.id] === undefined);
});

const answeredCount = computed(() =>
    questions.value.length - unansweredQuestions.value.length
);

// Handle answer updates from BallSystem
const updateAnswer = (questionId, value) => {
    answers.value[questionId] = value;
};

async function submitForm() {
    if (!isFormValid.value) {
        errorMessage.value = 'Please answer all questions before submitting';
        return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    const formData = questions.value.map(question => ({
        question: question.question,
        answer: answers.value[question.id]
    }));

    formData.push({ textField: textField.value });

    try {
        const response = await fetch(
            `http://localhost:8080/api/sendform/${route.params.id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
        );
        const data = await response.json();
        console.log(data);

        if (data.message === "Form submitted successfully") {
            successMessage.value = "Thank you for your feedback!";
            setTimeout(() => {
                successMessage.value = '';
                resetForm();
            }, 3000);
        } else {
            errorMessage.value = "Failed to submit feedback. Please try again.";
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        errorMessage.value = "An error occurred. Please try again.";
    } finally {
        isSubmitting.value = false;
    }
}

const fetchFormData = async (formId) => {
    isLoading.value = true;
    errorMessage.value = '';
    answers.value = {};  // Reset answers when loading new form

    try {
        const response = await fetch(`http://localhost:8080/api/form/${formId}`);
        const data = await response.json();
        form.value = data.form_name;
        questions.value = data.questions;
    } catch (error) {
        console.error("Error fetching form:", error);
        errorMessage.value = "Failed to load form. Please refresh the page.";
    } finally {
        isLoading.value = false;
    }
};

const resetForm = () => {
    answers.value = {};
    textField.value = ''
    isSubmitting.value = false;
};

onMounted(() => {
    if (route.params.id) {
        fetchFormData(route.params.id);
    }
});
</script>

<template>
    <div class="flex flex-col gap-8 bg-white w-full h-full rounded-[10px] p-6 sm:p-16">
        <div class="flex justify-between items-center">
            <p class="font-bold text-[32px]">Feedback</p>

            <div v-if="questions.length" class="text-sm text-gray-600">
                {{ answeredCount }}/{{ questions.length }} answered
            </div>
        </div>

        <div v-if="isLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 rounded" role="alert">
            <p class="text-red-700">{{ errorMessage }}</p>
        </div>

        <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 rounded" role="alert">
            <p class="text-green-700">{{ successMessage }}</p>
        </div>

        <div v-if="!isLoading" class="space-y-8">
            <BallSystem v-for="question in questions" :key="question.id" :questionId="question.id"
                :value="answers[question.id]" @update:value="(val) => updateAnswer(question.id, val)" :class="{
                    'border-l-4 border-yellow-400 pl-4': unansweredQuestions.includes(question)
                }">
                {{ question.question }}
            </BallSystem>

            <InputSystem v-model="textField" :disabled="isSubmitting">
                Your thoughts
            </InputSystem>

            <Button @click="submitForm" :disabled="isSubmitting || !questions.length">
                <template v-if="isSubmitting">
                    <span class="flex items-center justify-center">
                        <span class="animate-spin mr-2">⟳</span>
                        Submitting...
                    </span>
                </template>
                <template v-else>
                    Submit feedback
                </template>
            </Button>
        </div>
    </div>
</template>