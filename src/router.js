import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/places",
      name: "places",
      component: () => import("./views/PlaceList.vue"),
    },
    {
      path: "/places/:id",
      name: "place",
      component: () => import("./views/Place.vue"),
    },
    {
      path: "/itenararies",
      name: "itenararyList",
      component: () => import("./views/ItenararyList.vue"),
    },
    {
      path: "/itenararies/:id",
      name: "itenarary",
      component: () => import("./views/Itenarary.vue"),
    },
    {
      path: "/bookings",
      name: "booking",
      component: () => import("./views/MyBookings.vue"),
    },
    {
      path: "/additenarary",
      name: "addItenarary",
      component: () => import("./views/AddItenarary.vue"),
    },
    {
      path: "/edititenarary/:id",
      name: "editItenarary",
      component: () => import("./views/EditItenarary.vue"),
    },
  ],
});

export default router;