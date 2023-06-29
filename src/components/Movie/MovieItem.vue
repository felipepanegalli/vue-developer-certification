<template>
  <div class="max-w-xs">
    <div class="card-poster relative">
      <h1 class="absolute text-[10px] top-[14px] right-[17px] z-10 text-yellow-800">{{ hasRating }}</h1>
      <StarIcon color="#eab30a" width="30" height="30" class="absolute top-1 right-1 drop-shadow-md" />
      <img :src="movie.image" :alt="movie.name" class="h-96 card-w rounded-t-md">
    </div>
    <div class="card-footer bg-white px-2 py-4 card-w flex flex-col gap-2 h-52 justify-between rounded-b-md">
      <div class="card-footer__info">
        <h1>{{ movie.name }}</h1>
        <div class="pb-2">
          <span v-for="gender in movie.genres" :key="gender"
            class="mr-1 text-[10px] bg-indigo-400 text-white py-1 px-2 rounded-full">
            {{ gender }}
          </span>
        </div>
        <p class="text-[10px]">{{ resumeText(movie.description, 200) }}</p>
      </div>
      <div class="card-footer__rating text-[10px] flex items-center justify-between">
        <div class="flex items-center">
          <span>Rating: ({{ hasRating }}/5)</span>
          <span class="flex">
            <StarIcon v-for="i in 5" :key="i" :color="i <= movie.rating ? '#eab30a' : '#888888'" width="16" height="16"
              class="cursor-pointer" @click="setRating(i)" />
          </span>
        </div>
        <div class="flex gap-1">
          <button class="bg-gray-300 p-2 rounded-full hover:bg-blue-500 hover:text-white" title="Edit movie"
            @click="$emit('edit', movie.id)">
            <Icon icon="material-symbols:edit-sharp" />
          </button>
          <button class="bg-gray-300 p-2 rounded-full hover:bg-red-500 hover:text-white" title="Delete movie"
            @click="$emit('remove', movie.id)">
            <Icon icon="material-symbols:delete" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StarIcon from '../Icons/StarIcon.vue';
import { Icon } from '@iconify/vue';
import { resumeText } from '../../composables/helpers';

const props = defineProps({
  movie: Object
})

defineEmits(['edit', 'remove'])
const setRating = (val) => {
  props.movie.rating = val
}

const hasRating = computed(() => {
  return (props.movie.rating === 0 || props.movie.rating === null) ? ' - ' : props.movie.rating
})
</script>

<style lang="scss" scoped>
.card-w {
  width: 272px;
}
</style>
