<script setup>
import BallSystem from '../components/BallSystem.vue'
import InputSystem from '../components/InputSystem.vue';
import Button from '../components/Button.vue';

const questions = [{
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
}];

function FormValitation(questions){
    let response = [];

    questions.forEach((question) => {
        let ballsContainer = document.getElementById(question.id + 'a');

        try {
            let ball = ballsContainer.querySelector("[type='button'][aria-checked='true']");

            let answer = ball.getAttribute('id');

            response.push({
                id: question.id,
                question: question.question,
                answer: answer
            });
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
</script>

<template>
    <div class="flex flex-col gap-8 bg-white w-full h-full rounded-[10px] p-6 sm:p-16">
        <p class="font-bold text-[32px]">Feedback</p>

        <BallSystem v-for="question in questions" :id="question.id + 'a'">{{ question.question }}</BallSystem>
        
        <InputSystem id="textField">Your thoughts</InputSystem>
        <Button @click="FormValitation(questions)">Submit feedback</Button>
    </div>
</template>

