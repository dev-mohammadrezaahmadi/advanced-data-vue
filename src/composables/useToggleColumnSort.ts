import { ref } from 'vue'
import type { Column, Sort } from '@/types/type'

export function useToggleColumnSort() {
  const columnsSortDirection = ref<Record<Column, Sort>>({
    name: 'idle',
    date: 'idle',
    address: 'idle',
    id: 'idle',
    phone: 'idle',
  })

  const columnsClickCounter = ref<Record<Column, number>>({
    name: 0,
    date: 0,
    address: 0,
    id: 0,
    phone: 0,
  })

  function toggleSort(column: Column) {
    columnsClickCounter.value[column]++
    if (columnsClickCounter.value[column] % 3 === 0) {
      columnsSortDirection.value[column] = 'idle'
      return
    }
    columnsSortDirection.value[column] =
      columnsSortDirection.value[column] === 'asc' ? 'desc' : 'asc'
  }

  return { columnsSortDirection, toggleSort }
}
