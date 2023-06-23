<template>
  <div class="bg-gray-900 min-h-screen w-screen">
    <div class="flex flex-wrap gap-2 gap-y-4 min-h-screen items-center justify-center">
      <MovieCard v-for="item in db.items" :key="item.id" :movie="item" />
    </div>
  </div>
</template>

<script setup>
import MovieCard from './components/Cards/MovieCard.vue'
import db from './composables/movies.json'

</script>

<style lang="scss" scoped></style>
