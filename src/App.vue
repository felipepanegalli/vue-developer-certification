<template>
  <div class="bg-gray-900 min-h-screen w-screen">
    <div class="flex flex-wrap gap-2 gap-y-4 min-h-screen items-center justify-center">
      <MovieCard v-for="item in localDB.items" :key="item.id" :movie="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MovieCard from './components/Cards/MovieCard.vue'
import db from './composables/movies.json'

/** Used to Copy Database to memory */
const localDB = ref()
localDB.value = db

</script>

<style lang="scss" scoped></style>
