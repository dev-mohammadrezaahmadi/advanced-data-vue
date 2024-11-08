import type { User } from '@/types/user'
import type { SortDirection } from '@/types/type'

function sortByDate(a: User, b: User, sortDirection: SortDirection) {
  return (
    (new Date(a.date).getTime() - new Date(b.date).getTime()) * (sortDirection === 'asc' ? 1 : -1)
  )
}
function sortByName(a: User, b: User, sortDirection: SortDirection) {
  return a.name.localeCompare(b.name) * (sortDirection === 'asc' ? 1 : -1)
}

export { sortByDate, sortByName }
