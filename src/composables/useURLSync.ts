import { watch, onMounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PAGE_ENTERIES_COUNT } from '@/constants/defaults'
import type { Column, Filters, Sort } from '@/types/type'

export const useURLSync = (
  filters: Ref<Filters>,
  currentPage: Ref<number>,
  selectedPageEntries: Ref<number>,
  columnsSortDirection: Ref<Record<Column, Sort>>,
) => {
  const route = useRoute()
  const router = useRouter()

  function updateURL() {
    router.push({
      path: '',
      query: {
        ...route.query,
        name: filters.value.name,
        phone: filters.value.phone,
        address: filters.value.address,
        page: currentPage.value,
        pageCount: selectedPageEntries.value,
        sort: JSON.stringify(columnsSortDirection.value),
      },
    })
  }

  function initializeDefaultValuesFromURLQueries() {
    filters.value.name = (route.query.name as string) ?? ''
    filters.value.phone = (route.query.phone as string) ?? ''
    filters.value.address = (route.query.address as string) ?? ''
    currentPage.value = Number((route.query.page as string) ?? 1)
    selectedPageEntries.value = Number((route.query.pageCount as string) ?? PAGE_ENTERIES_COUNT)
    columnsSortDirection.value = JSON.parse(
      (route.query.sort as string) ?? JSON.stringify(columnsSortDirection.value),
    )
  }

  watch(
    [
      currentPage,
      selectedPageEntries,
      () => filters.value.name,
      () => filters.value.phone,
      () => filters.value.address,
      () => columnsSortDirection.value.name,
      () => columnsSortDirection.value.date,
    ],
    updateURL,
  )

  onMounted(async () => {
    await router.isReady()
    initializeDefaultValuesFromURLQueries()
  })
}
