import { createRouter, createWebHistory } from "vue-router";
import Feedback from "./views/Feedback.vue"; // Import your FormView component

const routes = [
  {
    path: "/form/:id",
    name: "Form",
    component: Feedback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
