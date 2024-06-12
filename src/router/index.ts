import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
// Components
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
] as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
