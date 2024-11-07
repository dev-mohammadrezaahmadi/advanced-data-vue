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
    @on-paginate-click="setPage"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import PageEntriesSelect from '@/components/PageEntriesSelect.vue'
import PaginationNavigator from '@/components/PaginationNavigator.vue'

import type { User } from '@/types/user'
import { sortByDate, sortByName } from '@/helpers'
import usersData from '@/data/records.json'
import { useToggleColumnSort } from '@/composables/useToggleColumnSort'
import { useRouter, useRoute } from 'vue-router'

const users = ref<User[]>([...usersData])
const router = useRouter()
const route = useRoute()

const { columnsSortDirection, toggleSort } = useToggleColumnSort()

// sorting
const nameColumnSortDirectionIndicator = computed(() => {
  if (columnsSortDirection.value.name === 'asc') {
    return '↑'
  } else if (columnsSortDirection.value.name === 'desc') {
    return '↓'
  } else {
    return null
  }
})

const dateColumnSortDirectionIndicator = computed(() => {
  if (columnsSortDirection.value.date === 'asc') {
    return '↑'
  } else if (columnsSortDirection.value.date === 'desc') {
    return '↓'
  } else {
    return null
  }
})

const sortedUsers = computed(() => {
  if (columnsSortDirection.value.name !== 'idle' && columnsSortDirection.value.date !== 'idle') {
    return [...filteredUsers.value].sort((a, b) => {
      const nameComparison = sortByName(a, b, columnsSortDirection.value.name)
      const dateComparison = sortByDate(a, b, columnsSortDirection.value.date)
      return nameComparison !== 0 ? nameComparison : dateComparison
    })
  } else if (columnsSortDirection.value.name !== 'idle') {
    return [...filteredUsers.value].sort((a, b) =>
      sortByName(a, b, columnsSortDirection.value.name),
    )
  } else if (columnsSortDirection.value.date !== 'idle') {
    return [...filteredUsers.value].sort((a, b) =>
      sortByDate(a, b, columnsSortDirection.value.date),
    )
  } else {
    return [...filteredUsers.value]
  }
})

// filters
const nameFilter = ref('')
const phoneFilter = ref('')
const addressFilter = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
      user.phone.toLowerCase().includes(phoneFilter.value.toLowerCase()) &&
      user.address.toLowerCase().includes(addressFilter.value.toLowerCase()),
  )
})

// paginating

const selectedPageEntries = ref(10)
const pageEntriesOptions = ref([
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 10,
  },
  {
    text: '15',
    value: 15,
  },
  {
    text: '20',
    value: 20,
  },
  {
    text: '50',
    value: 50,
  },
])

const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(sortedUsers.value.length / selectedPageEntries.value)
})
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * selectedPageEntries.value
  const endIndex = startIndex + selectedPageEntries.value
  return sortedUsers.value.slice(startIndex, endIndex)
})

const setPage = (page: number) => {
  currentPage.value = page
}

// url update
function updateURL() {
  router.push({
    path: '',
    query: {
      ...route.query,
      name: nameFilter.value,
      phone: phoneFilter.value,
      address: addressFilter.value,
      page: currentPage.value,
      pageCount: selectedPageEntries.value,
      sort: JSON.stringify(columnsSortDirection.value),
    },
  })
  console.log(columnsSortDirection.value)
}

// queries
// sortBy, sortDir, name, address, phone, pageNumber, pageCount

watch(
  [
    nameFilter,
    phoneFilter,
    addressFilter,
    currentPage,
    selectedPageEntries,
    () => columnsSortDirection.value.name,
    () => columnsSortDirection.value.date,
  ],
  updateURL,
)

function setupQueryValues() {
  nameFilter.value = (route.query.name as string) ?? ''
  phoneFilter.value = (route.query.phone as string) ?? ''
  addressFilter.value = (route.query.address as string) ?? ''
  currentPage.value = Number((route.query.page as string) ?? 1)
  selectedPageEntries.value = Number((route.query.pageCount as string) ?? 10)
  columnsSortDirection.value = JSON.parse(
    (route.query.sort as string) ?? columnsSortDirection.value,
  )
}
onBeforeMount(async () => {
  await router.isReady()
  setupQueryValues()
})
</script>
