<template>
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th @click="toggleSort('name')">
          Name of the User {{ getSortDirectionIndicator(sorts.name) }}
        </th>
        <th @click="toggleSort('date')">
          Date of Registration {{ getSortDirectionIndicator(sorts.date) }}
        </th>
        <th>Address</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in props.users" :key="user.id">
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
import type { Column, Sort } from '@/types/type'
import type { User } from '@/types/user'
import { getSortDirectionIndicator } from '@/helpers'

const props = defineProps<{
  toggleSort: (column: Column) => void
  users: User[]
  sorts: Sort
}>()
</script>
