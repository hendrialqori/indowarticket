<script setup lang="ts">
import ReportCard from './ReportCard.vue';

const reports = [
    {
        icon: 'i-mdi-dollar',
        label: 'Revenue',
        value: 'Rp 11,432,000 ,-'
    },
    {
        icon: "i-humbleicons-user",
        label: "Total users",
        value: "104,212"
    },
    {
        icon: "i-mdi-event-note-outline",
        label: "Total events",
        value: "16"
    },
    {
        icon: 'i-carbon-event-schedule',
        label: 'Event With Most Sales',
        value: '1201'
    }
]

</script>

<template>
    <div class="space-y-4">
        <h1 class="text-slate-500">Overview</h1>
        <section class="grid grid-cols-5 gap-4">
            <ReportCard v-for="(report, index) of reports" :key="index" v-bind="report" />
        </section>
    </div>
</template>