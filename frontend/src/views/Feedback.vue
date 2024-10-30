<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import BallSystem from "../components/BallSystem.vue";
import InputSystem from "../components/InputSystem.vue";
import Button from "../components/Button.vue";

// State Management
const form = ref(null);
const questions = ref([]);
const textField = ref("");
const isLoading = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const route = useRoute();

// Computed Properties
const isFormValid = computed(() => {
    if (!questions.value?.length) return false;

    // Check if all questions have answers
    const allQuestionsAnswered = questions.value.every((question, index) => {
        const container = document.getElementById(index);
        return container?.querySelector("[type='button'][aria-checked='true']");
    });

    return allQuestionsAnswered;
});

const unansweredQuestions = computed(() => {
    if (!questions.value) return [];

    return questions.value.filter((question, index) => {
        const container = document.getElementById(index);
        return !container?.querySelector("[type='button'][aria-checked='true']");
    });
});

// Form Submission
async function FormValitation(questions) {
    if (!isFormValid.value) {
        errorMessage.value = 'Please answer all questions before submitting';
        return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    let response = [];

    // Collect answers
    questions.forEach((question, index) => {
        let ballsContainer = document.getElementById(index);
        try {
            let ball = ballsContainer.querySelector(
                "[type='button'][aria-checked='true']"
            );
            let answer = ball.getAttribute("id");
            if (answer != null) {
                response.push({
                    question: question.question,
                    answer: answer,
                });
            }
        } catch (error) {
            console.error("Error collecting answer:", error);
        }
    });

    // Add text field response
    response.push({
        textField: textField.value,
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
            }
        );
        const data = await resp.json();

        if (data["msg"] === "success") {
            successMessage.value = "Thank you for your feedback!";
            setTimeout(() => {
                successMessage.value = '';
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

// Fetch Form Data
const fetchFormData = async (formId) => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        const response = await fetch(`/api/form/${formId}`);
        const data = await response.json();
        form.value = data.form_name;
        questions.value = data.questions;
    } catch (error) {
        console.error("Error fetching form data:", error);
        errorMessage.value = "Failed to load form. Please refresh the page.";
    } finally {
        isLoading.value = false;
    }
};

// Initialize form
onMounted(() => {
    if (route.params.id) {
        fetchFormData(route.params.id);
    }

    watch(
        () => route.params.id,
        (newId) => {
            if (newId) {
                fetchFormData(newId);
            }
        }
    );
});
</script>

<template>
    <div class="flex flex-col gap-8 bg-white w-full h-full rounded-[10px] p-6 sm:p-16">
        <div class="flex justify-between items-center">
            <p class="font-bold text-[32px]">Feedback</p>

            <!-- Progress indicator -->
            <div v-if="questions.length" class="text-sm text-gray-600">
                {{ questions.length - unansweredQuestions.length }}/{{ questions.length }} answered
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 rounded" role="alert">
            <p class="text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 rounded" role="alert">
            <p class="text-green-700">{{ successMessage }}</p>
        </div>

        <!-- Form Content -->
        <div v-if="!isLoading" class="space-y-8">
            <BallSystem v-for="(question, index) in questions" :key="question.id" :id="index" :class="{
                'border-l-4 border-yellow-400 pl-4': unansweredQuestions.includes(question)
            }">
                {{ question.question }}
            </BallSystem>

            <InputSystem v-model="textField" :disabled="isSubmitting">
                Your thoughts
            </InputSystem>

            <Button @click="FormValitation(questions)" :disabled="isSubmitting || !questions.length">
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