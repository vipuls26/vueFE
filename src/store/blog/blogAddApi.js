import { defineStore } from "pinia";
import { ref } from "vue";
import apiUrl from "@/services/axios";


export const addBlogApi = defineStore('addBlog', () => {
    const loading = ref(null);
    const error = ref(null);
    const notification = ref(null);
    const validationErrors = ref({});
    const blog = ref(null)


    async function addBlog(data) {
        loading.value = true;
        error.value = null;
        validationErrors.value = {};
        const token = localStorage.getItem('auth_token');

        try {
            const response = await apiUrl.post('/blog/create', data, {
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
            throw error;
        } finally {
            loading.value = false
        }

    }

    return { blog, loading, notification, validationErrors, error, addBlog }
})