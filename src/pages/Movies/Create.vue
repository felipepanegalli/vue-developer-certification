<template>
  <FormModal :is-open="isOpen">
    <template #header>
      <h1 class="text-lg">Add Movie</h1>
    </template>
    <template #default>
      <MovieForm ref="form" :modelValue="data" :mode="mode" />
    </template>
    <template #footer>
      <Button @click="handleClose">Cancel</Button>
      <Button status="success" @click="handleSave" id="saveButton">
        <Icon icon="ic:round-save" /> Save
      </Button>
    </template>
  </FormModal>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import FormModal from '../../components/Modal/FormModal.vue';
import MovieForm from '../../pages/Movies/MovieForm.vue';
import Button from '../../components/Form/Button.vue';

const props = defineProps({ data: Object, isOpen: Boolean, mode: String })
const emit = defineEmits(['closeModal'])
const form = ref(null);

/** Close Modal */
const handleClose = () => {
  emit('closeModal', false)
  form.value.clearForm()
}

/** Save data */
const handleSave = () => {
  emit('closeModal', false)
  form.value.handleSave()
}

</script>
