<template>
  <div class="flex items-center gap-1">
    <!-- First page -->
    <button
      class="px-3 py-1 rounded text-sm min-w-[32px] transform transition-all duration-200 ease-in-out"
      :class="[
        currentPage === 1
          ? 'bg-blue-600 text-white scale-110'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105',
      ]"
      @click="onPageClick(1)"
    >
      1
    </button>

    <!-- Left dots with fade transition -->
    <TransitionGroup name="fade">
      <span v-if="showLeftDots" key="leftDots" class="px-2 text-gray-400"> ... </span>
    </TransitionGroup>

    <!-- Middle pages with slide and fade transitions -->
    <TransitionGroup name="slide-fade" tag="div" class="flex items-center">
      <template v-for="page in visiblePages">
        <button
          v-if="page !== 1 && page !== totalPages"
          :key="page"
          class="px-3 py-1 mx-1 rounded text-sm min-w-[32px] transform transition-all duration-200 ease-in-out"
          :class="[
            currentPage === page
              ? 'bg-blue-600 text-white scale-110'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105',
          ]"
          @click="onPageClick(page)"
        >
          {{ page }}
        </button>
      </template>
    </TransitionGroup>

    <!-- Right dots with fade transition -->
    <TransitionGroup name="fade">
      <span v-if="showRightDots" key="rightDots" class="px-2 text-gray-400"> ... </span>
    </TransitionGroup>

    <!-- Last page -->
    <button
      v-if="totalPages > 1"
      class="px-3 py-1 rounded text-sm min-w-[32px] transform transition-all duration-200 ease-in-out"
      :class="[
        currentPage === totalPages
          ? 'bg-blue-600 text-white scale-110'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105',
      ]"
      @click="onPageClick(totalPages)"
    >
      {{ totalPages }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'onPaginateClick', pageNumber: number): void
}>()

function onPageClick(page: number = 1) {
  emit('onPaginateClick', page)
}

// Calculate visible pages
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = 7
  const sidePages = 2

  if (props.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(props.currentPage - sidePages, 2)
    let end = Math.min(props.currentPage + sidePages, props.totalPages - 1)

    if (props.currentPage <= sidePages + 1) {
      end = maxVisiblePages - 1
    } else if (props.currentPage >= props.totalPages - sidePages) {
      start = props.totalPages - maxVisiblePages + 2
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

const showLeftDots = computed(() => {
  return props.currentPage > 3
})

const showRightDots = computed(() => {
  return props.currentPage < props.totalPages - 2
})
</script>

<style scoped>
/* Fade transition for dots */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide and fade transition for page numbers */
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Ensure items maintain their spacing during transitions */
.slide-fade-leave-active {
  position: absolute;
}

/* Container to prevent layout shift during transitions */
.slide-fade-move {
  transition: transform 0.3s ease;
}
</style>
