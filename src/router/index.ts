import Home from "../views/home.vue";
import OneOnOne from "../views/one-on-one.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* This routes has been remarked temporarily. For default rout to be  1-on-1 only
    { path: '/', name: 'home', component: Home },
    { path: '/1on1', name: '1-on-1 call', component: OneOnOne }*/
    { path: "/", name: "1-on-1 call", component: OneOnOne },
  ],
});

export default router;
