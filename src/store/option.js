// option api


import { defineStore } from "pinia";

export const userCounter = defineStore('counterOption', {

    // state or data 
    state: () => { return { count: 0 }; },

    // getter or computed
    getters: {
        doubleCount: (state) => {
            return state.count * 2;
        },
        doublePlusOne() {
            return this.doubleCount + 1;
        }
    },
    // action or methods
    actions: {
        incrementValue() {
            this.count++;
        },
    },

})