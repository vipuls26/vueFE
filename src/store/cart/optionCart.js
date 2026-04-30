// option api

import router from "@/router";
import { defineStore } from "pinia";

export const userCartOption = defineStore('userCartOption', {

    // data  or source of truth
    state: () => ({
        cartItem: [],
    }),

    // computed 
    getters: {

        // total item 
        totalItem: (state) => state.cartItem.length,

        // total sum
        total: (state) => state.cartItem.reduce((sum, product) => sum + product.price, 0),

    },

    // methods 
    actions: {

        add(product) {
            const inCart = this.cartItem.find(item => item.id === product.id)
            if(inCart) {
                inCart.quantity;
                console.log("product add in cart");
            } else {
               this.cartItem.push(product);
            }
        },

        clearCart() {
            // console.log("cart clear");
            this.cartItem = [];
            router.push('/products');
        }
    }
})