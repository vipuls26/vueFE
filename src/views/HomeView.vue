<script setup>

import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';



import CountAComponent from '@/components/CountAComponent.vue';
import CountBComponent from '@/components/CountBComponent.vue';

// pinia
import { userCounter } from '@/store/option';
import { userCounterStore } from '@/store/setup';
import { loginStore } from '@/store/auth/optionLogin';


// option api
const store = userCounter();

// composition api
const storeSetup = userCounterStore();


const loginstore = loginStore();

</script>

<template>
  <main>

    <HeaderComponent />

   
    <!-- 

    <CountAComponent />
    <CountBComponent />

    <hr>

    <div class="flex gap-8 p-3">
      <div>
        <h1> count is {{ store.count }}</h1>
        <h2>double count {{ store.doubleCount }}</h2>
      </div>

      <div>
        <button @click="store.incrementValue()" class="bg-green-300 p-1">click</button>
      </div>

    </div>

    <hr>

    <div class="flex gap-8 p-3">
      <div>
        <h1>name is {{ storeSetup.name }}</h1>
        <p>count : {{ storeSetup.count }}</p>
        <p> double count : {{ storeSetup.doubleIncrement }} </p>
      </div>
      <div>
        <button @click="storeSetup.increment" class="bg-green-300 p-1">click</button>
      </div>
    </div> -->

    <FooterComponent />

  </main>
</template>
