import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("@/pages/Article.vue"),
    props: true,
  },
  {
    path: "/covid",
    name: "CovidInfo",
    component: () => import("@/pages/Covid.vue"),
  },
  {
    path: "/crypto",
    name: "Cryptocurrencies",
    component: () => import("@/pages/Crypto.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
