<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="text-sm">{{ label }}</label>
    <input :type="type" :id="id" :name="id" :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"
      class="mt-2 p-2 text-sm outline-0 border bg-[#121821] border-[#2F3844]">
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] }
})
defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
