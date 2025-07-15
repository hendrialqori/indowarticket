<script setup lang="ts"></script>

<template>
    <div class="flex bg-[#F6F8FA]">
        <AppSidebar />
        <main class="flex-1">
            <AppContentHeader />
            <slot></slot>
        </main>
    </div>
</template>
