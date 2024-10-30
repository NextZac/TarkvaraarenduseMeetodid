import { createRouter, createWebHistory } from "vue-router";
import Feedback from "./views/Feedback.vue";
import Admin from "./views/Admin.vue";

const routes = [
  {
    path: "/form/:id",
    name: "Form",
    component: Feedback,
  },
  {
    path: "/answers",
    name: "Answers",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
