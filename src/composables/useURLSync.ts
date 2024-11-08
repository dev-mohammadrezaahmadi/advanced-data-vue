import { watch, onMounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ITEMS_PER_PAGE_COUNT } from '@/constants/defaults'
import type { Filters, Sort } from '@/types/type'

export const useURLSync = (
  filters: Ref<Filters>,
  currentPage: Ref<number>,
  perPageItemsCount: Ref<number>,
  columnsSortDirection: Ref<Sort>,
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
        perPageItems: perPageItemsCount.value,
        sort: JSON.stringify(columnsSortDirection.value),
      },
    })
  }

  function initializeDefaultValuesFromURLQueries() {
    filters.value.name = (route.query.name as string) ?? ''
    filters.value.phone = (route.query.phone as string) ?? ''
    filters.value.address = (route.query.address as string) ?? ''
    currentPage.value = Number((route.query.page as string) ?? 1)
    perPageItemsCount.value = Number((route.query.perPageItems as string) ?? ITEMS_PER_PAGE_COUNT)
    columnsSortDirection.value = JSON.parse(
      (route.query.sort as string) ?? JSON.stringify(columnsSortDirection.value),
    )
  }

  watch(
    [
      currentPage,
      perPageItemsCount,
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
