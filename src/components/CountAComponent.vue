<template>

    <div class="flex gap-6 p-1">
        <div>
            <p> count from a : {{ store.count }}</p>
        </div>

        <div>
            <button @click="store.increment()" class="bg-green-300 p-1 ">click b</button>
        </div>
    </div>

</template>


<script>

import { store } from '@/store/store';
export default {

    data() {
        return {
            store
        }
    }
}

</script>