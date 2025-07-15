<script setup lang="ts">
type Props = {
    link: string;
    icon: string;
    label: string
}
defineProps<Props>();
</script>

<template>
    <NuxtLink :to="link"
        class="flex items-center gap-4 -tracking-wide text-slate-400 hover:bg-slate-100 rounded-md py-2 px-2" prefetch
        exactActiveClass="text-black! font-medium bg-slate-100">
        <UIcon :name="icon" class="size-5" />
        <span class="text-[.95rem]">{{ label }}</span>
    </NuxtLink>
</template>