<script setup>

import router from '@/router';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { Form } from 'vee-validate';
import { blogStore } from '@/store/blog/blogStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import PrimaryButton from '../baseButton/PrimaryButton.vue';
import SecondaryButton from '../baseButton/SecondaryButton.vue';
import BaseInputLabel from '../forminput/BaseInputLabel.vue';
import BaseInput from '../forminput/BaseInput.vue';
import BaseButton from '../baseButton/BaseButton.vue';

const blogstore = blogStore();
const schema = yup.object({
    title: yup.string().required('title is required'),
    content: yup.string()
        .required('description is required')
        .min(10, 'must be at least 10 characters')
        .max(10000, 'cannot exceed 500 characters'),
    category: yup.string().required('category is required'),
});


const route = useRoute();
const editblogId = Number(route.params.id);
const blog = blogstore.blogs.find(obj => obj.id === editblogId);

const formData = ref({
    title: '',
    content: '',
    category: '',
    image: '',
});

if (blog) {
    formData.value = {
        title: blog.title,
        content: blog.content,
        category: blog.category.name,
        image: null
    };
}
const handleEditBlog = async (data) => {
    try {
        await blogstore.editBlog(data, editblogId);
        toast.success(blogstore.notification, { position: "top-right", transition: "slide", autoClose: 500 });
        router.push({ name: 'blogApi' });
    } catch (error) {
        if (error.response && error.response.status === 422) {
            toast.error(`blog edit failed. please try again`, { position: "top-right", transition: "slide", autoClose: 500 })
        }
    }
}

const handleCancle = (() => {
    Swal.fire('Cancelled', 'blog is not updated', 'error');
    router.push({ name: 'blogApi' })
})

</script>

<template>

    <div>
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 uppercase dark:text-gray-50">Edit Blog</h1>
        <Form :validation-schema="schema" :initial-values="formData" @submit="handleEditBlog">
            <div class="flex flex-col gap-4">
                <!-- title -->
                <div>
                    <BaseInputLabel label="title" :required="true" html-for="title" />
                    <BaseInput name="title" :placeholder="'enter title'"
                        :servererror="blogstore.validationErrors?.title" />
                </div>
                <!-- content -->
                <div>
                    <BaseInputLabel label="content" :required="true" html-for="content" />
                    <BaseInput name="content" :placeholder="'enter content'"
                        :servererror="blogstore.validationErrors?.content" />
                </div>
                <!-- category -->
                <div>
                    <BaseInputLabel label="category" :required="true" html-for="category" />
                    <BaseInput name="category" type="select" label="category"
                        :servererror="blogstore.validationErrors?.category">
                        <option v-for="cat in blogstore.category" :key="cat.id" :value="cat.name"
                            class="dark:bg-slate-800">
                            {{ cat.name }}
                        </option>
                    </BaseInput>
                </div>
                <!-- image -->
                <div>
                    <BaseInputLabel label="image" :required="false" html-for="image" />
                    <BaseInput name="image" :placeholder="'upload image'" type="file"
                        :servererror="blogstore.validationErrors?.image"></BaseInput>
                </div>
                <!-- btn -->
                <div class="flex justify-center gap-3">
                    <BaseButton label="Update" type="submit" variant="primary"></BaseButton>
                    <BaseButton label="Cancel" @click="handleCancle" variant="secondary"></BaseButton>
                </div>
            </div>
        </Form>
    </div>

</template>
