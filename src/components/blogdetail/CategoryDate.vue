<template>
    <div class="flex items-center justify-between mb-4 p-3">
        <span class="px-3 py-1 text-xs font-semibold text-blue-600 uppercase bg-blue-100 rounded-full">

            <slot> {{ category }} </slot>
        </span>
        <span class="text-sm text-gray-500">
            <slot> Date: {{ date }} </slot>
        </span>
    </div>
</template>

<script setup>
defineProps({
    category: {
        type: String,
        default: 'category'
    },
    date: {
        type: String
    }
})
</script>