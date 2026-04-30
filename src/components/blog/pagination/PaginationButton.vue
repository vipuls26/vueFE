<template>
    <button @click="$emit('change', targetPage)" :disabled="disabled"
        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    targetPage: Number,
    disabled: Boolean
});

defineEmits(['change']);

</script>