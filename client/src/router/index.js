// Composables
import LoginFormVue from "@/views/core/LoginForm.vue";
import RegFormVue from "@/views/core/RegForm.vue";
import ForgotVue from "@/views/core/Forgot.vue";
import { createRouter, createWebHistory } from "vue-router";
import CodeVue from "@/views/core/Code.vue";
// import CodePageVue from "@/views/core/CodePage.vue";
// import LogPruebaVue from "@/views/core/LogPrueba.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    children: [
      {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LoginFormVue,
      },
    ],
  },
  {
    children: [
      {
        path: "/registro",
        name: "Registro",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: RegFormVue,
      },
    ],
  },
  // {

  //   children: [
  //     {
  //       path: '/recover',
  //       name: 'Recover',
  //       // route level code-splitting
  //       // this generates a separate chunk (Home-[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: ForgotVue,
  //     },
  //   ],
  // },
  {
    children: [
      {
        path: "/codePage/forgotPassword/:id",
        name: "Code",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CodeVue,
      },
    ],
  },
  {
    children: [
      {
        path: "/reset",
        name: "reset",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CodeVue,
      },
    ],
  },
  //   {
  //   children: [
  //     {
  //       path:'/codePage/forgotPassword/:id',
  //       name: 'CodePage',
  //       component: CodePageVue
  //     },
  //   ],
  // },
  {
    children: [
      {
        path: "/forgot",
        name: "ForgotPassword",
        component: ForgotVue,
      },
    ],
  },
  // {
  //   children: [
  //     {
  //       path: "/prueba",
  //       name: "prueba",
  //       component: LogPruebaVue,
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
