<template>
  <header class="h-32 py-3 flex items-end justify-between w-10/12 m-auto flex-wrap">
    <div>
      <p class="text-white">Total movies: {{ localDB.items.length }} / Average Rating: {{ avgRatings }}</p>
    </div>
    <div class="flex items-end gap-3">
      <Button @click="() => { }">
        <Icon icon="material-symbols:playlist-remove" /> Remove ratings
      </Button>
      <Button @click="modal.create = true">
        <Icon icon="material-symbols:add-circle-outline" /> Add movie
      </Button>
    </div>

  </header>
  <main class="min-h-screen w-10/12 m-auto">
    <div class="flex flex-wrap items-center justify-between gap-5">
      <MovieCard v-for="item in localDB.items" :key="item.id" :movie="item" @deleteMovie="handleDeleteMovie"
        @editMovie="handleEditMovie" />
    </div>
  </main>
  <MoviesCreateModal :is-open="modal.create" :localDB="localDB" @closeModal="modal.create = false" />
  <MoviesEditModal :is-open="modal.edit" :movie="movie" @closeModal="modal.edit = false" />
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import MovieCard from './components/Cards/MovieCard.vue'
import db from './composables/movies.json'
import Button from './components/Form/Button.vue';
import MoviesCreateModal from './pages/Movies/Create.vue'
import MoviesEditModal from './pages/Movies/Edit.vue'
import Swal from 'sweetalert2';

/** Used to Copy Database to memory */
const localDB = ref(db)
const movie = ref(null)
const modal = reactive({
  create: false,
  edit: false,
})

/** Edit Movie */
const handleEditMovie = (id) => {
  const index = localDB.value.items.findIndex(item => item.id === id);
  movie.value = localDB.value.items[index];
  modal.edit = true
}

/** Delete Movie */
const handleDeleteMovie = (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        localDB.value.items = localDB.value.items.filter(item => item.id !== id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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

/** Average info */
const avgRatings = computed(() => {
  const total = localDB.value.items.reduce((accumulator, obj) => accumulator + obj.rating, 0)
  return (total / localDB.value.items.length).toFixed(1)
})
</script>
