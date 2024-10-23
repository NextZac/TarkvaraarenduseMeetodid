<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "Insert Text",
    },
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watch(value, (newValue) => {
    emit("update:modelValue", newValue);
});
</script>

<template>
    <div class="flex flex-col gap-3 w-full h-full">
        <p class="text-xl">
            <slot />
        </p>
        <div
            class="flex w-full bg-transparent border border-[#B8B8B8] p-4 rounded-xl text-wrap h-min align-top"
        >
            <textarea
                v-model="value"
                class="w-full h-[150px] bg-transparent border-0 text-wrap focus:ring-0 focus:border-transparent font-medium outline-none"
                :placeholder="props.placeholder"
            />
        </div>
    </div>
</template>
