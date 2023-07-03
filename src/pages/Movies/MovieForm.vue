<template>
  <Input id="name" label="Name" v-model="form.name" required/>
  <Textarea id="description" label="Description" v-model="form.description"/>
  <Input id="image" label="Image URL" v-model="form.image"/>
  <Select id="genres" label="Genres" v-model="form.genres" :options="genderOptions" is-multiple required/>
  <Checkbox id="inTheaters" v-model="form.inTheaters" label="In Theaters?"/>
</template>

<script setup>
import {reactive} from 'vue';
import Input from '../../components/Form/Input.vue';
import Textarea from '../../components/Form/Textarea.vue';
import Select from '../../components/Form/Select.vue';
import Checkbox from '../../components/Form/Checkbox.vue';
import Swal from 'sweetalert2';

/** Field Validator */
import * as Yup from 'yup';
import {pt} from 'yup-locale-pt';

Yup.setLocale(pt);

const props = defineProps({
  modelValue: Object,
  movie: Object,
  mode: String,
});

/** Field Validation with Yup */
const movieSchema = Yup.object().shape({
  name: Yup.string().label('name').required().min(3),
  description: Yup.string().label('description').notRequired(),
  image: Yup.string().label('image').notRequired(),
  genres: Yup.array().label('genres').min(1),
  inTheaters: Yup.boolean().label('in theaters').notRequired().default(false),
});

/** Movie form */
const form = reactive({
  name: props.movie?.name ?? '',
  description: props.movie?.description ?? '',
  image: props.movie?.image ?? '',
  rating: props.movie?.rating ?? 0,
  genres: props.movie?.genres ?? [],
  inTheaters: props.movie?.inTheaters ?? false,
});

/** Some genders */
const genderOptions = [
  {value: 'Drama', label: 'Drama'},
  {value: 'Action', label: 'Action'},
  {value: 'Crime', label: 'Crime'},
];

/** Save/update Movie */
const handleSave = async () => {
  try {
    if (props.mode === 'create') {
      await movieSchema.validate(form);
      form.id = props.modelValue.items[props.modelValue.items.length - 1].id + 1;
      props.modelValue.items.push({...form});
    } else {
      await movieSchema.validate(form);
      const id = props.movie.id;
      const index = props.modelValue.items.findIndex(item => item.id === id);
      props.modelValue.items[index].name = form.name;
      props.modelValue.items[index].description = form.description;
      props.modelValue.items[index].image = form.image;
      props.modelValue.items[index].genres = form.genres;
      props.modelValue.items[index].inTheaters = form.inTheaters;
    }
    await Swal.fire({
      title: 'Success!',
      text: 'Movie saved with success!',
      icon: 'success',
      confirmButtonText: 'Close',
    });
    clearForm();
    return false;
  } catch (error) {
    await Swal.fire({
      title: 'Error ocurred!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Close',
    });
    console.log(error);
    return true;
  }
};

/** Clear form field */
const clearForm = () => {
  form.id = 0;
  form.name = '';
  form.description = '';
  form.image = '';
  form.rating = 0;
  form.genres = [];
  form.inTheaters = false;
};

defineExpose({clearForm, handleSave});

</script>

<style lang="scss" scoped></style>
