<template>
  <div>
    <button
      v-for="page in props.totalPages"
      :key="page"
      :color="props.currentPage === page ? 'primary' : 'secondary'"
      size="sm"
      @click="onPageClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ totalPages: number; currentPage: number }>()
const emit = defineEmits<{
  (e: 'onPaginateClick', pageNumber: number): void
}>()

function onPageClick(page: number = 1) {
  emit('onPaginateClick', page)
}
</script>
