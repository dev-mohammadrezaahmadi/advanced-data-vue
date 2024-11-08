<template>
  <div>
    <input type="text" placeholder="search name .." v-model="nameFilter" />
    <input type="text" placeholder="search phone .." v-model="phoneFilter" />
    <input type="text" placeholder="search address .." v-model="addressFilter" />
  </div>
  <PageEntriesSelect :options="pageEntriesOptions" v-model="selectedPageEntries" />
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th @click="toggleSort('name')">Name of the User {{ nameColumnSortDirectionIndicator }}</th>
        <th @click="toggleSort('date')">
          Date of Registration {{ dateColumnSortDirectionIndicator }}
        </th>
        <th>Address</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in paginatedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
  <PaginationNavigator
    :current-page="currentPage"
    :total-pages="totalPages"
    @on-paginate-click="setCurrentPage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageEntriesSelect from '@/components/PageEntriesSelect.vue'
import PaginationNavigator from '@/components/PaginationNavigator.vue'

import type { User } from '@/types/user'
import usersData from '@/data/records.json'
import { useURLSync } from '@/composables/useURLSync'
import { useFilter } from '@/composables/useFilter'
import { usePaginate } from '@/composables/usePaginate'
import { useSort } from '@/composables/useSort'

const users = ref<User[]>([...usersData])

// filters
const { addressFilter, filteredUsers, nameFilter, phoneFilter } = useFilter(users)

// sorting
const {
  sortedUsers,
  dateColumnSortDirectionIndicator,
  nameColumnSortDirectionIndicator,
  columnsSortDirection,
  toggleSort,
} = useSort(filteredUsers)

// paginating
const {
  pageEntriesOptions,
  paginatedUsers,
  setCurrentPage,
  totalPages,
  currentPage,
  selectedPageEntries,
} = usePaginate(sortedUsers)

// url updates
useURLSync(
  nameFilter,
  phoneFilter,
  addressFilter,
  currentPage,
  selectedPageEntries,
  columnsSortDirection,
)
</script>
