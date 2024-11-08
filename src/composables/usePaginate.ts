import type { User } from '@/types/user'
import { ref, type Ref, computed } from 'vue'
import { PAGE_ENTERIES_COUNT } from '@/constants/defaults'

export function usePaginate(users: Ref<User[]>) {
  const selectedPageEntries = ref(PAGE_ENTERIES_COUNT)
  const pageEntriesOptions = ref([
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '15',
      value: 15,
    },
    {
      text: '20',
      value: 20,
    },
    {
      text: '50',
      value: 50,
    },
  ])

  const currentPage = ref(1)
  const totalPages = computed(() => {
    return Math.ceil(users.value.length / selectedPageEntries.value)
  })
  const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * selectedPageEntries.value
    const endIndex = startIndex + selectedPageEntries.value
    return users.value.slice(startIndex, endIndex)
  })

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  return {
    paginatedUsers,
    totalPages,
    setCurrentPage,
    pageEntriesOptions,
    currentPage,
    selectedPageEntries,
  }
}
