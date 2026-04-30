// option api for product

import axios from "axios";
import { defineStore } from "pinia";

export const productApiOption = defineStore('productOptionApi', {
    state: () => ({
        products: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchItems() {
            this.loading = true;
            try {

                if (this.products.length === 0) {
                    const response = await axios.get('https://fakestoreapi.com/products');
                    this.products = response.data;
                } else {
                    return this.products;
                }


            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

    },
});