// common method for component a and component b

import { reactive } from "vue";

export const store = reactive({
    count: 0,
    increment() {
        this.count++;
    }
})