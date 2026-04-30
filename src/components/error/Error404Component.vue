<template>

<section class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="text-center">
    <div class="space-y-4">
      <h1 class="text-9xl font-extrabold text-gray-900 tracking-widest">
        404
      </h1>
      <p class="text-2xl text-gray-600">Page Not Found</p>
      <RouterLink 
        :to="{ name: 'auth'}" 
        class="inline-block mt-5 px-6 py-3  text-white font-semibold rounded-lg shadow transition"
      >
        Back to Homepage
      </RouterLink>
    </div>
  </div>
</section>


</template>