<template>
  <FormModal :is-open="isOpen">
    <template #header>
      <h1 class="text-lg">Edit {{ props.movie.name }}</h1>
    </template>
    <template #default>
      <Input id="name" label="Name" v-model="props.movie.name" required />
      <Textarea id="description" label="Description" v-model="props.movie.description" />
      <Input id="image" label="Image URL" v-model="props.movie.image" />
      <Select id="genres" label="Genres" v-model="props.movie.genres" :options="genderOptions" is-multiple required />
      <Checkbox id="inTheaters" v-model="props.movie.inTheaters" label="In Theaters?" />
    </template>
    <template #footer>
      <Button @click="handleClose">Cancel</Button>
      <Button status="success" @click="handleUpdateMovie">
        <Icon icon="ic:round-save" /> Save
      </Button>
    </template>
  </FormModal>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Input from '../../components/Form/Input.vue';
import FormModal from '../../components/Modal/FormModal.vue';
import Textarea from '../../components/Form/Textarea.vue';
import Select from '../../components/Form/Select.vue';
import Checkbox from '../../components/Form/Checkbox.vue';
import Button from '../../components/Form/Button.vue';
import Swal from 'sweetalert2';



/** Update Movie */
const handleUpdateMovie = async () => {
  // try {
  //   await movieSchema.validate(props.movie);
  //   emit('closeModal', false)
  //   Swal.fire({
  //     title: 'Success!',
  //     text: 'Movie saved with success!',
  //     icon: 'success',
  //     confirmButtonText: 'Close'
  //   });
  // } catch (error) {
  //   Swal.fire({
  //     title: 'Error ocurred!',
  //     text: error.message,
  //     icon: 'error',
  //     confirmButtonText: 'Close'
  //   });
  //   console.log(error)
  // }
}

/** Close Modal */
const handleClose = () => {
  emit('closeModal', false)
}
</script>
