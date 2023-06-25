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
    <Input id="name" label="Name" v-model="form.name" />
    <Textarea id="description" label="Description" v-model="form.description" />
    <Input id="image" label="Image URL" v-model="form.image" />

    <Select id="genres" label="Genres" v-model="form.genres" :options="genderOptions" is-multiple />


    <pre>{{ form }}</pre>
    <template #footer>
      <Button @click="modalAdd = false">Cancel</Button>
      <Button status="success">
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

/** Used to Copy Database to memory */
const localDB = ref(db)
const modalAdd = ref(false)

const form = reactive({
  name: '',
  description: '',
  image: '',
  rating: 0,
  genres: [],
  inTheaters: false,
})

const genderOptions = [
  { value: 'Drama', label: 'Drama' },
  { value: 'Action', label: 'Action' }
]

</script>

<style lang="scss" scoped></style>
