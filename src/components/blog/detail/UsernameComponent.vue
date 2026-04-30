<template>
    <p class="text-sm font-medium text-gray-900 dark:text-white">

        <slot>
            {{ username }}
        </slot>
    </p>
</template>


<script setup>

defineProps({
    username: {
        type: String,
    }
})

</script>