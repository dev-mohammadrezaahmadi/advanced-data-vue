<template>
  <div class="w-full overflow-x-auto rounded-lg shadow bg-white hidden md:block">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            User ID
          </th>
          <th
            @click="toggleSort('name')"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors hover:bg-gray-100 group"
          >
            <div class="flex items-center gap-1">
              Name of the User
              <span class="text-gray-400 group-hover:text-gray-600 transition-colors">
                {{ getSortDirectionIndicator(sorts.name) }}
              </span>
            </div>
          </th>
          <th
            @click="toggleSort('date')"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors hover:bg-gray-100 group"
          >
            <div class="flex items-center gap-1">
              Date of Registration
              <span class="text-gray-400 group-hover:text-gray-600 transition-colors">
                {{ getSortDirectionIndicator(sorts.date) }}
              </span>
            </div>
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Address
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone Number
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in props.users" :key="user.id" class="transition-colors hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ user.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ user.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ user.date }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
            {{ user.address }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ user.phone }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Responsive view for small screens -->
  <div class="md:hidden">
    <div
      v-for="user in props.users"
      :key="user.id"
      class="bg-white shadow rounded-lg mb-4 p-4 border"
    >
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-xs font-medium text-gray-500">USER ID</span>
          <span class="text-sm text-gray-900">{{ user.id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs font-medium text-gray-500">NAME</span>
          <span class="text-sm text-gray-900">{{ user.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs font-medium text-gray-500">DATE</span>
          <span class="text-sm text-gray-900">{{ user.date }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs font-medium text-gray-500">ADDRESS</span>
          <span class="text-sm text-gray-900 text-right max-w-[200px]">{{ user.address }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs font-medium text-gray-500">PHONE</span>
          <span class="text-sm text-gray-900">{{ user.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column, Sort } from '@/types/type'
import type { User } from '@/types/user'
import { getSortDirectionIndicator } from '@/helpers'

const props = defineProps<{
  toggleSort: (column: Column) => void
  users: User[]
  sorts: Sort
}>()
</script>

<style scoped>
/* Optional: Add smooth transitions for sort indicators */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sort-indicator {
  animation: fadeIn 0.2s ease-out;
}
</style>
