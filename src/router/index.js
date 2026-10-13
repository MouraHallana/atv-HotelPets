import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pets',
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsView.vue'),
    },
    {
      path: '/pets/novo',
      name: 'addPet',
      component: () => import('../views/AddPetsView.vue'),
    },  
    {
      path: '/pets/:id',
      name: 'detalhesPet',
      component: () => import('../views/PetDetalhesView.vue'),
    },  {
      path: '/tutores',
      name: 'tutoresView',
      component: () => import('../views/TutoresView.vue'),
    },  {
      path: '/tutores/:id',
      name: 'detalhesTutor',
      component: () => import('../views/TutorDetalhesView.vue'),
    },  {
      path: '/tutores/novo',
      name: 'addTutor',
      component: () => import('../views/AddTutorView.vue'),
    },  
  ],
});

export default router;