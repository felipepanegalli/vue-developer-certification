<template>
  <header class="h-40 pb-3 flex items-end justify-end w-10/12 m-auto">
    <Button @click="modalAdd = true">
      <Icon icon="material-symbols:add-circle-outline" /> Add movie
    </Button>
  </header>
  <main class="min-h-screen w-10/12 m-auto">
    <div class="flex flex-wrap items-center justify-between gap-5">
      <MovieCard v-for="item in localDB.items" :key="item.id" :movie="item" />
    </div>
  </main>
  <MoviesCreateModal :is-open="modalAdd" :localDB="localDB" @closeModal="modalAdd = false" />
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import MovieCard from './components/Cards/MovieCard.vue'
import db from './composables/movies.json'
import Button from './components/Form/Button.vue';
import MoviesCreateModal from './pages/Movies/Create.vue'

/** Used to Copy Database to memory */
const localDB = ref(db)
const modalAdd = ref(false)
</script>
