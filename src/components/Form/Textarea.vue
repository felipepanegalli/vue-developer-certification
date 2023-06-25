<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="text-sm">{{ label }}</label>
    <textarea :name="id" :id="id" :cols="cols" :rows="rows" @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue" :placeholder="placeholder"
      class="mt-2 bg-transparent border border-gray-800 p-2 text-sm outline-0"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, default: 'text' },
  cols: { type: String, default: '30' },
  rows: { type: String, default: '10' },
  modelValue: { type: [String, Number] }
})
defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
