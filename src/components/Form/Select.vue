<template>
  <div class="flex flex-col mb-4">
    <label :for="id" class="text-sm">{{ label }}</label>
    <select :multiple="isMultiple" class="mt-2 p-2 text-sm outline-0 border bg-[#121821] border-[#2F3844]"
      @change="handleChange" :value="modelValue" :id="id">
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
  background: lightgray linear-gradient(0deg, lightgray 0%, lightgray 100%);
}
</style>
