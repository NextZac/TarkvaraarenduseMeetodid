<script setup>
import { ref, watch } from 'vue';
import Ball from './Ball.vue';

const props = defineProps({
    questionId: {
        type: [String, Number],
        required: true
    },
    value: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits(['update:value']);

const buttons = ref([
    { name: '1', selected: false },
    { name: '2', selected: false },
    { name: '3', selected: false },
    { name: '4', selected: false },
    { name: '5', selected: false }
]);

// Watch for external value changes, but only update if the value actually changed
watch(() => props.value, (newValue) => {
    if (newValue === undefined) {
        // Reset all buttons if value is cleared
        buttons.value.forEach(button => {
            button.selected = false;
        });
        return;
    }

    // Only update if the new value is different from current selection
    const currentSelected = buttons.value.findIndex(btn => btn.selected) + 1;
    if (currentSelected.toString() !== newValue) {
        buttons.value.forEach((button, index) => {
            button.selected = (index + 1).toString() === newValue;
        });
    }
}, { immediate: true });

function selectButton(button, index) {
    const isCurrentlySelected = button.selected;
    const newValue = isCurrentlySelected ? undefined : (index + 1).toString();
    
    // Update local state
    buttons.value.forEach((btn, i) => {
        btn.selected = i === index && !isCurrentlySelected;
    });
    
    // Emit new value
    emit('update:value', newValue);
}
</script>

<template>
    <div class="flex flex-col gap-3 w-full h-full">
        <p class="text-xl">
            <slot /> <span class="text-red-500">*</span>
        </p>
        <div class="flex gap-3">
            <Ball
                v-for="(button, index) in buttons"
                :key="index"
                :selected="button.selected"
                @click="selectButton(button, index)"
                :aria-checked="button.selected"
                type="button"
            >
                {{ button.name }}
            </Ball>
        </div>
    </div>
</template>