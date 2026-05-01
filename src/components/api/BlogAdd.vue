<template>

    <HeaderComponent />

    <div class="flex items-center justify-center">
        <div
            class="relative mx-auto w-7xl overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow-sm m-5 border-2border-slate-50">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 uppercase dark:text-white p-3">Add Blog</h1>

            <Form :validation-schema="schema" @submit="handleAddBlog">
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
                            <option value="" selected class="dark:bg-slate-800">Select category</option>
                            <option v-for="cat in blogstore.category" :key="cat.id" :value="cat.name"
                                class="dark:bg-slate-800">
                                {{ cat.name }}
                            </option>
                        </BaseInput>
                    </div>

                    <!-- image -->
                    <div>
                        <BaseInputLabel label="image" :required="true" html-for="image" />
                        <BaseInput name="image" :placeholder="'upload image'" type="file"
                            :servererror="blogstore.validationErrors?.image"></BaseInput>
                    </div>

                    <div class="flex justify-center p-4">
                        <PrimaryButton type="submit">Add</PrimaryButton>
                    </div>

                </div>
            </Form>
        </div>
    </div>

</template>

<script setup>

import HeaderComponent from '../HeaderComponent.vue';

import router from '@/router';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { Form } from 'vee-validate';
import { blogStore } from '@/store/blog/blogStore';
import PrimaryButton from '../baseButton/PrimaryButton.vue';
import BaseInput from '../forminput/BaseInput.vue';
import BaseInputLabel from '../forminput/BaseInputLabel.vue';

const blogstore = blogStore();
const schema = yup.object({
    title: yup.string().required('title is required'),
    content: yup.string()
        .required('description is required')
        .min(10, 'must be at least 10 characters')
        .max(500, 'cannot exceed 500 characters'),
    category: yup.string().required('category is required'),
    image: yup.string().required()
});

const handleAddBlog = async (data) => {

    try {
        await blogstore.addBlog(data);
        toast.success(`blogstore.notification`, { position: "top-right", transition: "slide", autoClose: 500 });
        router.push({ name: 'blogApi' })
    } catch (error) {
        if (error.response && error.response.status === 422) {
            toast.error(`blog add failed. please try again`, { position: "top-right", transition: "slide", autoClose: 500 })
        }
    }
}

</script>