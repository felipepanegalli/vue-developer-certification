<template>
  <div class="flex items-center cursor-pointer">
    <input :id="id" @input="(event) => $emit('update:modelValue', event.target.checked)" type="checkbox"
      :checked="modelValue" class="mr-2" />
    <label :for="id" class="flex flex-row items-center font-bold cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  id: { type: String, required: true },
  modelValue: { type: [Boolean, String, Number] }
})
</script>

<style lang="scss" scoped></style>
