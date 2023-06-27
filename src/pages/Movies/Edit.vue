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

// Field Validator
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

const props = defineProps({
  movie: Object,
  isOpen: Boolean,
})
const emit = defineEmits(['closeModal'])

/** Field Validation with Yup */
const movieSchema = Yup.object().shape({
  name: Yup.string().label("name").required().min(3),
  description: Yup.string().label("description").notRequired(),
  image: Yup.string().label("image").notRequired(),
  genres: Yup.array().label("genres").min(1),
  inTheaters: Yup.boolean().label("in theaters").notRequired().default(false),
})

/** Some genders */
const genderOptions = [
  { value: 'Drama', label: 'Drama' },
  { value: 'Action', label: 'Action' },
  { value: 'Crime', label: 'Crime' },
]

/** Update Movie */
const handleUpdateMovie = async () => {
  try {
    await movieSchema.validate(props.movie);
    emit('closeModal', false)
    Swal.fire({
      title: 'Success!',
      text: 'Movie saved with success!',
      icon: 'success',
      confirmButtonText: 'Close'
    });
  } catch (error) {
    Swal.fire({
      title: 'Error ocurred!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Close'
    });
    console.log(error)
  }
}

/** Close Modal */
const handleClose = () => {
  emit('closeModal', false)
}
</script>
