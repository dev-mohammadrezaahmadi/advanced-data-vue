<template>
  <div class="flex items-center gap-2 text-sm mb-4">
    <label class="text-gray-600">Per page:</label>
    <select
      v-model="model"
      class="h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
    >
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
        class="bg-white dark:bg-gray-800"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ options: { text: string; value: number }[] }>()
const model = defineModel()
</script>
