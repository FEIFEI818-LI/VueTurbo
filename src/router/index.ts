import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页",
    },
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/hi",
    name: "hi",
    meta: {
      title: "Hihi",
    },
    component: () => import("@/views/Hi.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(__BASE_URL),
  routes,
});
export default router;
