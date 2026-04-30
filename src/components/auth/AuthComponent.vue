<script setup>

import router from '@/router';
import { loginStore } from '@/store/auth/optionLogin';

import { onMounted, ref } from 'vue';

// library ( validation + notification )
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";


const loginstore = loginStore();

const showPassword = ref(false);

// for FE
const schema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required').min(5, 'password must contain alteast 5 character'),
});

const handleLogin = async (values) => {
    try {
        await loginstore.login(values);
        toast.success(loginstore.notification, { position: "top-right", transition: "slide", autoClose: 500 });
        router.push('/home');

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.error('check form input');
        }
    }
};

onMounted(() => {
    loginstore.error = null;
    loginstore.validationErrors = {};
});

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 uppercase">Login</h1>

            <Form :validation-schema="schema" @submit="handleLogin" class="space-y-4">

                <div class="flex flex-col gap-4">

                    <!-- email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email<span class="text-red-500">*</span></label>

                        <Field name="email" v-slot="{ field, errorMessage }">
                            <input v-bind="field" type="email" placeholder="enter email" :class="[
                                'w-full px-3 py-2 border-2 outline-none rounded-md',
                                (errorMessage || loginstore.validationErrors?.email)
                                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                            ]" />
                        </Field>

                        <ErrorMessage name="email" class="text-sm text-red-400" />
                        <span v-if="loginstore.validationErrors?.email" class="text-sm text-red-400">
                            {{ loginstore.validationErrors.email[0] }}
                        </span>


                    </div>

                    <!-- password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password<span class="text-red-500">*</span></label>

                        <div class="relative">

                            <Field name="password" v-slot="{ field, errorMessage }">
                                <input v-bind="field" :type="showPassword ? 'text' : 'password'"
                                    placeholder="enter password" :class="[
                                        'w-full px-3 py-2 border-2 outline-none rounded-md',
                                        (errorMessage || loginstore.validationErrors?.password)
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                                    ]" />

                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 p-3 flex items-center text-sm leading-5 text-gray-500 hover:text-amber-600">
                                    <span v-if="!showPassword">
                                        <i class="pi pi-eye"></i>
                                    </span>
                                    <span v-else>
                                        <i class="pi pi-eye-slash"></i>
                                    </span>
                                </button>

                            </Field>

                        </div>

                        <ErrorMessage name="password" class="text-sm text-red-400" />
                        <span v-if="loginstore.validationErrors?.password" class="text-sm text-red-400">
                            {{ loginstore.validationErrors.password[0] }}
                        </span>

                    </div>

                    <!-- button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200">
                            Login
                        </button>
                    </div>

                    <div>
                        <p class="text-center">Don't have account?
                            <RouterLink :to="{ name: 'register' }" class="underline text-blue-400">Register
                            </RouterLink>here
                        </p>
                    </div>

                </div>
            </Form>
        </div>
    </div>
</template>
