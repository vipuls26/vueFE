// composition api

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const userCounterStore = defineStore('counterComposition', () => {

    // state or data
    const count = ref(0);
    const name = ref('jhon');

    // getter or computed
    const doubleIncrement = computed(() => count.value * 2)

    // action or method
    function increment(){
        count.value++;
    }

    return { count, name, doubleIncrement, increment }
})