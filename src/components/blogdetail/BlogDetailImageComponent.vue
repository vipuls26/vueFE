<template>
    <div class="w-full h-[50vh]">
        <img :src="imageUrl" class="object-cover w-full h-full" :alt="altText">
    </div>
</template>


<script setup>

import { computed } from 'vue';

const props = defineProps({
    path: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: 'blog image'
    },
    baseUrl: {
        type: String,
        default: 'http://127.0.0.1:8000/storage/'
    }
});

const imageUrl = computed(() => `${props.baseUrl}${props.path}`)

</script>