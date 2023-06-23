<template>
  <div class="max-w-xs">
    <div class="card-poster">
      <img :src="movie.image" :alt="movie.name" class="h-96 card-w rounded-t-md">
    </div>
    <div class="card-footer bg-white px-2 py-4 card-w flex flex-col gap-2 h-44 justify-between rounded-b-md">
      <div class="card-footer__info">
        <h1>{{ movie.name }}</h1>
        <div class="pb-2">
          <span v-for="gender in movie.genres" :key="gender" class="mr-1 text-[10px] bg-indigo-400 text-white py-1 px-2 rounded-full">
          {{ gender }}
        </span>
        </div>
        <p class="text-[10px]">{{ movie.description }}</p>
      </div>
      <div class="card-footer__rating text-[10px]">
        Rating: ({{ movie.rating }}/5) <span v-for="i in movie.rating" :key="i">⭐</span>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  movie: Object
})
</script>

<style lang="scss" scoped>
.card-w{
  width: 272px;
}
</style>
