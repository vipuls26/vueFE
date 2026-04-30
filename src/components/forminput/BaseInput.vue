<template>
    <Field :name="name" v-slot="{ field, errorMessage, handleChange }">
        
        <div class="w-full relative">

            
            <select v-if="type === 'select'" v-bind="{ ...field, ...$attrs }" :class="inputClasses(errorMessage)">
                <slot></slot>
            </select>

            
            <input v-else-if="type === 'file'" type="file" v-bind="$attrs"
                @change="(e) => handleChange(e.target.files[0] || null)" :class="inputClasses(errorMessage)" />

            
            <input v-else v-bind="{ ...field, ...$attrs }"
                :type="type === 'password' ? (showPassword ? 'text' : 'password') : type" :placeholder="placeholder"
                :class="inputClasses(errorMessage)" />

            
            <button v-if="type === 'password'" type="button" @click="showPassword = !showPassword"
                class="absolute top-0 right-0 h-[44px] px-3 flex items-center text-gray-500 hover:text-amber-600">
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>

            
            <p v-if="errorMessage || servererror" class="text-red-400 text-sm mt-1">
                {{ errorMessage || (Array.isArray(servererror) ? servererror.join(', ') : servererror) }}
            </p>
        </div>
    </Field>
</template>

<script setup>
import { ref } from 'vue';
import { Field } from 'vee-validate';

const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    servererror: { type: [String, Array], default: '' }
});

const showPassword = ref(false);

const inputClasses = (errorMessage) => [
    'w-full px-3 py-2 border-2 outline-none rounded-md dark:bg-slate-800 dark:text-gray-50 dark:placeholder-white',
    (errorMessage || props.servererror)
        ? 'border-red-400 focus:ring-2 focus:ring-red-400'
        : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
];
</script>
