<template>

    <div>
        <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            <slot> {{ title }} </slot>
        </h1>
        <p class="leading-relaxed text-gray-700 dark:text-white whitespace-pre-line">
            <slot>
                {{ content }}
            </slot>
        </p>
    </div>

</template>


<script setup>

defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: 'content'
    }
})
</script>