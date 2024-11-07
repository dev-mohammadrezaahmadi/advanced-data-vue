<template>
  <div>
    <input type="text" placeholder="search name .." v-model="nameFilter" />
    <input type="text" placeholder="search phone .." v-model="phoneFilter" />
    <input type="text" placeholder="search address .." v-model="addressFilter" />
  </div>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
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
import { reactive, ref, computed } from 'vue'
import type { User } from '@/types/user'
import usersData from '@/data/records.json'

const users = ref<User[]>([...usersData])

const nameFilter = ref('')
const phoneFilter = ref('')
const addressFilter = ref('')

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

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
      user.phone.toLowerCase().includes(phoneFilter.value.toLowerCase()) &&
      user.address.toLowerCase().includes(addressFilter.value.toLowerCase()),
  )
})
</script>
