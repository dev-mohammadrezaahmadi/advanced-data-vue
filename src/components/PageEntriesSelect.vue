<template>
  <div>
    <div>page entriess: {{ model }}</div>
    <select v-model="model">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ options: { text: string; value: number }[] }>()
const model = defineModel()
</script>
