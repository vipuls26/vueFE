<template>

    <label :for="htmlFor" class="block text-lg font-medium text-gray-700 mb-1 dark:text-white">
        <slot>{{ label }}</slot>
        <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
</template>

<script setup>

import { ref } from 'vue';


const title = ref('Post Title');

defineProps({
    htmlFor: String,
    label: String,
    required: Boolean,
});
</script>
