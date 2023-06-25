<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="text-sm">{{ label }}</label>
    <select :multiple="isMultiple" class="mt-2 bg-transparent border border-gray-800 p-2 text-sm outline-0"
      @change="$emit('update:modelValue', $event.target.value)" :value="modelValue">
      <option :value="option.value" v-for="option in options" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  options: { type: Array, required: true },
  isMultiple: { type: Boolean, defualt: false },
  modelValue: { type: [Array, String, Number] }
})
defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
