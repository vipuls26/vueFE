<template>
  <div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      name="search"
      class="border-2 border-purple-400 hover:border-purple-500 rounded-full mb-2 p-2 dark:text-white dark:placeholder-white placeholder-black"
    />
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
