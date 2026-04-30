<script setup>
import HeaderComponent from '../HeaderComponent.vue';

import { userCartOption } from '@/store/cart/optionCart';

// cart option 
const cart = userCartOption();

// totoal cart item
const cartItem = cart.cartItem;

// console.log(cartItem.length);

</script>

<template>

    <HeaderComponent />

    <div v-if="cartItem.length !== 0">
        <div class="bg-gray-100 p-6 flex flex-col items-center justify-center">

            <div class="flex w-full justify-end">

                <div>
                    <button
                        class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        @click="cart.clearCart()">
                        Clear cart
                    </button>

                </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

                <div v-for="product in cartItem" :key="product.id"
                    class="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">

                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-1">
                            {{ product.productName }}
                        </h2>

                        <div class="flex justify-between items-end mb-5 pb-2">
                            <p class="text-3xl font-extrabold text-gray-900">
                                ₹ {{ product.price }}
                            </p>
                            <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full ">
                                Qty: {{ product.quantity }}
                            </span>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>

    <div v-else>
        <div class="flex justify-center p-10">
            <p class="text-4xl mb-16 text-gray-700">
                No products added.
                <RouterLink :to="{ name: 'productApi' }" class="text-blue-600 hover:underline font-semibold">
                    Start
                </RouterLink>
                shopping.
            </p>
        </div>


    </div>

</template>
