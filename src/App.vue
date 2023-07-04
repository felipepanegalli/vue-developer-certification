<script setup>
import {computed, defineAsyncComponent, reactive, ref} from 'vue';
import {Icon} from '@iconify/vue';
import MovieItem from './components/Movie/MovieItem.vue';
import db from './composables/movies.json';
import Button from './components/Form/Button.vue';
import Swal from 'sweetalert2';

const MovieModal = defineAsyncComponent({
  loader: () => import('@/pages/Movies/MovieModal.vue'),
  delay: 200,
});

/** Used to Copy Database to memory */
const localDB = ref(db);
const movie = ref(null);
const modal = reactive({
  isOpen: false,
  mode: 'create',
  title: '',
});

/** New Movie */
const handleAddMovie = () => {
  movie.value = null;
  modal.mode = 'create';
  modal.title = 'Add movie';
  modal.isOpen = true;
};

/** Edit Movie */
const handleEditMovie = (id) => {
  const index = localDB.value.items.findIndex(item => item.id === id);
  movie.value = localDB.value.items[index];
  modal.mode = 'edit';
  modal.title = `Edit movie :: ${movie.value.name}`;
  modal.isOpen = true;
};

/** Delete Movie */
const handleDeleteMovie = async (id) => {
  try {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        localDB.value.items = localDB.value.items.filter(item => item.id !== id);
        await Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        );
      }
    });
  } catch (error) {
    await Swal.fire({
      title: 'Error ocurred!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Close',
    });
    console.log(error);
  }
};

/** Average info */
const avgRatings = computed(() => {
  const total = localDB.value.items.reduce((accumulator, obj) => accumulator + obj.rating, 0);
  return (total / localDB.value.items.length).toFixed(1);
});
</script>


<template>
  <header
    class="h-full md:h-20 p-5 flex items-end justify-between w-full md:w-10/12 m-auto flex-wrap bg-gray-800 mb-5 gap-3">
    <div class="flex self-center">
      <p class="text-white">Total movies: {{ localDB.items.length }} / Average Rating: {{ avgRatings }}</p>
    </div>
    <div class="flex items-end gap-3 self-center flex-wrap w-full md:w-auto">
      <Button @click="() => { }" class="w-full md:w-auto">
        <Icon icon="material-symbols:playlist-remove"/>
        Remove ratings
      </Button>
      <Button @click="handleAddMovie" id="addButton" class="w-full md:w-auto">
        <Icon icon="material-symbols:add-circle-outline"/>
        Add movie
      </Button>
    </div>

  </header>
  <main class="min-h-screen w-10/12 m-auto">
    <div class="flex flex-wrap items-center justify-center md:justify-start gap-5">
      <MovieItem
        v-for="item in localDB.items" :key="item.id" :movie="item"
        @edit="handleEditMovie" @remove="handleDeleteMovie"/>
    </div>
  </main>
  <MovieModal
    :is-open="modal.isOpen" :data="localDB" :movie="movie" :title="modal.title"
    :mode="modal.mode" @closeModal="modal.isOpen = false"
  />
</template>
