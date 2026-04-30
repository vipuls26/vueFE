<script setup>

import HeaderComponent from '../HeaderComponent.vue';

// notification
import "vue3-toastify/dist/index.css"

import { blogStore } from '@/store/blog/blogApi';
import { ref, watch, onMounted } from 'vue';
import { loginStore } from '@/store/auth/optionLogin';
import SecondaryButton from '../baseButton/SecondaryButton.vue';
import PrimaryButton from '../baseButton/PrimaryButton.vue';
import router from '@/router';
import CardImage from '../blog/image/CardImage.vue';
import ProfileImage from '../blog/image/ProfileImage.vue';
import TitleComponent from '../blog/detail/TitleComponent.vue';
import BadgeComponent from '../blog/detail/BadgeComponent.vue';
import ContentComponent from '../blog/detail/ContentComponent.vue';
import StatusComponent from '../blog/detail/StatusComponent.vue';
import SearchButton from '../utlity/SearchButton.vue';
import PaginationComponent from '../blog/pagination/PaginationComponent.vue';

const blogstore = blogStore();
const searchQuery = ref(null);

const loginstore = loginStore();

const handleBtn = () => {
    router.push({ name: 'addBlog' })
}

onMounted(() => {
    blogstore.fetchBlogs();
    blogstore.fetchCategories();
});


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
        <div class="flex justify-between pb-3">

            <!-- blog category -->
            <div class="flex flex-wrap gap-2">

                <button @click="blogstore.clearFilters()"
                    class="bg-transparent hover:bg-blue-500 text-blue-700 dark:text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-4xl">
                    All
                </button>

                <div v-for="category in blogstore.category" :key="category.id">
                    <button @click="blogstore.setCategory(category)" :class="[
                        blogstore.selectedCategories.includes(category.id)
                            ? 'bg-blue-500 text-white border-transparent'
                            : 'bg-transparent text-blue-700 border-blue-500 dark:text-white'
                    ]"
                        class="hover:bg-blue-600 font-semibold py-2 px-4 border hover:text-white rounded-4xl transition-colors">
                        {{ category.name }}
                    </button>
                </div>

            </div>

            <!-- search btn -->
            <SearchButton v-model="searchQuery" placeholder="search blogs" />

        </div>

        <!-- loading -->
        <div v-if="blogstore.loading"
            class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            <div v-for="i in 4" :key="i" class="p-3">
                <div
                    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white animate-pulse">

                    <div class="aspect-video w-full bg-gray-300"></div>

                    <div class="flex flex-1 flex-col justify-between p-4 space-y-4">
                        <div>

                            <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

                            <div class="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>


                        <div class="flex items-center justify-between mt-6">
                            <div class="flex items-center gap-2">
                                <div class="h-8 w-8 rounded-full bg-gray-300"></div>
                                <div class="h-4 bg-gray-300 rounded w-12"></div>
                            </div>
                            <div class="h-4 bg-gray-300 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- error -->
        <div v-else-if="blogstore.error && blogstore.blogs.length === 0">
            <p> error occur while fetching data </p>
            <div v-for="i in 4" :key="i" class="p-3">
                <div
                    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white animate-pulse">

                    <div class="aspect-video w-full bg-gray-300"></div>

                    <div class="flex flex-1 flex-col justify-between p-4 space-y-4">
                        <div>

                            <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

                            <div class="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>


                        <div class="flex items-center justify-between mt-6">
                            <div class="flex items-center gap-2">
                                <div class="h-8 w-8 rounded-full bg-gray-300"></div>
                                <div class="h-4 bg-gray-300 rounded w-12"></div>
                            </div>
                            <div class="h-4 bg-gray-300 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- blog -->
        <div v-else>
            <div class="flex space-x-4 gap-3">
                <!-- add btn -->
                <!-- <RouterLink :to="{ name: 'addBlog' }"
                    class="px-5 py-2.5 rounded-4xl bg-blue-500 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                    Add blog
                </RouterLink> -->

                <!-- sync btn -->
                <!-- <button @click="blogstore.syncDataBase"
                    class="px-5 py-2.5 rounded-4xl bg-yellow-500 text-white font-semibold text-sm shadow-sm hover:bg-yellow-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                    Sync Db
                </button> -->

                <PrimaryButton @click="handleBtn">
                    Add Blog
                </PrimaryButton>

                <SecondaryButton @click="blogstore.syncDataBase">
                    sync now
                </SecondaryButton>

            </div>

            <div v-if="blogstore.filterBlog">
                <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-3">
                    <div v-for="blog in blogstore.filterBlog" :key="blog.id" class="flex">

                        <RouterLink :to="{ name: 'blogDetail', params: { id: blog.id } }" class="w-full">
                            <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-slate-800  h-full transition-all duration-300 hover:shadow-lg hover:border-gray-300">

                                <!-- image -->
                                <CardImage :path="blog.image.image_path" :alt-text="blog.title"></CardImage>


                                <!-- detail -->
                                <div class="flex flex-1 flex-col justify-between p-4">

                                    <div>
                                        <TitleComponent :title="blog.title"></TitleComponent>
                                        <BadgeComponent :category="blog.category.name"></BadgeComponent>
                                        <ContentComponent :content="blog.content"></ContentComponent>
                                    </div>

                                    <div v-if="loginstore.user === blog.user.email">
                                      <StatusComponent ></StatusComponent>
                                    </div>

                                    <div class="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gray-100">

                                        <div class="flex items-center gap-2">
                                            
                                            <ProfileImage :path="'profile/69d383729304e.png'"></ProfileImage>

                                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                                {{ blog.user.name }} 
                                            </p>
                                        </div>

                                        <p
                                            class="text-sm text-gray-500 dark:bg-gray-100 bg-gray-100 px-2 py-1 rounded-full">
                                            {{ blog.status }}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        </RouterLink>

                    </div>
                </div>

                <!-- pagination -->
                 <!-- <div class="mt-8 flex justify-center items-center gap-2 pb-6">

                    <button @click="blogstore.fetchBlogs(1)" :disabled="blogstore.pagination.current_page === 1"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
                        first
                    </button>


                    <button @click="blogstore.fetchBlogs(blogstore.pagination.current_page - 1)"
                        :disabled="blogstore.pagination.current_page === 1"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
                        prev
                    </button>


                    <span class="text-sm font-medium px-2">
                        Page {{ blogstore.pagination.current_page }} of
                        {{ blogstore.pagination.last_page }}
                    </span>

                    <button @click="blogstore.fetchBlogs(blogstore.pagination.current_page + 1)"
                        :disabled="blogstore.pagination.current_page === blogstore.pagination.last_page"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
                        next
                    </button>


                    <button @click="blogstore.fetchBlogs(blogstore.pagination.last_page)"
                        :disabled="blogstore.pagination.current_page === blogstore.pagination.last_page"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
                        last

                    </button>
                </div> 
          -->
         
                <PaginationComponent :current_page="blogstore.pagination.current_page" :last_page="blogstore.pagination.last_page"></PaginationComponent>
            
            </div>

            <div v-else>
                <div class="text-center text-2xl p-10">
                    no blog found of this category
                </div>
            </div>

        </div>
    </div>

</template>
