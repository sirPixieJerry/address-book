import { createRouter, createWebHistory } from 'vue-router';
import UserLoginPage from '../pages/UserLoginPage.vue';
import CreateContactPage from '../pages/CreateContactPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserLoginPage,
    },
    {
      path: '/create-contact',
      name: 'create contact',
      component: CreateContactPage,
    },
  ],
});

export default router;
