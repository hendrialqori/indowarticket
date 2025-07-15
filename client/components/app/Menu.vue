<script setup lang="ts">

const menuItems = [
    {
        link: "/auth/dashboard",
        icon: "i-humbleicons-dashboard",
        label: "Dashboard"
    },
    {
        link: "/auth/event",
        icon: "i-mdi-event-note-outline",
        label: "Event"
    },
    {
        link: "/auth/conversation",
        icon: "i-ci-chat-conversation",
        label: "Conversation"
    }
]

</script>

<template>
    <nav class="px-5 py-3 mt-6 space-y-1">
        <AppMenuItem v-for="item of menuItems" :key="item.link" v-bind="item" />
    </nav>
</template>