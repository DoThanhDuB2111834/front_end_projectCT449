import { createWebHistory, createRouter } from "vue-router";
import dashboard from "@/views/admin/dashboard.vue";
import login from "@/views/admin/login.vue";
import authService from "@/services/auth.service";
const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/admin",
    name: "admin",
    component: dashboard,
    meta: { requiresRole: "staff" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresRole)) {
    try {
      const role = (await authService.getRole()).data.role;
      // console.log(role);
      if (role == to.meta.requiresRole) {
        next();
      } else {
        next({ path: "/login" });
      }
    } catch (error) {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
export default router;
