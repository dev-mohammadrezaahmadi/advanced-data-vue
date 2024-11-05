<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" @click="sortBy(column.key as Column)">
          {{ column.label }}
        </th>
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
import { reactive, ref } from 'vue'
import type { User, Column } from '@/types/user'
import usersData from '@/data/records.json'

const users = ref<User[]>([...usersData])
const sortedUsers = ref<User[]>([...users.value])

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

function sortBy(column: Column) {
  if (column === 'date') {
    sortedUsers.value = [...users.value].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  }
}
</script>
