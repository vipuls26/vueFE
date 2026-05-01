<template>
    <header class="bg-white shadow-sm sticky top-0 z-50 dark:bg-slate-900">
        <slot name="header">
            <nav class="mx-auto px-4 sm:px-6 lg:px-8 mb-2" aria-label="Top">
                <div class="flex items-center justify-between py-4 border-b border-gray-200 lg:border-none">
                    <div class="flex items-center">

                        <button @click="isMenuOpen = !isMenuOpen"
                            class="lg:hidden rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                            <span class="sr-only">Open menu</span>
                            <i class="pi pi-bars p-1" style="font-size: 2rem"></i>
                        </button>
                        <RouterLink :to="{ name: 'dashboard' }"
                            class="text-2xl font-bold text-green-600 tracking-tight">
                            E-Store
                        </RouterLink>
                    </div>

                    <div class="hidden lg:flex lg:items-center lg:gap-8">
                        <RouterLink :to="{ name: 'productApi' }" class="dark:text-white"
                            :class="{ 'exact-active': $route.path === '/product-api' }">
                            Api Product
                        </RouterLink>

                        <RouterLink :to="{ name: 'cartApi' }" class="dark:text-white"
                            :class="{ 'exact-active': $route.path === '/cart-api' }">
                            Cart
                        </RouterLink>
                        <RouterLink :to="{ name: 'blogApi' }" class="dark:text-white"
                            :class="{ 'exact-active': $route.path.startsWith('/blog') }">
                            Blog
                        </RouterLink>
                    </div>

                    <div class="ml-auto flex items-center gap-2">
                        <DarkMode />
                        <TertiaryButton @click="handleLogout()" class="hidden md:block">Logout</TertiaryButton>
                    </div>
                </div>

                <div v-show="isMenuOpen" class="lg:hidden border-b border-gray-200">
                    <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">

                        <RouterLink :to="{ name: 'productApi' }" class="px-3 py-2 rounded-md dark:text-white"
                            :class="{ 'exact-active': $route.path === '/product-api' }">Api
                            Product
                        </RouterLink>

                        <RouterLink :to="{ name: 'cartApi' }" class="px-3 py-2 rounded-md dark:text-white"
                            :class="{ 'exact-active': $route.path === '/cart-api' }">
                            Cart
                        </RouterLink>

                        <RouterLink :to="{ name: 'blogApi' }" class="px-3 py-2 rounded-md dark:text-white"
                            :class="{ 'exact-active': $route.path.startsWith('/blog') }">
                            Blog
                        </RouterLink>

                        <BaseButton  label="Logout" variant="tertiary" class="w-25 md:hidden text-center" @click="handleLogout()"></BaseButton> 
                    </div>
                </div>
            </nav>
        </slot>
    </header>
</template>

<script setup>

import router from '@/router';
import { toast } from 'vue3-toastify';
import DarkMode from './utlity/DarkMode.vue';
import TertiaryButton from './baseButton/TertiaryButton.vue';
import { authStore } from '@/store/auth/authStore';
import { ref } from 'vue';
import BaseButton from './baseButton/BaseButton.vue';

const isMenuOpen = ref(false);

const authstore = authStore();
const handleLogout = async () => {
    try {
        await authstore.logout();
        toast.success(authstore.logoutNotification, { position: "top-right", autoClose: 1000, transition: "slide" });
        router.push({ name: 'auth' });
    } catch (err) {
        toast.error('logout failed');
        router.push('/');
    }
};

</script>