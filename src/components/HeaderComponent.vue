<template>
    <header class="bg-white shadow-sm sticky top-0 z-50 dark:bg-slate-900">
        <slot name="header">
            <nav class="mx-auto px-4 sm:px-6 lg:px-8 mb-2" aria-label="Top">
                <div class="flex items-center justify-between py-4 border-b border-gray-200 lg:border-none">


                    <div class="flex items-center">
                        <RouterLink :to="{ name: 'dashboard' }"
                            class="text-2xl font-bold text-green-600 tracking-tight">
                            E-Store
                        </RouterLink>
                    </div>

                    <!-- navigation link -->
                    <div class="hidden lg:flex lg:items-center lg:gap-8">

                        <RouterLink :to="{ name: 'productApi' }" class="dark:text-white">Api Product
                        </RouterLink>

                        <RouterLink :to="{ name: 'cartApi' }" class="dark:text-white"> Cart </RouterLink>

                        <RouterLink :to="{ name: 'blogApi' }" class="dark:text-white">Blog</RouterLink>


                    </div>


                    <div class="ml-auto flex items-center">
                        <div class="flex items-center space-x-4 gap-2">

                            <DarkMode />
                            <!-- <button @click="handleLogout()" class="bg-red-400 text-white rounded-4xl p-2"> Logout </button> -->
                             <TertiaryButton @click="handleLogout()">Logout</TertiaryButton>
                        </div>
                    </div>

                </div>
            </nav>

        </slot>
    </header>
</template>


<script setup>


import router from '@/router';
import { logoutStore } from '@/store/auth/optionLogout';
import { toast } from 'vue3-toastify';
import DarkMode from './utlity/DarkMode.vue';
import TertiaryButton from './baseButton/TertiaryButton.vue';

const logoutstore = logoutStore();


const handleLogout = async () => {
    try {
        await logoutstore.logout();
        toast.success(logoutstore.logoutNotification, { position: "top-right", autoClose: 1000, transition: "slide" });
        router.push('/');
    } catch (err) {
        toast.error('logout failed');
        router.push('/');
    }
};

</script>