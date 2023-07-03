<template>
  <FormModal :is-open="isOpen">
    <template #header>
      <h1 class="text-lg">Add Movie</h1>
    </template>
    <template #default>
      <MovieForm ref="form" :modelValue="data" :movie="movie" :mode="mode"/>
    </template>
    <template #footer>
      <Button id="cancelButton" @click="handleClose">Cancel</Button>
      <Button id="saveButton" status="success" @click="handleSave">
        <Icon icon="ic:round-save"/>
        Save
      </Button>
    </template>
  </FormModal>
</template>

<script setup>
import {ref} from 'vue';
import {Icon} from '@iconify/vue';
import FormModal from '../../components/Modal/FormModal.vue';
import MovieForm from '../../pages/Movies/MovieForm.vue';
import Button from '../../components/Form/Button.vue';

defineProps({
  data: Object,
  movie: Object,
  isOpen: Boolean,
  mode: String,
});
const emit = defineEmits(['closeModal']);
const form = ref(null);

/** Close Modal */
const handleClose = () => {
  emit('closeModal', false);
  form.value.clearForm();
};

/** Save data */
const handleSave = async () => {
  const error = await form.value.handleSave();
  if (!error) emit('closeModal', false);
};

</script>
