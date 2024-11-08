import type { User } from '@/types/user'
import type { Filters } from '@/types/type'
import { computed, type Ref } from 'vue'

export function useFilter(users: Ref<User[]>, filters: Ref<Filters>) {
  const filteredUsers = computed(() => {
    return users.value.filter(
      (user) =>
        user.name.toLowerCase().includes(filters.value.name.toLowerCase()) &&
        user.phone.toLowerCase().includes(filters.value.phone.toLowerCase()) &&
        user.address.toLowerCase().includes(filters.value.address.toLowerCase()),
    )
  })

  return {
    filteredUsers,
  }
}
