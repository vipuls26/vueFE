import { defineStore } from "pinia";
import { ref } from "vue";
import apiUrl from "@/services/axios";

export const blogEditStore = defineStore('editBlog', () => {
    const loading = ref(null);
    const error = ref(null);
    const notification = ref(null);
    const validationErrors = ref({});
    const blog = ref(null)

    async function editBlog(data, editblogId) {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('category', data.category);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        formData.append('_method', 'PUT');

        loading.value = true;
        error.value = null;
        validationErrors.value = {};
        const token = localStorage.getItem('auth_token');
        try {
            const response = await apiUrl.put(`blog/${editblogId}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'multipart/form-data',
                }
            });

            blog.value = response.data.data;
            notification.value = response.data.message;
        } catch (err) {
            if (err.response && err.response.status === 422) {
                validationErrors.value = err.response.data.errors;
            }
            throw err;
        } finally {
            loading.value = false
        }
    }
    return { blog, loading, notification, validationErrors, error, editBlog }
});