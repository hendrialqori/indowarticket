<script setup lang="ts">
import ReportCard from './ReportCard.vue';

const reports = [
    {
        icon: 'i-ci-chat-conversation',
        label: 'Total conversation',
        value: '23'
    },
    {
        icon: "i-mage-message-dots",
        label: "Message sent",
        value: "1,221"
    }
]

</script>

<template>
    <div class="space-y-4">
        <h1 class="text-slate-500">Message and support</h1>
        <section class="grid grid-cols-5 gap-4">
            <ReportCard v-for="(report, index) of reports" :key="index" v-bind="report" />
        </section>
    </div>
</template>