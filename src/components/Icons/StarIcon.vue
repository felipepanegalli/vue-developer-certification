<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24">
    <path :fill="color"
      d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" />
  </svg>
</template>

<script setup>
defineProps({
  color: { type: String, default: "#888888" },
  width: { type: String, default: "32" },
  height: { type: String, default: "32" },
})
</script>

<style lang="scss" scoped></style>
