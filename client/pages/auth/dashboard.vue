<script setup lang="ts">
import OverviewReport from '@/features/dashboard/components/OverviewReport.vue'
import MessageReport from '@/features/dashboard/components/MessegeReport.vue'

useHead({
    title: 'Dashboard overview'
})

definePageMeta({
    layout: 'auth'
})


</script>

<template>
    <section class="m-4 px-8 py-8 bg-white rounded-lg border border-slate-200 space-y-12">
        <div class="flex items-center gap-4">
            <div class="rounded-full size-12 bg-slate-100 grid place-content-center">
                <UIcon name="i-humbleicons-dashboard" class="size-6" />
            </div>
            <div>
                <h2 class="font-bold text-lg">Welcome, Hendri :)</h2>
                <p>Analyze event statistics, ticket sales, and user activity in one dashboard.</p>
            </div>
        </div>
        <OverviewReport />
        <MessageReport />
    </section>
</template>