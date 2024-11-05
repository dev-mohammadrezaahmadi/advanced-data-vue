<template>
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Name of the User</th>
        <th @click="onDateColumnClick">
          Date of Registration {{ sortType === 'asc' ? '↑' : '↓' }}
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
import { ref } from 'vue'
import type { User } from '@/types/user'
import type { Column, Sort } from '@/types/type'
import usersData from '@/data/records.json'

const users = ref<User[]>([...usersData])
const sortedUsers = ref<User[]>([...users.value])
const sortType = ref<Sort>('asc')

function toggleSort() {
  sortType.value = sortType.value === 'asc' ? 'desc' : 'asc'
}

function sortBy(column: Column) {
  if (column === 'date') {
    sortedUsers.value = [...users.value].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortType.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  }
}

function onDateColumnClick() {
  toggleSort()
  sortBy('date')
}
</script>
