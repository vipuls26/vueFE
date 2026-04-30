<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import HeaderComponent from '../HeaderComponent.vue';
import BlogEdit from './BlogEdit.vue';
import { blogDetailStore } from '@/store/blog/blogDetailApi';
import { loginStore } from '@/store/auth/optionLogin';
import { blogDeleteStore } from '@/store/blog/blogDeleteApi';
import { blogStore } from '@/store/blog/blogApi';
import Swal from 'sweetalert2';
import TertiaryButton from '../baseButton/TertiaryButton.vue';
import PrimaryButton from '../baseButton/PrimaryButton.vue';


const route = useRoute();
const blogstore = blogStore();
const blogdetailstore = blogDetailStore();
const loginstore = loginStore();
const blogdeletestore = blogDeleteStore();

const blogId = route.params.id;
const isEdit = ref(false);


// switch 
const editToggle = () => {
    isEdit.value = !isEdit.value;
};

const deleteBlog = async () => {

    const result = await Swal.fire({
        title: 'Delete blog?',
        text: 'Please confirm to delete this blog',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
        blogdeletestore.deleteBlog(blogId);
    } else {
        Swal.fire('Cancelled', 'blog is not deleted', 'error');
    }

};

onMounted(async () => {
    await blogstore.fetchBlogs();
    await blogdetailstore.blogDetail(blogId)
});


</script>


<template>
    <HeaderComponent />

    <div class="flex items-center justify-center">
        <div v-if="blogdetailstore.blogContent"
            class="relative mt-3 mx-auto w-7xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 rounded-lg shadow-sm m-5">

            <RouterLink :to="{ name: 'blogApi' }"
                class="absolute top-4 left-4 z-10 flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition shadow-sm">
                Back
            </RouterLink>


            <div class="w-full h-[50vh]">
                <img :src="'http://127.0.0.1:8000/storage/' + blogdetailstore.blogContent.image?.image_path"
                    class="object-cover w-full h-full" :alt="blogdetailstore.blogContent.title">
            </div>


            <div class="p-6">

                <div v-if="loginstore.user === blogdetailstore.blogContent.user.email" class="flex gap-2 mb-6">
                    <!-- <button @click="editToggle"
                        class="px-5 py-2.5 rounded-4xl bg-blue-500 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                        {{ isEdit ? 'View blog' : 'Edit Blog' }}
                    </button> -->
                    <!-- <button @click="deleteBlog"
                        class="px-5 py-2.5 rounded-4xl bg-red-500 text-white font-semibold text-sm shadow-sm hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                        Delete
                    </button> -->


                    <PrimaryButton @click="editToggle">
                        {{ isEdit ? 'view' : 'edit' }}
                    </PrimaryButton>

                    <TertiaryButton @click="deleteBlog">Delete</TertiaryButton>


                </div>


                <div v-if="!isEdit">
                    <div class="flex items-center justify-between mb-4 p-3">
                        <span class="px-3 py-1 text-xs font-semibold text-blue-600 uppercase bg-blue-100 rounded-full">
                            {{ blogdetailstore.blogContent.category.name }}
                        </span>
                        <span class="text-sm text-gray-500">
                            Date: {{ blogdetailstore.blogContent.updated_at }}
                        </span>
                    </div>
                    <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {{ blogdetailstore.blogContent.title }}
                    </h1>
                    <p class="leading-relaxed text-gray-700 dark:text-white whitespace-pre-line">
                        {{ blogdetailstore.blogContent.content }}
                    </p>
                </div>


                <div v-else class="mt-4 p-2">

                    <hr class="bg-black">
                    <BlogEdit :blogData="blogdetailstore.blogContent" />
                </div>
            </div>
        </div>

        <div v-else class="text-center py-20 text-gray-500">
            <p>Loading blog content</p>
        </div>
    </div>




</template>
