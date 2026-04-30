<template>

    <span
        class="inline-flex items-center mt-2 rounded-md bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
        {{ category }}
    </span>
</template>


<script setup>
defineProps({
    category: {
        type: String,
        required: true,
        default: 'fun'
    }
})

</script>