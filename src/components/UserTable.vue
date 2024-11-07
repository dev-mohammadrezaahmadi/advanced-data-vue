<template>
  <div>
    <div>page entriess: {{ selectedPageEntries }}</div>
    <select v-model="selectedPageEntries">
      <option v-for="option in pageEntriesOptions" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
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

const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(users.value.length / selectedPageEntries.value)
})
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * selectedPageEntries.value
  const endIndex = startIndex + selectedPageEntries.value
  return users.value.slice(startIndex, endIndex)
})

const setPage = (page: number) => {
  currentPage.value = page
}
</script>
