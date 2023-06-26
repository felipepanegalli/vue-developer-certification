<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="text-sm">{{ label }}</label>
    <select :multiple="isMultiple" class="mt-2 bg-transparent border border-gray-800 p-2 text-sm outline-0"
      @change="handleChange" :value="modelValue">
      <option :value="option.value" v-for="option in options" :key="option.value" :selected="modelValue.includes(option.value)">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>

const emit = defineEmits(['update:modelValue'])
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: false },
  options: { type: Array, required: true },
  isMultiple: { type: Boolean, defualt: false },
  modelValue: { type: [Array, String, Number] }
})

const handleChange = (e) => {
  const opt = e.target.selectedOptions
  const optValues = Array.from(opt).map(({ value }) => value);
  emit('update:modelValue', optValues)
}
</script>

<style lang="scss" scoped>
select[multiple]:focus option:checked {
  background: red linear-gradient(0deg, red 0%, red 100%);
}
</style>
