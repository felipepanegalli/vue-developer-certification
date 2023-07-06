<script setup>
import db from '@/composables/movies.json';
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import StarIcon from '@/components/Icons/StarIcon.vue';
import {Icon} from '@iconify/vue';

const movie = ref(null);
const route = useRoute();

/** Get Movie*/
const getMovie = () => {
  const index = db.items.findIndex(item => item.id === parseInt(route.params.id.toString()));
  movie.value = db.items[index];
};

/** Rating */
const hasRating = computed(() => {
  return (movie.value.rating === 0 || movie.value.rating === null) ? ' - ' : movie.value.rating;
});

onMounted(() => {
  getMovie();
});
</script>

<template>
  <section v-if="movie" class="min-h-screen flex w-10/12 m-auto">
    <div class="flex flex-col md:flex-row items-center justify-center gap-5">
      <div>
        <div class="relative">
          <h1 class="absolute text-[10px] top-[14px] right-[17px] z-10 text-yellow-800">{{ hasRating }}</h1>
          <StarIcon color="#eab30a" width="30" height="30" class="absolute top-1 right-1 drop-shadow-md"/>
          <img :src="movie.image" :alt="movie.name" class="h-96 card-w rounded-t-md">
        </div>
      </div>
      <div class="w-10/12 md:w-8/12 flex gap-2 flex-col text-white">
        <h1 class="text-3xl">{{ movie.name }}</h1>
        <div class="pb-2">
          <span v-for="gender in movie.genres" :key="gender"
                class="mr-1 text-[12px] bg-indigo-400 text-white py-1 px-2 rounded-full">
            {{ gender }}
          </span>
        </div>
        <p>{{ movie.description }}</p>
        <RouterLink :to="{name: 'index'}">
          <p class="mt-3 w-[80px] flex items-center justify-center py-1 gap-2 hover:bg-indigo-800"><Icon icon="mdi:arrow-back"></Icon> Back</p>
        </RouterLink>
      </div>
    </div>
  </section>
  <div v-else>
    <h1>Movie not found!</h1>
  </div>
</template>

<style scoped lang="scss">

</style>
