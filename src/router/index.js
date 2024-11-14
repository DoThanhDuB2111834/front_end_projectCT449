import { createWebHistory, createRouter } from "vue-router";
import AdminPage from "@/views/admin/AdminPage.vue";
import login from "@/views/admin/login.vue";
import authService from "@/services/auth.service";
import dashboard from "@/views/admin/dashboard.vue";
import book from "@/views/admin/book/index.vue";
import createBook from "@/views/admin/book/create.vue";
import editBook from "@/views/admin/book/edit.vue";
import Swal from "sweetalert2";
const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
    meta: { requiresRole: ["staff", "manager"] },

    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: dashboard,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "book",
        name: "book.index",
        component: book,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "book/create",
        name: "book.create",
        component: createBook,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "book/edit/:id",
        name: "book.edit",
        component: editBook,
        meta: { requiresRole: ["manager"] },
      },
    ],
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
      if (!role) {
        next({ path: "/login" });
        await Swal.fire({
          position: "top",
          title: "Thông báo",
          text: "bạn cần phải đăng nhập",
          icon: "question",
        });
      }
      if (to.meta.requiresRole.indexOf(role) !== -1) {
        next();
      } else {
        await Swal.fire({
          position: "top",
          title: "Thông báo",
          text: "bạn không đủ quyền hạn để vào trang này",
          icon: "question",
        });
        next(false);
      }
    } catch (error) {
      next({ path: "/login" });
      console.log(error.message);
    }
  } else {
    next();
  }
});
export default router;
