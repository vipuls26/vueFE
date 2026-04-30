import { defineStore } from "pinia";
import { ref } from "vue";
import { blogStore } from "./blogApi";


export const blogDetailStore = defineStore('blogDetialStore', () => {

    const blogContent = ref(null);
    const blogDetailNotification = ref("");
    const loading = ref(false);
    const error = ref(null);

    async function blogDetail(blogId) {
        loading.value = true;
        error.value = null;

        try {
            const blogstore = blogStore();
            const targetBlogId = Number(blogId);

            blogContent.value = blogstore.blogs.find(
                (blogdetail) => blogdetail.id === targetBlogId
            );

            return blogContent.value;
        } catch (err) {
            error.value = err;
            blogDetailNotification.value = error.value;
        } finally {
            loading.value = false;
        }
    }

    return { blogContent, blogDetail, loading, error };
});