import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pets',
      component: () => import('../views/PetsView.vue'),
    },
    {
      path: '/',
      name: 'pets-novo',
      component: () => import('../views/NewPetView.vue'),
    },
  ],
});

export default router;
