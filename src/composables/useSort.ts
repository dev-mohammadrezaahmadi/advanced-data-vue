import type { User } from '@/types/user'
import { computed, type Ref } from 'vue'
import { sortByDate, sortByName } from '@/helpers'
import type { Sort } from '@/types/type'

export function useSort(users: Ref<User[]>, sorts: Ref<Sort>) {
  const sortedUsers = computed(() => {
    if (sorts.value.name !== 'idle' && sorts.value.date !== 'idle') {
      return [...users.value].sort((a, b) => {
        const nameComparison = sortByName(a, b, sorts.value.name)
        const dateComparison = sortByDate(a, b, sorts.value.date)
        return nameComparison !== 0 ? nameComparison : dateComparison
      })
    } else if (sorts.value.name !== 'idle') {
      return [...users.value].sort((a, b) => sortByName(a, b, sorts.value.name))
    } else if (sorts.value.date !== 'idle') {
      return [...users.value].sort((a, b) => sortByDate(a, b, sorts.value.date))
    } else {
      return [...users.value]
    }
  })

  return {
    sortedUsers,
  }
}
