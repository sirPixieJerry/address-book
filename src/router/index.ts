import { createRouter, createWebHistory } from 'vue-router';
import ContactListPage from '../pages/ContactListPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ContactListPage,
    },
  ],
});

export default router;
