<template>

    <div class="mt-8 flex justify-center items-center gap-2 pb-6">
        
        <!-- 
        <button @click="emit('changePage', 1)" :disabled="current_page === 1"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            first
        </button> 
        
        <button @click="emit('changePage', current_page - 1)" :disabled="current_page === 1"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            prev
        </button>


        <button @click="emit('changePage', current_page + 1)" :disabled="current_page === last_page"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            next
        </button>

        <button @click="emit('changePage', last_page)" :disabled="last_page === last_page"
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            last
        </button>
        
        -->

        <PaginationButton :target-page="1" :disabled="current_page === 1"> First </PaginationButton>
        <PaginationButton :target-page="current_page - 1" :disabled="current_page === 1"> Prev </PaginationButton>

        <span class="text-sm font-medium px-2"> Page {{ current_page }} of {{ last_page }} </span>

        <PaginationButton :target-page="current_page + 1" :disabled="current_page === last_page"> Next
        </PaginationButton>
        <PaginationButton :target-page="last_page" :disabled="last_page === last_page"> Last </PaginationButton>


    </div>
</template>


<script setup>
import PaginationButton from './PaginationButton.vue';

defineProps({
    current_page: {
        type: Number,
        required: true
    },
    last_page: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['changePage']);

</script>