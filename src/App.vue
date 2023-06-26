<template>
  <header class="h-40 p-3 flex items-end justify-end">
    <Button @click="modalAdd = true">
      <Icon icon="material-symbols:add-circle-outline" /> Add movie
    </Button>
  </header>
  <main class="min-h-screen w-10/12 m-auto">
    <div class="flex flex-wrap gap-2 items-center justify-center ">
      <MovieCard v-for="item in localDB.items" :key="item.id" :movie="item" />
    </div>
  </main>
  <FormModal :is-open="modalAdd">
    <template #header>
      <h1 class="text-lg">Add Movie</h1>
    </template>
    <template #default>
      <Input id="name" label="Name" v-model="form.name" required />
      <Textarea id="description" label="Description" v-model="form.description" />
      <Input id="image" label="Image URL" v-model="form.image" />
      <Select id="genres" label="Genres" v-model="form.genres" :options="genderOptions" is-multiple required />
      <Checkbox id="inTheaters" v-model="form.inTheaters" label="In Theaters?" />
    </template>
    <template #footer>
      <Button @click="modalAdd = false">Cancel</Button>
      <Button status="success" @click="handleSaveMovie">
        <Icon icon="ic:round-save" /> Save
      </Button>
    </template>
  </FormModal>
  <footer></footer>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import MovieCard from './components/Cards/MovieCard.vue'
import db from './composables/movies.json'
import Button from './components/Form/Button.vue';
import Input from './components/Form/Input.vue';
import FormModal from './components/Modal/FormModal.vue';
import Textarea from './components/Form/Textarea.vue';
import Select from './components/Form/Select.vue';
import Checkbox from './components/Form/Checkbox.vue';
import Swal from 'sweetalert2';

// Field Validator
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

/** Used to Copy Database to memory */
const localDB = ref(db)
const modalAdd = ref(false)

/** Field Validation with Yup */
const movieSchema = Yup.object().shape({
  name: Yup.string().label("name").required().min(3),
  description: Yup.string().label("name").notRequired(),
  image: Yup.string().label("name").notRequired(),
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
const handleSaveMovie = async () => {
  try {
    await movieSchema.validate(form);
    form.id = localDB.value.items[localDB.value.items.length - 1].id + 1;
    localDB.value.items.push({ ...form });
    console.log(localDB.value.items);
    modalAdd.value = false;
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

</script>
