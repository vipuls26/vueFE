import apiUrl from "@/services/axios";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import router from "@/router";
import { authStore } from "../auth/authStore";


export const blogStore = defineStore('blogStore', () => {
    const blogs = ref([]);
    const category = ref([]);
    const pagination = reactive({
        current_page: 1,
        last_page: 1,
    });

    const authstore = authStore();

    const blogNotification = ref("");
    const notification = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const currentUser = ref(null);

    // blog selected category
    const selectedCategory = ref(0);
    const selectedCategories = ref([]);

    // blog detail
    const blogContent = ref(null);
    const blogDetailNotification = ref("");


    // validations
    const validationErrors = ref({});

    // delete blog
    const updateBlogs = ref({});

    const results = ref({});

    // blogs
    async function fetchBlogs(page = 1, search = '') {
        loading.value = true;
        error.value = null;

        try {
            if (blogs.value.length === 0) {

                const response = await apiUrl.get('blog/allblogs', {
                    params: {
                        page: page,
                        ...(search && { search: search })
                    }
                });

                const apiData = response.data.data;

                blogs.value = apiData.data;

                pagination.current_page = apiData.current_page;
                pagination.last_page = apiData.last_page;

                blogNotification.value = response.data.message;
            } else {
                return blogs.value;
            }

        } catch (err) {

            blogs.value = [];
            pagination.current_page = 1;
            pagination.last_page = 1;

            if (err.response && err.response.status === 404) {
                blogNotification.value = err.response.data.message;
            }

        } finally {
            loading.value = false;
        }
    }

    // category
    async function fetchCategories() {

        if (category.value.length === 0) {
            const categoriesResponse = await apiUrl.get('/categories');

            const apiDataCategory = categoriesResponse.data;

            category.value = apiDataCategory.category;
        } else {
            return category.value;
        }
    }

    // sync data with database 
    async function syncDataBase() {
        const result = await Swal.fire({
            title: 'Sync Data?',
            text: 'Please confirm to sync current data with database',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, sync it!',
            cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {

            try {

                // old data
                const oldDB = JSON.stringify(blogs.value);

                // new data
                const syncDb = await apiUrl.get('/blog/allblogs');
                const apiData = syncDb.data.data;

                const newDb = JSON.stringify(apiData)

                if (oldDB !== newDb) {
                    console.log('new data added');
                    blogs.value = apiData.data;
                    return blogs.value
                } else {
                    console.log('no change');
                    return blogs.value;
                }


            } catch (err) {
                blogs.value = [];
                pagination.current_page = 1;
                pagination.last_page = 1;

                if (err.response && err.response.status === 404) {
                    blogNotification.value = err.response.data.message;
                }
            }

        } else {
            Swal.fire('Cancelled', 'No sync to database', 'error');
        }
    }

    function setCategory(category) {
        const id = category.id;

        const index = selectedCategories.value.indexOf(id);
        if (index === -1) {
            selectedCategories.value.push(id);
        } else {
            selectedCategories.value.splice(index, 1);
        }
    }

    function clearFilters() {
        selectedCategories.value = [];
    }

    function clearBlogs() {
        blogs.value = [];
        console.log('blog clear call');
    }

    // blog add
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
            blogs.value = response.data.data;
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

    // blog delete
    async function deleteBlog(deleteBlogId) {

        error.value = null;
        notification.value = null;
        updateBlogs.value = null;

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
                const updateBlogs = blogs.value.filter(item => item.id != id)
                blogs.value = updateBlogs;
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

    // blog edit
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

    // blog detial
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


    const search = ref('');

    const filterBlog = computed(() => {

        let results = blogs.value;

        if (selectedCategories.value.length > 0) {
            results = results.filter(blog => selectedCategories.value.includes(blog.category_id));
        }

        if (search.value.trim() !== '') {
            results = results.filter(blog =>
                blog.title.toLowerCase().includes(search.value.toLowerCase())
            );
        }
        return results;
    });

    const emailToSearch = authstore.user;
    const isOwner = blogs.value.some(blog => blog.user.email === emailToSearch);


    return {
        blogs, blogNotification,
        blogContent, blogDetail,
        loading, pagination, error,
        fetchBlogs, fetchCategories,
        category, setCategory, filterBlog, selectedCategory,
        clearFilters, selectedCategories, search, currentUser,
        syncDataBase, clearBlogs,
        deleteBlog, notification,
        editBlog, addBlog,
        validationErrors, isOwner
    };

});