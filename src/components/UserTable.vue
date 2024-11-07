<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
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
  <div>
    <button
      v-for="page in totalPages"
      :key="page"
      :color="currentPage === page ? 'primary' : 'secondary'"
      size="sm"
      @click="setPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { User } from '@/types/user'
import usersData from '@/data/records.json'

const users = ref<User[]>([...usersData])

const columns = reactive([
  {
    key: 'id',
    label: 'User ID',
  },
  {
    key: 'name',
    label: 'Name of the User',
  },
  {
    key: 'date',
    label: 'Date of Registration',
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'phone',
    label: 'Phone Number',
  },
])

const PAGE_SIZE = 10
const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(users.value.length / PAGE_SIZE)
})
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  return users.value.slice(startIndex, endIndex)
})

const setPage = (page: number) => {
  currentPage.value = page
}
</script>
