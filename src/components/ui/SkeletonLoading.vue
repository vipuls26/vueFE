<template>
    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="i in 4" :key="i" class="p-3">
            <div
                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white animate-pulse">

                <div class="aspect-video w-full bg-gray-300"></div>

                <div class="flex flex-1 flex-col justify-between p-4 space-y-4">
                    <div>

                        <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

                        <div class="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

                        <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>


                    <div class="flex items-center justify-between mt-6">
                        <div class="flex items-center gap-2">
                            <div class="h-8 w-8 rounded-full bg-gray-300"></div>
                            <div class="h-4 bg-gray-300 rounded w-12"></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>