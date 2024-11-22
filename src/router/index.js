import { createWebHistory, createRouter } from "vue-router";
import store from "./store"; // Import Vuex store
import AdminPage from "@/views/admin/AdminPage.vue";
import login from "@/views/admin/login.vue";
import authService from "@/services/auth.service";
import dashboard from "@/views/admin/dashboard.vue";
import book from "@/views/admin/book/index.vue";
import createBook from "@/views/admin/book/create.vue";
import editBook from "@/views/admin/book/edit.vue";
import publisher from "@/views/admin/publisher/index.vue";
import editPublisher from "@/views/admin/publisher/edit.vue";
import createPublisher from "@/views/admin/publisher/create.vue";
import category from "@/views/admin/category/index.vue";
import editCategory from "@/views/admin/category/edit.vue";
import createCategory from "@/views/admin/category/create.vue";
import reader from "@/views/admin/reader/index.vue";
import createReader from "@/views/admin/reader/create.vue";
import editReader from "@/views/admin/reader/edit.vue";
import bookOrder from "@/views/admin/ManageBorrowsBook/index.vue";
import createBookOrder from "@/views/admin/ManageBorrowsBook/create.vue";
import editBookOrder from "@/views/admin/ManageBorrowsBook/edit.vue";
import ClientPage from "@/views/client/ClientPage.vue";
import clientIndex from "@/views/client/index.vue";
import BookDeatil from "@/views/client/BookDeatil.vue";
import ClientBorrow from "@/views/client/ClientBorrow.vue";
import Swal from "sweetalert2";

const routes = [
  {
    path: "/admin/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "client",
    component: ClientPage,
    children: [
      {
        path: "/",
        name: "index",
        component: clientIndex,
      },
      {
        path: "/detail/:id",
        name: "detail",
        component: BookDeatil,
      },
      {
        path: "/borrow/:bookId",
        name: "clientBorrow",
        component: ClientBorrow,
      },
    ],
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
      {
        path: "publisher",
        name: "publisher.index",
        component: publisher,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "publisher/create",
        name: "publisher.create",
        component: createPublisher,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "publisher/edit/:id",
        name: "publisher.edit",
        component: editPublisher,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "category",
        name: "category.index",
        component: category,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "category/create",
        name: "category.create",
        component: createCategory,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "category/edit/:id",
        name: "category.edit",
        component: editCategory,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "reader",
        name: "reader.index",
        component: reader,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "reader/create",
        name: "reader.create",
        component: createReader,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "reader/edit/:id",
        name: "reader.edit",
        component: editReader,
        meta: { requiresRole: ["manager"] },
      },
      {
        path: "bookOrder",
        name: "bookOrder.index",
        component: bookOrder,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "bookOrder/create",
        name: "bookOrder.create",
        component: createBookOrder,
        meta: { requiresRole: ["staff", "manager"] },
      },
      {
        path: "bookOrder/edit/:id",
        name: "bookOrder.edit",
        component: editBookOrder,
        meta: { requiresRole: ["staff", "manager"] },
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
  if (!store.state.Role) {
    try {
      await store.dispatch("fetchRole"); // Gọi action fetchRole để khởi tạo role
    } catch (error) {
      console.error("Failed to fetch role:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresRole)) {
    try {
      const role = store.state.Role;
      if (!role) {
        return next({ path: "/admin/login" });
      }
      if (to.meta.requiresRole.indexOf(role) !== -1) {
        return next();
      } else {
        await Swal.fire({
          position: "top",
          title: "Thông báo",
          text: "bạn không đủ quyền hạn để vào trang này",
          icon: "question",
        });
        return next(false);
      }
    } catch (error) {
      next({ path: "/admin/login" });
      console.log(error.message);
    }
  } else {
    next();
  }
});
export default router;
