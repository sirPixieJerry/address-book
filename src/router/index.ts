import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../pages/UserLogin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserLogin,
    },
  ],
});

export default router;
