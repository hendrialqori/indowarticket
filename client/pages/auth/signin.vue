<script setup lang="ts">
useHead({
    title: 'Signin'
})
</script>

<template>
    <main class="min-h-screen w-full flex justify-center items-center bg-slate-50 px-3">
        <UCard as="div" class="w-96 bg-white">
            <template #header>
                <h1 class="text-lg text-black font-semibold">Welcome back, buddy!</h1>
                <p>Sign in to access your dashboard</p>
            </template>
            <div>
                <UButton color="neutral" variant="subtle" class="py-2.5" block>
                    <UAvatar src="/google.png" size="xs" />
                    <span>Sign in with Google</span>
                </UButton>
            </div>
        </UCard>
    </main>
</template>