<template>
    <p class="text-sm text-gray-500 dark:bg-gray-100 bg-gray-100 px-2 py-1 rounded-full">
        <slot> {{ status }} </slot>
    </p>
</template>

<script setup>

defineProps({
    status: {
        type: String,
    }
})

</script>