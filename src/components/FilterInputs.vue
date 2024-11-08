<template>
  <div>
    <input type="text" placeholder="search name .." v-model="name" />
    <input type="text" placeholder="search phone .." v-model="phone" />
    <input type="text" placeholder="search address .." v-model="address" />
  </div>
</template>

<script setup lang="ts">
const name = defineModel('name')
const address = defineModel('address')
const phone = defineModel('phone')
</script>
