<script setup>

import { ref, onUnmounted } from 'vue';
import router from '@/router';
import { toast } from 'vue3-toastify';
import { authStore } from '@/store/auth/authstore';

// validation library
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import BaseInputLabel from '../forminput/BaseInputLabel.vue';
import BaseInput from '../forminput/BaseInput.vue';


const authstore = authStore();


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
        await authstore.register(values);
        // toast notification
        toast.success(authstore.registerNotification);
        router.push({ name: 'auth' });
    } catch (error) {
        if (error.response && error.response.status === 422) {
            toast.error(`registration failed. please try again`, { position: "top-right", transition: "slide", autoClose: 500 })
        }
    }
};

onUnmounted(() => {
    authstore.validationErrors = {};
    authstore.error = null;
})

</script>

<template>

    <div class="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div class="w-full max-w-md bg-slate-900 rounded-lg shadow-md p-8">
            <h1 class="text-2xl font-bold text-center text-white mb-6 uppercase">Register</h1>

            <Form :validation-schema="schema" @submit="handleRegister" class="space-y-4">

                <div class="flex flex-col gap-4">
                    <!-- name -->
                    <div>
                        <BaseInputLabel label="name" html-for="name" :required="true" />
                        <BaseInput name="name" :placeholder="'enter name'"
                            :servererror="authstore.validationErrors?.name" />
                    </div>
                    <!-- email -->
                    <div>
                        <BaseInputLabel label="email" html-for="email" :required="true" />
                        <BaseInput name="email" :placeholder="'enter email'"
                            :servererror="authstore.validationErrors?.email" />
                    </div>
                    <!-- password -->
                    <div>
                        <BaseInputLabel label="password" html-for="password" :required="true" />
                        <BaseInput type="password" name="password" :placeholder="'enter password'"
                            :servererror="authstore.validationErrors?.password" />
                    </div>
                    <!-- confirm password password_confirmation -->
                    <div>
                        <BaseInputLabel label="password_confirmation" html-for="password_confirmation" :required="true" />
                        <BaseInput type="password" name="password_confirmation" :placeholder="'enter confirm password'"
                            :servererror="authstore.validationErrors?.password_confirmation" />
                    </div>
                    <!-- role -->
                    <div>
                        <BaseInputLabel label="role" html-for="role" :required="true" />
                        <div class="flex gap-3">
                            <div class="flex items-center gap-1">
                                <Field name="role" type="radio" value="user" id="user"
                                    class="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-400" />
                                <label for="user" class="ml-2 text-lg  text-white">User</label>
                            </div>
                            <div class="flex items-center gap-1">
                                <Field name="role" type="radio" value="admin" id="admin"
                                    class="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-400" />
                                <label for="admin" class="ml-2 text-lg text-white">Admin</label>
                            </div>

                            <span v-if="authstore.validationErrors?.role" class="text-sm text-red-400">
                                {{ authstore.validationErrors.role[0] }}
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
                        <p class="text-center text-white">Already have account?
                            <RouterLink :to="{ name: 'auth' }" class="underline text-blue-400">Login</RouterLink>
                            here
                        </p>
                    </div>

                </div>
            </Form>

        </div>
    </div>

</template>
