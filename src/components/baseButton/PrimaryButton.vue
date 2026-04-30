<template>
    <button :type="type"
        class="px-5 py-2.5 rounded-4xl bg-blue-500 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
        <slot>
            {{ label }}
        </slot>

    </button>
</template>

<script setup>

defineProps({
    label: {
        type: String,
        default: 'Button'
    },
    type: {
        type: String,
        default: 'button'
    }
})
</script>