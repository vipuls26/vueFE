<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const toggleDark = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
}

onMounted(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>

<template>

    <button @click="toggleDark" :class="[
        'text-white rounded-4xl transition-colors duration-500',
        isDark ? 'bg-yellow-400' : 'bg-slate-700'
    ]">
        <i :class="[
            isDark ? 'pi pi-sun' : 'pi pi-moon',
            'p-3 block transition-all duration-1000 transform',
            isDark ? 'rotate-0' : 'rotate-270'
        ]"></i>
    </button>

</template>
