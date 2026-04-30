<script setup>

import router from '@/router';
import { authStore } from '@/store/auth/authstore';

import { onMounted } from 'vue';

// library ( validation + notification )
import { Form } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import BaseInputLabel from '../forminput/BaseInputLabel.vue';
import BaseInput from '../forminput/BaseInput.vue';


const authstore = authStore();

// for FE
const schema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required').min(5, 'password must contain alteast 5 character'),
});

const handleLogin = async (values) => {
    try {
        await authstore.login(values);
        toast.success(authstore.notification, { position: "top-right", transition: "slide", autoClose: 500 });
        router.push('/home');

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.error('check form input');
        }
    }
};

onMounted(() => {
    authstore.error = null;
    authstore.validationErrors = {};
});

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div class="w-full max-w-md dark:bg-slate-900 rounded-lg shadow-md p-8">
            <h1 class="text-2xl font-bold text-center text-white mb-6 uppercase">Login</h1>

            <Form :validation-schema="schema" @submit="handleLogin" class="space-y-4">

                <div class="flex flex-col gap-4">

                    <!-- email -->
                    <div>
                        <BaseInputLabel label="Email" html-for="email" :required="true"> </BaseInputLabel>
                        <BaseInput name="email" :placeholder="'enter email'"
                            :servererror="authstore.validationErrors?.email" />
                    </div>

                    <!-- password -->
                    <div>
                        <BaseInputLabel html-for="password" :required="true" label="Password"></BaseInputLabel>
                        <BaseInput type="password" name="password" :placeholder="'enter password'"
                            :servererror="authstore.validationErrors?.password">
                        </BaseInput>
                    </div>

                    <!-- button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200">
                            Login
                        </button>
                    </div>

                    <div>
                        <p class="text-center dark:text-white">Don't have account?
                            <RouterLink :to="{ name: 'register' }" class="underline text-blue-400">Register
                            </RouterLink>here
                        </p>
                    </div>

                </div>
            </Form>
        </div>
    </div>
</template>
