<template>
  <p>
    {{ JSON.stringify(columnsSortDirection) }}
  </p>
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
      <tr v-for="user in sortedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '@/types/user'
import { sortByDate, sortByName } from '@/helpers'
import usersData from '@/data/records.json'
import { useToggleColumnSort } from '@/composables/useToggleColumnSort'

const users = ref<User[]>([...usersData])

const { columnsSortDirection, toggleSort } = useToggleColumnSort()

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
    return [...users.value].sort((a, b) => {
      const nameComparison = sortByName(a, b, columnsSortDirection.value.name)
      const dateComparison = sortByDate(a, b, columnsSortDirection.value.date)
      return nameComparison !== 0 ? nameComparison : dateComparison
    })
  } else if (columnsSortDirection.value.name !== 'idle') {
    return [...users.value].sort((a, b) => sortByName(a, b, columnsSortDirection.value.name))
  } else if (columnsSortDirection.value.date !== 'idle') {
    return [...users.value].sort((a, b) => sortByDate(a, b, columnsSortDirection.value.date))
  } else {
    return [...users.value]
  }
})
</script>
