<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    categories: Array,
    selectedCategories: Array,
});

const emit = defineEmits([
    'category',
    'clearFilter',
    'update:search'
]);

const searchQuery = ref('');
let timer;
watch(searchQuery, (val) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        emit('update:search', val);
    }, 400);
});
</script>

<template>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-3">
        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
            <button @click="$emit('clear-filters')" :class="selectedCategories.length === 0
                ? 'bg-blue-500 text-white border-transparent'
                : 'bg-transparent text-blue-700 border-blue-500 dark:text-white'"
                class="whitespace-nowrap font-semibold py-2 px-4 border rounded-4xl hover:bg-blue-500 hover:text-white transition">
                All
            </button>
            <button v-for="cat in categories" :key="cat.id" @click="$emit('category', cat)" :class="selectedCategories.includes(cat.id)
                ? 'bg-blue-500 text-white border-transparent'
                : 'bg-transparent text-blue-700 border-blue-500 dark:text-white'"
                class="whitespace-nowrap font-semibold py-2 px-4 border rounded-4xl hover:bg-blue-600 hover:text-white transition">
                {{ cat.name }}
            </button>
        </div>
        <!-- Search -->
        <div class="w-full md:w-72">
            <input v-model="searchQuery" type="text" placeholder="Search blogs..."
                class="border-2 border-purple-400 hover:border-purple-500 rounded-full mb-2 p-2 dark:text-white dark:placeholder-white placeholder-black" />
        </div>
    </div>
</template>