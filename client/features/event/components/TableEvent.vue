<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
})

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))
</script>

<template>
    <div class="flex gap-2 justify-end">
        <UPopover>
            <UButton color="neutral" variant="outline" icon="i-lucide-calendar" class="w-48">
                {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
            </UButton>

            <template #content>
                <UCalendar v-model="modelValue" class="p-2" />
            </template>
        </UPopover>
        <UInput type="search" icon="i-lucide-search" class="w-48" variant="outline" placeholder="Search..." />
        <UButton icon="i-ion-add-outline">New event</UButton>
    </div>

    <div>
        <table class="table-auto border-collapse border border-slate-200 w-full rounded-xl">
            <thead>
                <tr>
                    <th style="width: 400px;"
                        class="-tracking-wide py-2 border-b border-slate-200 text-left pl-6 pr-3 font-medium text-slate-500 bg-slate-100">
                        Name</th>
                    <th style="width: 200px;"
                        class="-tracking-wide py-2 border-b border-slate-200 text-left px-3 font-medium text-slate-500 bg-slate-100">
                        Start time</th>
                    <th style="width: 200px;"
                        class="-tracking-wide py-2 border-b border-slate-200 text-left px-3 font-medium text-slate-500 bg-slate-100">
                        Ticket</th>
                    <th
                        class="-tracking-wide py-2 border-b border-slate-200 text-left px-3 font-medium text-slate-500 bg-slate-100">
                        Price</th>
                    <th
                        class="-tracking-wide py-2 border-b border-slate-200 text-left px-3 font-medium text-slate-500 bg-slate-100">
                        Status</th>
                    <th
                        class="-tracking-wide py-2 border-b border-slate-200 text-left px-3 font-medium text-slate-500 bg-slate-100">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i of 10">
                    <td class="pl-6 pr-3 py-4 border-b border-slate-200 font-medium">You can add a new column that renders a
                        DropdownMenu component inside
                        the cell to
                        render row actions.</td>
                    <td class="px-3 py-4 border-b border-slate-200">Des, 31 2025 22:00</td>
                    <td class="px-3 py-4 border-b border-slate-200">100 / 1000</td>
                    <td class="px-3 py-4 border-b border-slate-200">Rp 400,000</td>
                    <td class="px-3 py-4 border-b border-slate-200">
                        <UBadge>Soon</UBadge>
                    </td>
                    <td class="px-3 py-4 border-b border-slate-200">
                        <UButton icon="i-humbleicons-dots-vertical" size="lg" variant="soft" color="neutral" />
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex justify-end gap-4 items-center">
        <p class="text-sm font-medium w-40 text-center">Show 1 of 100 pages</p>
        <UButton icon="i-lucide-chevron-left" variant="outline" color="neutral">Previous</UButton>
        <UButton trailing-icon="i-lucide-chevron-right" variant="outline" color="neutral">Next</UButton>
    </div>
</template>
