import type { User } from '@/types/user'
import { type Ref, computed } from 'vue'

export function usePaginate(
  users: Ref<User[]>,
  currentPage: Ref<number>,
  perPageItems: Ref<number>,
) {
  const totalPages = computed(() => {
    return Math.ceil(users.value.length / perPageItems.value)
  })
  const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * perPageItems.value
    const endIndex = startIndex + perPageItems.value
    return users.value.slice(startIndex, endIndex)
  })

  return {
    paginatedUsers,
    totalPages,
  }
}
