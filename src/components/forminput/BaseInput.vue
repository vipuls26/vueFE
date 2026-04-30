<template>
    <Field :name="name" v-slot="{ field, errorMessage, handleChange }">
        <div class="w-full">

            <select v-if="type === 'select'" v-bind="$attrs" :class="[
                'w-full px-3 py-2 border-2 outline-none rounded-md dark:bg-slate-800 dark:text-gray-50',
                (errorMessage || servererror)
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
            ]">
                <slot></slot>
            </select>


            <input v-else-if="type === 'file'" type="file" v-bind="$attrs" @change="(e) => {
                const file = e.target.files[0];
                if (file) {
                    handleChange(file)
                } else {
                    handleChange(null)
                }

            }" :class="[
                'w-full px-3 py-2 border-2 outline-none rounded-md dark:text-gray-50',
                (errorMessage || servererror)
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
            ]" />


            <input v-else v-bind="{ ...field, ...$attrs }" :placeholder="placeholder" :class="[
                'w-full px-3 py-2 border-2 outline-none rounded-md dark:text-gray-50 dark:placeholder-white',
                (errorMessage || servererror)
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400'
            ]" />


            <p v-if="errorMessage || servererror" class="text-red-400 text-sm mt-1">
                {{ errorMessage || (Array.isArray(servererror) ? servererror.join(', ') : servererror) }}
            </p>

        </div>
    </Field>
</template>

<script setup>
import { Field } from 'vee-validate';

defineProps({
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    servererror: { type: [String, Array], default: '' }
});
</script>
