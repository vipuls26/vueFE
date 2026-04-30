import { defineStore } from "pinia";
import { ref } from "vue";
import apiUrl from "@/services/axios";

export const registerStore = defineStore('registerStore', () => {

    const loading = ref(false);
    const error = ref(null);
    const registerNotification = ref("");
    const validationErrors = ref({});

    async function register(credentials) {
        loading.value = true;
        error.value = null;
        validationErrors.value = {};

        try {
            const response = await apiUrl.post('/register', credentials);
            // notifiction
            registerNotification.value = response.data.message;
        } catch (err) {
            // form BE
            if (err.response && err.response.status === 422) {
                validationErrors.value = err.response.data.message;
            }
            // for FE
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }
    
    return { loading, error, registerNotification, validationErrors, register };
});