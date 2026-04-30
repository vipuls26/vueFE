<script setup>

import { cartApiOption } from '@/store/productapi/optionCartApi';
import HeaderComponent from '../HeaderComponent.vue';

import { productApiOption } from '@/store/productapi/optionProductApi';

import { onMounted } from 'vue';

// notification
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";

// product
const productStore = productApiOption();

// cart 
const cartStore = cartApiOption();

// notification
const notificationHandle = (() => {
    if (cartStore.productNotification) {
        toast(cartStore.productNotification, {
            "theme": "auto",
            "type": "success",
            "position": "bottom-right",
            "transition": "slide",
            "autoClose": 1000,
            "dangerouslyHTMLString": true
        });

        productStore.notification = null;
    }
})

onMounted(() => {
    productStore.fetchItems();
});


const addToCart = (product) => {
    cartStore.addCart(product);
}

const remove = (product) => {
    cartStore.removeFromCart(product);
    // console.log(product);
}


</script>

<template>
    <HeaderComponent />

    <div v-if="productStore.loading">

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

    <div v-else-if="productStore.error">
        <p>Error : {{ productStore.error }} </p>
    </div>

    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <li v-for="product in productStore.products" :key="product.id"
            class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-slate-300">

            <!-- image -->

            <div v-for="item in cartStore.carts" :key="item.id">
                <div v-if="item.id === product.id">
                    <div
                        class="absolute top-2 right-5 text-sm font-semibold text-gray-600 bg-green-300 p-2 rounded-4xl">
                        Qty: {{ item.qty }}
                    </div>
                </div>
            </div>

            <img :src="product.image" :alt="product.title" class="h-64 w-full object-contain object-center p-4" />


            <!-- detial -->
            <div class="p-5">

                <p class="text-xs text-gray-500 uppercase tracking-wide">{{ product.category }}</p>
                <h3 class="mt-1 text-sm text-gray-700 h-10 overflow-hidden">
                    {{ product.title }}
                </h3>

                <!-- rating + price -->
                <div class="mt-2 flex items-center justify-between">
                    <span class="text-sm font-medium text-black">
                        Rating {{ product.rating['rate'] }}
                    </span>
                    <p class="text-lg font-semibold text-gray-900">₹{{ product.price }}</p>
                </div>


                <div class="m-4">
                    <div v-if="!cartStore.isInCart(product)">
                        <button @click="addToCart(product), notificationHandle()"
                            class="mt-4 w-full bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 p-2 active:scale-95 ">
                            Add to Cart
                        </button>
                    </div>


                    <div v-else class="flex justify-between gap-2">

                        <div>
                            <!-- cart button -->
                            <button @click="addToCart(product), notificationHandle()"
                                class="mt-4 w-full bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 p-3 active:scale-95">
                                Add to Cart
                            </button>
                        </div>

                        <div>
                            <button @click="remove(product)"
                                class="mt-4 bg-amber-500 text-white rounded-md text-sm font-semibold hover:bg-amber-600 p-3 active:scale-95">
                                Remove from cart
                            </button>

                        </div>
                    </div>
                </div>



            </div>
        </li>
    </ul>

</template>