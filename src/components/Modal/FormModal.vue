<template>
  <div class="backdrop text-white flex justify-center items-center" v-if="isOpen">
    <div class="modal relative w-6/12">
      <Icon icon="material-symbols:cancel-outline" width="32" height="32"
            class="cursor-pointer top-3 right-3 absolute text-gray-400 hover:text-white" @click="$emit('close')"/>
      <div class="modal__header p-4" v-if="$slots.header">
        <slot name="header"/>
      </div>
      <hr v-if="$slots.header">
      <div class="modal__body p-4">
        <slot/>
      </div>
      <div class="modal__footer flex gap-4 justify-center p-4" v-if="$slots.footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icon} from '@iconify/vue';

defineProps({
  isOpen: false,
});

defineEmits(['close']);
</script>

<style lang="scss" scoped>
.backdrop {
  @apply w-full h-full fixed top-0 left-0 z-50 overflow-auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal {
  background-color: rgba(18, 16, 27, 0.95);
  position: relative;
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
}
</style>
