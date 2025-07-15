<script setup lang="ts">
import TableEvent from "@/features/event/components/TableEvent.vue"

useHead({
    title: 'Event'
})

definePageMeta({
    layout: 'auth'
})

</script>

<template>
    <section class="m-4 px-8 py-8 bg-white rounded-lg border border-slate-200 space-y-8">
        <div class="flex items-center gap-4">
            <div class="rounded-full size-12 bg-slate-100 grid place-content-center">
                <UIcon name="i-mdi-event-note-outline" class="size-6" />
            </div>
            <div>
                <h2 class="font-bold text-lg">Event</h2>
                <p>Centralized management for all event tickets.</p>
            </div>
        </div>
        <TableEvent />
    </section>
</template>