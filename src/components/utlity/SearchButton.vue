<template>
    <div>
        <input :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" name="search"
            class="border-2 border-purple-400 hover:purple-500 rounded-4xl mb-2 p-2 dark:text-white dark:placeholder-white placeholder-black" />
    </div>

</template>


<script setup>

defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: 'search blog'
    }
});

defineEmits(['update:modelValue']);

</script>