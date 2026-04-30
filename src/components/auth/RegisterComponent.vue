<script setup>

import { ref, onUnmounted } from 'vue';
import router from '@/router';
import { registerStore } from '@/store/auth/optionRegister';
import { toast } from 'vue3-toastify';

// validation library
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const registerstore = registerStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// validation message
const schema = yup.object({
    name: yup.string().required('name is required').min(2, 'name must be alteast 2 charatcer'),
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required').min(5, 'password must contain alteast 5 character'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('confirm password is required'),
    role: yup.mixed().oneOf(['user', 'admin'], 'invalid role selected').required('role is requried')
});

const handleRegister = async (values) => {
    try {
        // call function from store 
        await registerstore.register(values);
        // toast notification
        toast.success(registerstore.registerNotification);
        router.push('/');
    } catch (error) {
        if (error.response && error.response.status === 422) {
            toast.error(`registration failed. please try again`, { position: "top-right", transition: "slide", autoClose: 500 })
        }
    }
};

onUnmounted(() => {
    registerstore.validationErrors = {};
    registerstore.error = null;
})

</script>

<template>

    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 uppercase">Register</h1>

            <Form :validation-schema="schema" @submit="handleRegister" class="space-y-4">

                <div class="flex flex-col gap-4">

                    <!-- name -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name<span
                                class="text-red-500">*</span></label>
                        <Field name="name" v-slot="{ field, errorMessage }">
                            <input v-bind="field" type="text" placeholder="enter name" :class="[
                                'w-full px-3 py-2 border-2 outline-none rounded-md',
                                (errorMessage || registerstore.validationErrors?.name)
                                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                            ]" />
                        </Field>



                        <ErrorMessage name="name" class="text-sm text-red-400" />
                        <span v-if="registerstore.validationErrors?.name" class="text-sm text-red-400">
                            {{ registerstore.validationErrors.name[0] }}
                        </span>
                    </div>

                    <!-- email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email<span
                                class="text-red-500">*</span></label>
                        <Field name="email" v-slot="{ field, errorMessage }">
                            <input v-bind="field" type="email" placeholder="enter email" :class="[
                                'w-full px-3 py-2 border-2 outline-none rounded-md',
                                (errorMessage || registerstore.validationErrors?.email)
                                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                            ]" />

                        </Field>


                        <ErrorMessage name="email" class="text-sm text-red-400" />
                        <span v-if="registerstore.validationErrors?.email" class="text-sm text-red-400">
                            {{ registerstore.validationErrors.email[0] }}
                        </span>
                    </div>

                    <!-- password -->
                    <div class="mt-4">
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password<span
                                class="text-red-500">*</span></label>

                        <div class="relative">

                            <Field name="password" v-slot="{ field, errorMessage }">
                                <input v-bind="field" :type="showPassword ? 'text' : 'password'"
                                    placeholder="enter password" :class="[
                                        'w-full px-3 py-2 border-2 outline-none rounded-md',
                                        (errorMessage || registerstore.validationErrors?.password)
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                                    ]" />

                            </Field>


                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 p-3 flex items-center text-sm leading-5 text-gray-500 hover:text-amber-600">
                                <span v-if="!showPassword">
                                    <i class="pi pi-eye"></i>
                                </span>
                                <span v-else>
                                    <i class="pi pi-eye-slash"></i>
                                </span>
                            </button>
                        </div>

                        <ErrorMessage name="password" class="text-sm text-red-400" />
                        <span v-if="registerstore.validationErrors?.password" class="text-sm text-red-400">
                            {{ registerstore.validationErrors.password[0] }}
                        </span>
                    </div>

                    <!-- confirm password -->
                    <div class="mt-4">
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirm
                            Password<span class="text-red-500">*</span></label>

                        <div class="relative">

                            <Field name="password_confirmation" v-slot="{ field, errorMessage }">
                                <input v-bind="field" :type="showConfirmPassword ? 'text' : 'password'"
                                    placeholder="confirm password" :class="[
                                        'w-full px-3 py-2 border-2 outline-none rounded-md',
                                        (errorMessage || registerstore.validationErrors?.password_confirmation)
                                            ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
                                    ]" />
                            </Field>


                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute inset-y-0 right-0 p-3 flex items-center text-sm leading-5 text-gray-500 hover:text-amber-600">
                                <span v-if="!showConfirmPassword">
                                    <i class="pi pi-eye"></i>
                                </span>
                                <span v-else>
                                    <i class="pi pi-eye-slash"></i>
                                </span>
                            </button>
                        </div>

                        <ErrorMessage name="password_confirmation" class="text-sm text-red-400" />

                        <span v-if="registerstore.validationErrors?.password_confirmation" class="text-sm text-red-400">
                            {{ registerstore.validationErrors.password_confirmation[0] }}
                        </span>
                    </div>

                    <!-- role -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Role<span
                                class="text-red-500">*</span></label>
                        <div class="flex gap-3">
                            <div class="flex items-center gap-1">
                                <Field name="role" type="radio" value="user" id="user"
                                    class="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-400" />
                                <label for="user" class="ml-2 text-sm text-gray-700">User</label>
                            </div>
                            <div class="flex items-center gap-1">
                                <Field name="role" type="radio" value="admin" id="admin"
                                    class="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-400" />
                                <label for="admin" class="ml-2 text-sm text-gray-700">Admin</label>
                            </div>

                            <span v-if="registerstore.validationErrors?.role" class="text-sm text-red-400">
                                {{ registerstore.validationErrors.role[0] }}
                            </span>
                        </div>
                    </div>

                    <!-- button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200">
                            Register
                        </button>
                    </div>

                    <div>
                        <p class="text-center">Already have account?
                            <RouterLink :to="{ name: 'auth' }" class="underline text-blue-400">Login</RouterLink>
                            here
                        </p>
                    </div>

                </div>
            </Form>

        </div>
    </div>

</template>
