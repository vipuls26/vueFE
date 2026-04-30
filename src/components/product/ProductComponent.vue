<script setup>
import FooterComponent from '../FooterComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';

// fetch product
import { productOption } from '@/store/product/optionProduct';
import { userCartOption } from '@/store/cart/optionCart';

const store = productOption();

const userCart = userCartOption();

const products = store.products;

// console.log(products);


const addToCart = (product) => {
    product.quantity++;
}

const removeFromCart = (product) => {
    if (product.quantity > 1) {
        product.quantity--;
    }
}


</script>

<template>
    <HeaderComponent />

    <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

            <div v-for="product in products" :key="product.id"
                class="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">

                <div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-1">
                        {{ product.productName }}
                    </h2>

                    <div class="flex justify-between items-end mb-5 pb-2">
                        <p class="text-3xl font-extrabold text-gray-900">
                            ₹ {{ product.price }}
                        </p>


                        <div class="flex items-center space-x-4">

                            <span class="text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                Qty: {{ product.quantity }}
                            </span>


                        </div>

                    </div>

                </div>

                <button v-if="product.quantity > 0"
                    class="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
                    @click="userCart.add(product)">
                    Add to Cart
                </button>

                <button v-else
                    class="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
                    disabled>
                    Add to Cart
                </button>
            </div>

        </div>
    </div>


    <FooterComponent />

</template>