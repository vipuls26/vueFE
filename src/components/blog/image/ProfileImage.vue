<template>
    <!-- <img class="h-8 w-8 rounded-full bg-gray-200 object-cover"
        :src="`http://127.0.0.1:8000/storage/profile/69d383729304e.png`"> -->

    <img :src="profileImageUrl" :alt="altText"
    class="h-8 w-8 rounded-full bg-gray-200 object-cover" >

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
        default: 'profile image'
    },
    baseUrl: {
        type: String,
        default: 'http://127.0.0.1:8000/storage/'
    }
});

const profileImageUrl = computed(() => `${props.baseUrl}${props.path}`);
</script>