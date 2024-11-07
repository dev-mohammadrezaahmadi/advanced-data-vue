import type { User } from '@/types/user'
import type { Sort } from '@/types/type'

function sortByDate(a: User, b: User, sortDirection: Sort) {
  return (
    (new Date(a.date).getTime() - new Date(b.date).getTime()) * (sortDirection === 'asc' ? 1 : -1)
  )
}
function sortByName(a: User, b: User, sortDirection: Sort) {
  return a.name.localeCompare(b.name) * (sortDirection === 'asc' ? 1 : -1)
}

export { sortByDate, sortByName }
