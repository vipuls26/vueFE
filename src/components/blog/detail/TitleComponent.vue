<template>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
        <slot>
            {{ title }}
        </slot>
    </h3>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        default: 'blog title'
    }
})
</script>