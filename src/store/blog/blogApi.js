import apiUrl from "@/services/axios";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import Swal from "sweetalert2";


export const blogStore = defineStore('blogStore', () => {
    const blogs = ref([]);
    const category = ref([]);
    const pagination = reactive({
        current_page: 1,
        last_page: 1,
    });

    const blogNotification = ref("");
    const loading = ref(false);
    const error = ref(null);
    const currentUser = ref(null);

    // blog selected category
    const selectedCategory = ref(0);
    const selectedCategories = ref([]);

    // blogs
    async function fetchBlogs(page = 1, search = '') {
        loading.value = true;
        error.value = null;

        try {
            if (blogs.value.length === 0) {
                const url = `http://127.0.0.1:8000/api/blog/allblogs`;

                const response = await axios.get(url, {
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

    const search = ref('');

    const filterBlog = computed(() => {

        let results = blogs.value;

        if (selectedCategories.value.length > 0) {
            results = results.filter((blog) =>
                selectedCategories.value.includes(blog.category_id)
            );
        }

        if (search.value.trim() !== '') {
            results = results.filter(blog =>
                blog.title.toLowerCase().includes(search.value.toLowerCase())
            );
        }

        return results;
    });

    function clearFilters() {
        selectedCategories.value = [];
    }

    function clearBlogs() {
        blogs.value = [];
        console.log('blog clear call');
    }

    return { blogs, blogNotification, loading, pagination, error, fetchBlogs, fetchCategories, category, setCategory, filterBlog, selectedCategory, clearFilters, selectedCategories, search, currentUser, syncDataBase, clearBlogs };

});