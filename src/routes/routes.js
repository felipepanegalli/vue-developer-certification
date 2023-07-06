import * as VueRouter from 'vue-router';
import routes from '@/routes/movies';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [...routes],
});
export default router;
