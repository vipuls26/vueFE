<template>
    <div class="aspect-video w-full overflow-hidden bg-gray-200 sm:aspect-square">
        <img :src="imageUrl" :alt="altText"
            class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" loading="lazy">
    </div>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
    path: {
        type: String,
        required: true,
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

const imageUrl = computed(() => `${props.baseUrl}${props.path}`);
</script>