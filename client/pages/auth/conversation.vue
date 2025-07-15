<script setup lang="ts">

useHead({
    title: 'Conversation'
})

definePageMeta({
    layout: 'auth'
})


</script>

<template>
    <section class="m-4 flex gap-3 h-[calc(100vh_-_90px)]">
        <div class="bg-white rounded-lg border border-slate-200 w-3/12">
            <div class="h-full">
                <div class="p-4 border-b border-slate-200">
                    <h2 class="text-sm">Direct message</h2>
                </div>
                <ul class="overflow-y-auto h-[calc(100vh_-_140px)]">
                    <li v-for="i of 5"
                        class="flex items-center gap-3 w-full p-4 cursor-pointer border-b border-slate-200 hover:bg-slate-100">
                        <UAvatar src="/photo.jpg" class="rounded-full size-9" />
                        <div class="w-full">
                            <div class="flex justify-between">
                                <h1 class="text-black font-medium -tracking-wide">Jonathan</h1>
                                <p class="text-xs">14:32</p>
                            </div>
                            <p class="text-sm text-slate-500">Min, masih kah ini?</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex-1 border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div class="flex justify-between items-center px-3 border-b border-slate-200">
                <figure class="flex items-center gap-3 px-4 py-4 cursor-pointer">
                    <UAvatar src="/photo.jpg" class="rounded-full size-11" />
                    <figcaption class="w-full">
                        <h1 class="text-black font-semibold -tracking-wide">Jonathan</h1>
                        <p class="text-xs text-slate-500">hendri@gmail.com</p>
                    </figcaption>
                </figure>
                <div class="">
                    <p class="font-medium text-black text-nowrap text-sm">Nu year celebrate event!</p>
                    <span class="text-xs">Jun 12, 2025 13:00</span>
                </div>
            </div>

            <ul class="p-4 space-y-2 overflow-y-auto h-[calc(100vh_-_220px)]">
                <li class="w-fit max-w-1/2 border border-slate-200 p-3 rounded-xl">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, officiis incidunt
                        .</p>

                    <div class="flex justify-end">
                        <p class="text-xs">10:00</p>
                    </div>
                </li>
                <li class="w-fit max-w-1/2 border border-slate-200 p-3 rounded-xl bg-blue-500 text-white ml-auto mr-0">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, officiis incidunt
                        labore quaerat
                        tempore doloremque dolorum nesciunt, fuga, corrupti ipsum porro alias ipsam optio voluptates?
                        Doloribus
                        totam dignissimos perspiciatis atque.</p>

                    <div class="flex justify-end">
                        <p class="text-xs">10:00</p>
                    </div>
                </li>
                <li class="w-fit max-w-1/2 border border-slate-200 p-3 rounded-xl bg-blue-500 text-white ml-auto mr-0">
                    <p>Lorem ipsum dolor sit
                    </p>

                    <div class="flex justify-end">
                        <p class="text-xs">10:00</p>
                    </div>
                </li>
            </ul>

            <form action="" class="p-3 flex gap-2">
                <UInput color="neutral" variant="subtle" size="xl" class="flex-1" :ui="{ base: 'py-3 rounded-lg' }"
                    placeholder="Send message..." />
                <UButton icon="i-prime-send" size="lg" class="px-3" color="neutral" variant="subtle" />
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
::-webkit-scrollbar {
    width: 4px;
    border-radius: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #bcbcbc;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #989898;
}
</style>