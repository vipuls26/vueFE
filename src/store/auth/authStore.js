import { defineStore } from "pinia";
import { ref } from "vue";
import apiUrl from "@/services/axios";
import { blogStore } from "../blog/blogStore";
import router from "@/router";


export const authStore = defineStore('authStore', () => {
    const user = ref(localStorage.getItem('email'));
    const userData = ref(JSON.parse(localStorage.getItem('userData')));
    const token = ref(localStorage.getItem('auth_token'));


    const loading = ref(false);
    const error = ref(null);
    const notification = ref(null);
    const validationErrors = ref({});

    const logoutNotification = ref("");
    const registerNotification = ref("");
    const blogstore = blogStore();

    async function login(credentials) {

        loading.value = true;
        error.value = null;
        validationErrors.value = {};

        try {
            const response = await apiUrl.post('/login', credentials)

            // data from BE
            token.value = response.data.token;
            user.value = response.data.data.email;
            userData.value = response.data.data;
            notification.value = response.data.message;

            // token set in local storage
            localStorage.setItem('auth_token', token.value);
            localStorage.setItem('email', user.value)
            localStorage.setItem('userData', JSON.stringify(userData.value));

            router.push({ name: 'dashboard' })

        } catch (err) {

            const res = err.response;
            if (res.status === 422) {
                validationErrors.value = res.data.errors || { email: [res.data.message] };
            } else if (res.status === 401) {
                validationErrors.value = {
                    password: [res.data.message]
                };
            }
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            const auth_token = localStorage.getItem('auth_token');

            const response = await apiUrl.post(`logout`, {}, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
            });
            logoutNotification.value = response.data.message;
            return true;


        } catch (err) {
            error.value = err.message;
        } finally {

            token.value = null;
            user.value = null;
            userData.value = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('email');
            localStorage.removeItem('userData');
            blogstore.clearBlogs();
        }
    }

    async function register(credentials) {
        loading.value = true;
        error.value = null;
        validationErrors.value = {};

        try {
            const response = await apiUrl.post('/register', credentials);
            registerNotification.value = response.data.message;
        } catch (err) {
            if (err.response && err.response.status === 422) {
                validationErrors.value = err.response.data.errors || {};
            }
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchUser() {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await apiUrl.post('/usertoken', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('auth_token');
                router.push({ name: 'auth' });
            } else {
                console.error('Fetch user failed due to other error:', error.message);
            }
        }
    }


    return { user, token, userData, error, notification, validationErrors, login, logoutNotification, logout, loading, error, registerNotification, validationErrors, register, fetchUser };
});