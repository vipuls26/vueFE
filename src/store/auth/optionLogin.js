import { defineStore } from "pinia";
import { ref } from "vue";
import apiUrl from "@/services/axios";


export const loginStore = defineStore('loginApi', () => {

    const user = ref(localStorage.getItem('email'));
    const userData = ref(JSON.parse(localStorage.getItem('userData')));
    const token = ref(localStorage.getItem('auth_token'));


    const loading = ref(false);
    const error = ref(null);
    const notification = ref(null);
    const validationErrors = ref({});

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

        } catch (err) {

            const res = err.response;
            if (res.status === 422) {
                // catch error from api for email
                validationErrors.value = res.data.errors || { email: [res.data.message] };
            } else if (res.status === 401) {
                // catch error from api for password
                validationErrors.value = {
                    password: [res.data.message]
                };
            }
            throw err;
        } finally {
            loading.value = false;
        }
    }

    
    return { user, token, userData, loading, error, notification, validationErrors, login };
});