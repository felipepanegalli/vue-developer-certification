import Index from '@/pages/Movies/Index.vue';
import View from '@/pages/Movies/View.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/movies/:id',
    name: 'movies-detail',
    component: View,
  },
];

export default routes;
