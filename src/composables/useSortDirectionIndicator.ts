import type { Sort } from '@/types/type'
import { computed, type Ref } from 'vue'

export function useSortDirectionIndicator(sorts: Ref<Sort>) {
  const name = computed(() => {
    if (sorts.value.name === 'asc') {
      return '↑'
    } else if (sorts.value.name === 'desc') {
      return '↓'
    } else {
      return null
    }
  })

  const date = computed(() => {
    if (sorts.value.date === 'asc') {
      return '↑'
    } else if (sorts.value.date === 'desc') {
      return '↓'
    } else {
      return null
    }
  })

  return {
    name,
    date,
  }
}
