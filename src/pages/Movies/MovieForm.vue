<template>
  <Input id="name" label="Name" v-model="form.name" required />
  <Textarea id="description" label="Description" v-model="form.description" />
  <Input id="image" label="Image URL" v-model="form.image" />
  <Select id="genres" label="Genres" v-model="form.genres" :options="genderOptions" is-multiple required />
  <Checkbox id="inTheaters" v-model="form.inTheaters" label="In Theaters?" />
</template>

<script setup>
import { reactive } from 'vue';
import Input from '../../components/Form/Input.vue';
import Textarea from '../../components/Form/Textarea.vue';
import Select from '../../components/Form/Select.vue';
import Checkbox from '../../components/Form/Checkbox.vue';
import Swal from 'sweetalert2';

/** Field Validator */
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

const props = defineProps({ modelValue: Object, isOpen: Boolean })

/** Field Validation with Yup */
const movieSchema = Yup.object().shape({
  name: Yup.string().label("name").required().min(3),
  description: Yup.string().label("description").notRequired(),
  image: Yup.string().label("image").notRequired(),
  genres: Yup.array().label("genres").min(1),
  inTheaters: Yup.boolean().label("in theaters").notRequired().default(false),
})

/** Movie form */
const form = reactive({
  name: '',
  description: '',
  image: '',
  rating: 0,
  genres: [],
  inTheaters: false,
})

/** Some genders */
const genderOptions = [
  { value: 'Drama', label: 'Drama' },
  { value: 'Action', label: 'Action' },
  { value: 'Crime', label: 'Crime' },
]

/** Save Movie */
const handleSave = async () => {
  try {
    await movieSchema.validate(form);
    form.id = props.modelValue.items[props.modelValue.items.length - 1].id + 1;
    props.modelValue.items.push({ ...form });
    Swal.fire({
      title: 'Success!',
      text: 'Movie saved with success!',
      icon: 'success',
      confirmButtonText: 'Close'
    });
    clearForm();
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

/** Clear form field */
const clearForm = () => {
  form.id = 0;
  form.name = '';
  form.description = '';
  form.image = '';
  form.rating = 0;
  form.genres = [];
  form.inTheaters = false;
}

defineExpose({clearForm, handleSave})
</script>

<style lang="scss" scoped></style>
