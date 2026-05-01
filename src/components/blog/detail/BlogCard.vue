<template>
    <div class="flex">
        <RouterLink :to="{ name: 'blogDetail', params: { id: blog.id } }" class="w-full">
            <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-slate-800  h-full transition-all duration-300 hover:shadow-lg hover:border-gray-300">
                <CardImage :path="blog?.image?.image_path" :alt-text="blog.title"></CardImage>
                <div class="flex flex-1 flex-col justify-between p-4">
                    <div>
                        <TitleComponent :title="blog?.title"></TitleComponent>
                        <BadgeComponent :category="blog?.category?.name"></BadgeComponent>
                        <ContentComponent :content="blog?.content"></ContentComponent>
                    </div>
                    <div v-if="isOwner">
                        <StatusComponent> </StatusComponent>
                    </div>
                    <div class="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div class="flex items-center gap-2">
                            <ProfileImage :path="'profile/69d383729304e.png'"></ProfileImage>
                            <UsernameComponent> {{ blog?.user?.name }}</UsernameComponent>
                        </div>
                        <BlogstatusComponent> {{ blog?.status }} </BlogstatusComponent>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script setup>

import { computed } from 'vue';
import CardImage from '../image/CardImage.vue';
import TitleComponent from './TitleComponent.vue';
import BadgeComponent from './BadgeComponent.vue';
import ContentComponent from './ContentComponent.vue';
import StatusComponent from './StatusComponent.vue';
import ProfileImage from '../image/ProfileImage.vue';
import UsernameComponent from './UsernameComponent.vue';
import BlogstatusComponent from './BlogstatusComponent.vue';

const props = defineProps({
    blog: {
        type: Object,
        required: true
    },
    currentEmail: {
        type: String,
        default: ''
    }
});

const isOwner = computed(() => {
    return props.blog?.user?.email === props.currentEmail;
});

</script>