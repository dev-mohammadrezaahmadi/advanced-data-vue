import { watch, onMounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PAGE_ENTERIES_COUNT } from '@/constants/defaults'
import type { Column, Sort } from '@/types/type'

export const useURLSync = (
  nameFilter: Ref<string>,
  phoneFilter: Ref<string>,
  addressFilter: Ref<string>,
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
        name: nameFilter.value,
        phone: phoneFilter.value,
        address: addressFilter.value,
        page: currentPage.value,
        pageCount: selectedPageEntries.value,
        sort: JSON.stringify(columnsSortDirection.value),
      },
    })
  }

  function initializeDefaultValuesFromURLQueries() {
    nameFilter.value = (route.query.name as string) ?? ''
    phoneFilter.value = (route.query.phone as string) ?? ''
    addressFilter.value = (route.query.address as string) ?? ''
    currentPage.value = Number((route.query.page as string) ?? 1)
    selectedPageEntries.value = Number((route.query.pageCount as string) ?? PAGE_ENTERIES_COUNT)
    columnsSortDirection.value = JSON.parse(
      (route.query.sort as string) ?? JSON.stringify(columnsSortDirection.value),
    )
  }

  watch(
    [
      nameFilter,
      phoneFilter,
      addressFilter,
      currentPage,
      selectedPageEntries,
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
