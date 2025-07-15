<template>
    <aside
        class="bg-white h-screen flex flex-col justify-between w-[270px] border-r border-slate-200 sticky top-0 shrink-0 z-10 pb-4">
        <section>
            <div class=" flex items-center justify-between h-16 px-5 border-b border-slate-200">
                <UAvatar src="/photo.jpg" class="rounded-full size-9" />
                <div class="-translate-x-2">
                    <h1 class="text-black font-semibold -tracking-wide text-[0.9rem]">Hendri Alqori (Admin)</h1>
                    <p class="text-xs text-slate-500">dev.hendrialqori@gmail.com</p>
                </div>
                <UButton icon="i-lucide-chevrons-up-down" size="md" color="neutral" variant="soft" class="shrink-0" />
            </div>
            <AppMenu />
        </section>
        <section class="px-5">
            <UModal title="Are yout sure wanna signout ?" description="This action cannot be undo" :dismissible="false"
                :close="{
                    color: 'neutral',
                    variant: 'ghost'
                }" :ui="{ footer: 'justify-end' }">
                <UButton color="neutral" size="lg" variant="ghost" icon="i-tabler-logout-2" type="button">Logout</UButton>

                <template #footer="{ close }">
                    <UButton color="neutral" variant="subtle" size="lg" @click="close">Cancel</UButton>
                    <UButton color="error" size="lg">Signout anyware!</UButton>
                </template>
            </UModal>
        </section>
    </aside>
</template>