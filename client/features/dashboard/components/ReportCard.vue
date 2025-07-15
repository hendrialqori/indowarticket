<script setup lang="ts">
type Props = {
    icon: string;
    label: string;
    value: string;
}
defineProps<Props>();
</script>

<template>
    <figure class="border border-slate-200 flex flex-col justify-between rounded-lg bg-slate-50 p-4 h-44">
        <div class="size-12 grid place-content-center rounded-full bg-slate-100">
            <UIcon :name="icon" size="25" />
        </div>
        <figcaption>
            <span class="text-muted text-sm">{{ label }}</span>
            <p class="font-bold text-xl">{{ value }}</p>
        </figcaption>
    </figure>
</template>