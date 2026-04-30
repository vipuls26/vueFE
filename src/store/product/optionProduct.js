// option api

import { defineStore } from "pinia";

export const productOption = defineStore('productOption', {
    state: () => ({
        products: [
            {
                id: 1,
                productName: 'mobile',
                price: 8999,
                quantity: 10
            },
            {
                id: 2,
                productName: 'notebook',
                price: 30,
                quantity: 5
            },
            {
                id: 3,
                productName: 'keyboard',
                price: 3000,
                quantity: 5
            },
            {
                id: 4,
                productName: 'mouse',
                price: 700,
                quantity: 5
            },
            {
                id: 5,
                productName: 'cup',
                price: 300,
                quantity: 5
            },
            {
                id: 7,
                productName: 'earhpone',
                price: 100,
                quantity: 0
            }
        ],
    }),

})