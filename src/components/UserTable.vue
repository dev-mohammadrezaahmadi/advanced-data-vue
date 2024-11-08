<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <FilterInputs
        v-model:name="filters.name"
        v-model:address="filters.address"
        v-model:phone="filters.phone"
      />
      <PerPageItemsField :options="itemsPerPage" v-model="itemsPerPageCount" />
      <TableBody :users="paginatedUsers" :toggle-sort="toggleSort" :sorts="columnsSortDirection" />
      <div class="flex justify-center mt-6">
        <PaginationNavigator
          :current-page="currentPage"
          :total-pages="totalPages"
          @on-paginate-click="setCurrentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import usersData from '@/data/records.json'

// constants
import { ITEMS_PER_PAGE_COUNT, ITEMS_PER_PAGE } from '@/constants/defaults'

// types
import type { User } from '@/types/user'
import type { Filters } from '@/types/type'

// componenets
import PerPageItemsField from '@/components/PerPageItemsField.vue'
import PaginationNavigator from '@/components/PaginationNavigator.vue'
import TableBody from '@/components/TableBody.vue'
import FilterInputs from '@/components/FilterInputs.vue'

// composables
import { useURLSync } from '@/composables/useURLSync'
import { useFilter } from '@/composables/useFilter'
import { usePaginate } from '@/composables/usePaginate'
import { useSort } from '@/composables/useSort'
import { useToggleColumnSort } from '@/composables/useToggleColumnSort'

const users = ref<User[]>([...usersData])

// filters
const filters = ref<Filters>({
  name: '',
  phone: '',
  address: '',
})
const { filteredUsers } = useFilter(users, filters)

// sorting
const { columnsSortDirection, toggleSort } = useToggleColumnSort()
const { sortedUsers } = useSort(filteredUsers, columnsSortDirection)

// paginating
const currentPage = ref(1)
const itemsPerPageCount = ref(ITEMS_PER_PAGE_COUNT)
const itemsPerPage = ref(ITEMS_PER_PAGE)
const setCurrentPage = (page: number) => {
  currentPage.value = page
}
const { paginatedUsers, totalPages } = usePaginate(sortedUsers, currentPage, itemsPerPageCount)

// url updates
useURLSync(filters, currentPage, itemsPerPageCount, columnsSortDirection)
</script>
