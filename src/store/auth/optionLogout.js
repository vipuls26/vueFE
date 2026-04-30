import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { blogStore } from "../blog/blogApi";
import { loginStore } from "./optionLogin";
import apiUrl from "@/services/axios";




// export const logoutApiOption = defineStore('logoutApiOption', {
//     state: () => ({
//         token: null,
//         error: null,
//         logoutNotification: [],
//     }),

//     actions: {
//         async logout() {

//             try {
//                 const auth_token = localStorage.getItem('auth_token');

//                 const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
//                     headers: {
//                         Authorization: `Bearer ${auth_token}`
//                     }
//                 });

//                 // clear local data
//                 this.token = null;
//                 this.user = null;
//                 localStorage.removeItem('auth_token');


//                 this.logoutNotification = response.data.message;

//                 // console.log(this.message);
//                 console.log(this.logoutNotification);

//                 // redirect
//                 router.push('/');

//             } catch (err) {
//                 this.error = err.message;
//                 this.logoutNotification = this.error;
//             }

//         }
//     }
// })





export const logoutStore = defineStore('logoutstore', () => {

    const error = ref(null);
    const logoutNotification = ref("");

    const blogstore = blogStore();

    const loginstore = loginStore();

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

            loginstore.token = null;
            loginstore.user = null;
            loginstore.userData = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('email');
            localStorage.removeItem('userData');
            blogstore.clearBlogs();
        }
    }

    return { error, logoutNotification, logout };
});