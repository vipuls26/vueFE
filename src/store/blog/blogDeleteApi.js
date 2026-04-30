import { defineStore } from "pinia";
import apiUrl from "@/services/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import router from "@/router";
import { blogStore } from "./blogApi";


export const blogDeleteStore = defineStore('deleteBlogStore', () => {
    const error = ref(null);
    const notification = ref(null);
    const validationErrors = ref(null);
    const blogstore = blogStore();

    async function deleteBlog(deleteBlogId) {

        error.value = null;
        notification.value = null;

        const token = localStorage.getItem('auth_token');

        try {
            const response = await apiUrl.delete(`blog/${deleteBlogId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200 || response.status === 204) {
                toast.success(`blog delete successfully`, response.data.message), {
                    position: "top-right", transition: "slide", autoClose: 500
                };

                const id = Number(response.data.blogId);
                const updateBlogs = blogstore.blogs.filter(item => item.id != id)
                blogstore.blogs = updateBlogs;

                router.push({ name: 'blogApi' })
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                validationErrors.value = error.response.data.message;

                toast.error(`requested blog does not exist`, validationErrors.value), {
                    position: "top-right", transition: "slide", autoClose: 500
                };
            }
            throw error;
        }
    }

    return { deleteBlog, notification, error }
})