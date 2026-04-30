<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import HeaderComponent from '../HeaderComponent.vue';
import BlogEdit from './BlogEdit.vue';
import { blogStore } from '@/store/blog/blogApi';
import Swal from 'sweetalert2';
import TertiaryButton from '../baseButton/TertiaryButton.vue';
import PrimaryButton from '../baseButton/PrimaryButton.vue';
import BlogDetailImageComponent from '../blogdetail/BlogDetailImageComponent.vue';
import CategoryDate from '../blogdetail/CategoryDate.vue';
import TitleContentComponent from '../blogdetail/TitleContentComponent.vue';
import { authStore } from '@/store/auth/authstore';


const route = useRoute();
const blogstore = blogStore();
const authstore = authStore();


const blogId = route.params.id;
const isEdit = ref(false);


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
        blogstore.deleteBlog(blogId);
    } else {
        Swal.fire('Cancelled', 'blog is not deleted', 'error');
    }

};

onMounted(async () => {
    await blogstore.fetchBlogs();
    await blogstore.blogDetail(blogId)
});


</script>

<template>
    <HeaderComponent />

    <div class="flex items-center justify-center">
        <div v-if="blogstore.blogContent"
            class="relative mt-3 mx-auto w-7xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 rounded-lg shadow-sm m-5">

            <RouterLink :to="{ name: 'blogApi' }"
                class="absolute top-4 left-4 z-10 flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition shadow-sm">
                Back
            </RouterLink>

            <BlogDetailImageComponent :path="blogstore.blogContent.image?.image_path"
                :altText="blogstore.blogContent.title"></BlogDetailImageComponent>

            <div class="p-6">

                <div v-if="authstore.user === blogstore.blogContent.user.email" class="flex gap-2 mb-6">
                    <PrimaryButton @click="editToggle"> {{ isEdit ? 'view' : 'edit' }} </PrimaryButton>
                    <TertiaryButton @click="deleteBlog">Delete</TertiaryButton>
                </div>

                <div v-if="!isEdit">
                    <CategoryDate :category="blogstore.blogContent.category.name"
                        :date="blogstore.blogContent.updated_at"></CategoryDate>

                    <TitleContentComponent :title="blogstore.blogContent.title"
                        :content="blogstore.blogContent.content"></TitleContentComponent>
                </div>

                <div v-else class="mt-4 p-2">

                    <hr class="bg-black">
                    <BlogEdit :blogData="blogstore.blogContent" />
                </div>
            </div>
            
        </div>

        <div v-else class="text-center py-20 text-gray-500">
            <p>Loading blog content</p>
        </div>
    </div>

</template>
