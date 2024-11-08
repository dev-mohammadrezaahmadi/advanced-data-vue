import type { User } from '@/types/user'
import { computed, type Ref } from 'vue'
import { useToggleColumnSort } from '@/composables/useToggleColumnSort'
import { sortByDate, sortByName } from '@/helpers'

export function useSort(users: Ref<User[]>) {
  const { columnsSortDirection, toggleSort } = useToggleColumnSort()

  // sorting
  const nameColumnSortDirectionIndicator = computed(() => {
    if (columnsSortDirection.value.name === 'asc') {
      return '↑'
    } else if (columnsSortDirection.value.name === 'desc') {
      return '↓'
    } else {
      return null
    }
  })

  const dateColumnSortDirectionIndicator = computed(() => {
    if (columnsSortDirection.value.date === 'asc') {
      return '↑'
    } else if (columnsSortDirection.value.date === 'desc') {
      return '↓'
    } else {
      return null
    }
  })

  const sortedUsers = computed(() => {
    if (columnsSortDirection.value.name !== 'idle' && columnsSortDirection.value.date !== 'idle') {
      return [...users.value].sort((a, b) => {
        const nameComparison = sortByName(a, b, columnsSortDirection.value.name)
        const dateComparison = sortByDate(a, b, columnsSortDirection.value.date)
        return nameComparison !== 0 ? nameComparison : dateComparison
      })
    } else if (columnsSortDirection.value.name !== 'idle') {
      return [...users.value].sort((a, b) => sortByName(a, b, columnsSortDirection.value.name))
    } else if (columnsSortDirection.value.date !== 'idle') {
      return [...users.value].sort((a, b) => sortByDate(a, b, columnsSortDirection.value.date))
    } else {
      return [...users.value]
    }
  })

  return {
    sortedUsers,
    nameColumnSortDirectionIndicator,
    dateColumnSortDirectionIndicator,
    columnsSortDirection,
    toggleSort,
  }
}
