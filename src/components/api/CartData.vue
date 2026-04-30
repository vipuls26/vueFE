<script setup>

import { cartApiOption } from '@/store/productapi/optionCartApi';

import { onMounted } from 'vue';
import HeaderComponent from '../HeaderComponent.vue';


// notification
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";

// cart
const cartStore = cartApiOption();



onMounted(() => {
    cartStore.fetchCart();
})

</script>


<template>

    <HeaderComponent />

    <div>
        <!-- loading -->
        <div v-if="cartStore.loading">

            <li v-for="i in 6" :key="i"
                class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden p-4">

                <div class="h-64 w-full bg-gray-200 rounded-md p-4"></div>
                <div class="mt-4 space-y-3">

                    <div class="h-3 w-1/4 bg-gray-200 animate-pulse rounded"></div>

                    <div class="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                    <div class="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>


                    <div class="flex items-center justify-between pt-2">
                        <div class="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                        <div class="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>


                    <div class="h-10 w-full bg-gray-200 animate-pulse rounded-md mt-4"></div>
                </div>
            </li>

        </div>

        <!-- error -->
        <div v-else-if="cartStore.error">
            <p>Error : {{ cartStore.error }} </p>
        </div>

        <!-- cart item -->
        <div v-else class="p-4 md:p-6 rounded-lg shadow-md dark:bg-slate-600">

            <div v-if="cartStore.carts && cartStore.carts.length > 0" class="overflow-x-auto dark:bg-slate-600">


                <div class="flex justify-end">
                    <button class="bg-yellow-500 p-2 rounded-4xl text-white"
                        @click="cartStore.clearCart()">clear
                        cart
                    </button>
                </div>

                <table class="table-auto w-full dark:text-white">
                    <thead>
                        <tr class="p-2">
                            <td>Name</td>
                            <td>Category</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Total</td>
                        </tr>
                    </thead>

                    <tbody v-for="cart in cartStore.carts" :key="cart.id">
                        <tr>
                            <td>{{ cart.title }}</td>
                            <td>{{ cart.category }}</td>
                            <td>{{ cart.qty }}</td>
                            <td>₹ {{ cart.price.toFixed(2) }}</td>
                            <td>₹ {{ cart.price.toFixed(2) * cart.qty }}</td>
                        </tr>
                    </tbody>

                </table>

                <!-- sub total -->
                <div class="flex justify-end p-4">

                    <div class="text-bold text-xl dark:text-white">
                        Total: ₹ {{ cartStore.cartSubTotal.toFixed(2) }}
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="p-10">
                    <p class="text-xl text-center dark:text-white">
                        no product. Start shopping <RouterLink :to="{ name: 'productApi' }" class="underline"> here
                        </RouterLink>
                    </p>
                </div>

            </div>

        </div>

    </div>


</template>