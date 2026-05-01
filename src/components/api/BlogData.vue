<script setup>

import HeaderComponent from '../HeaderComponent.vue';
import "vue3-toastify/dist/index.css"
import { blogStore } from '@/store/blog/blogStore';
import { ref, watch, onMounted } from 'vue';
import router from '@/router';
import PaginationComponent from '../blog/pagination/PaginationComponent.vue';
import { authStore } from '@/store/auth/authStore';
import BaseButton from '../baseButton/BaseButton.vue';
import BlogCard from '../blog/detail/BlogCard.vue';
import BlogFilter from '../ui/BlogFilter.vue';
import NoBlogFound from '../ui/NoBlogFound.vue';
import SkeletonLoading from '../ui/SkeletonLoading.vue';

const blogstore = blogStore();
const authstore = authStore();

const handleBtn = () => {
    router.push({ name: 'addBlog' })
}

onMounted(() => {
    blogstore.fetchBlogs();
    blogstore.fetchCategories();
});


const searchQuery = ref('');
let timer;
watch(searchQuery, (newValue) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        blogstore.search = newValue;
    }, 500);
});


</script>

<template>

    <HeaderComponent />

    <div class="dakr:bg-slate-900 p-8">

        <!-- category + search -->
        <BlogFilter :categories="blogstore.category" :selected-categories="blogstore.selectedCategories"
            @category="blogstore.setCategory" @clearFilters="blogstore.clearFilters"
            @update:search="val => blogstore.search = val" />

        <!-- loading -->
        <div v-if="blogstore.loading">
            <SkeletonLoading></SkeletonLoading>
        </div>

        <!-- error -->
        <div v-else-if="blogstore.error && blogstore.blogs.length === 0">
            <p> error occur while fetching data </p>
            <SkeletonLoading></SkeletonLoading>
        </div>

        <!-- blog -->
        <div v-else>
            <div class="flex space-x-4 gap-3">
                <BaseButton @click="handleBtn" label="Add Blog" variant="primary" />
                <BaseButton @click="blogstore.syncDataBase" label="sync now" variant="secondary" />
            </div>

            <div v-if="blogstore.filterBlog && blogstore.filterBlog.length > 0">

                <div class="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2  lg:grid-cols-4 xl:gap-x-8 p-3">
                    <BlogCard v-for="blog in blogstore.filterBlog" :key="blog.id" :current-email="authstore.user"
                        :blog="blog"></BlogCard>
                </div>

                <!-- pagination -->
                <PaginationComponent :current_page="blogstore.pagination.current_page"
                    :last_page="blogstore.pagination.last_page"></PaginationComponent>
            </div>

            <div v-else>
                <NoBlogFound></NoBlogFound>
            </div>
        </div>
    </div>

</template>
