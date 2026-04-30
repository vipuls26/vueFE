<template>
    <button :type="type" class="bg-red-400 text-white rounded-4xl p-2">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>


<script setup>

defineProps({
    label: {
        type: String,
        default: 'Button',
    },
    type: {
        type: String,
        default: 'button'
    }
})

</script>