import { createWebHistory, createRouter } from "vue-router";
import dashboard from "@/views/admin/dashboard.vue";
const routes = [
  {
    path: "/admin",
    name: "dashboard",
    component: dashboard,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
