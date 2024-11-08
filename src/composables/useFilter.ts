import type { User } from '@/types/user'
import { ref, computed, type Ref } from 'vue'

export function useFilter(users: Ref<User[]>) {
  // filters
  const nameFilter = ref('')
  const phoneFilter = ref('')
  const addressFilter = ref('')

  const filteredUsers = computed(() => {
    return users.value.filter(
      (user) =>
        user.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
        user.phone.toLowerCase().includes(phoneFilter.value.toLowerCase()) &&
        user.address.toLowerCase().includes(addressFilter.value.toLowerCase()),
    )
  })

  return {
    nameFilter,
    phoneFilter,
    addressFilter,
    filteredUsers,
  }
}
