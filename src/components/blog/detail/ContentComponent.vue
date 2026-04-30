<template>
    <p class="mt-2 text-sm text-gray-600 dark:text-white line-clamp-2">
        {{ content }}
    </p>
</template>


<script setup>
defineProps({
    content: {
        type: String,
        default: 'some content',
        required: true
    }
})
</script>