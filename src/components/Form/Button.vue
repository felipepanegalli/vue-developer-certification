<template>
  <button class="py-2 px-4 cursor-pointer flex items-center gap-1" :class="getStatus">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: { String, required: false }
})

const getStatus = computed(() => {
  if (props.status === 'primary') return "bg-blue-500 text-white hover:bg-blue-700"
  if (props.status === 'success') return "bg-green-500 text-white hover:bg-green-700"
  if (props.status === 'danger') return "bg-red-500 text-white hover:bg-red-700"

  return "bg-blue-500 text-white hover:bg-blue-700"
})
</script>

<style lang="scss" scoped></style>
