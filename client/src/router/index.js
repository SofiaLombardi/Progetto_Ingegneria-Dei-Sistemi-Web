import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Wishlist from '../views/Wishlist.vue';
import Stats from '../views/Stats.vue';
import Profile from '../views/Profile.vue';
import MyList from '../views/MyList.vue'; 

const routes = [
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/wishlist', component: Wishlist },
  { path: '/list', component: MyList }, 
  { path: '/stats', component: Stats },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protezione rotte: se non sei loggato, vai al login
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;
