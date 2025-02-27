import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ContactView from '../views/ContactView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/projects', component: ProjectsView },
  { path: '/contact', component: ContactView },
];

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/AI-Portfolio/' : '/'),
  routes,
});

export default router;