import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isTokenExpired } from "../utils/jwt";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/blog",
			name: "blog",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/BlogView.vue"),
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue"),
		},
		{
			path: "/write",
			name: "write",
			component: () => import("../views/WriteView.vue"),
		},
		{
			path: "/auth/google-redirect",
			name: "googleRedirect",
			props: true,
			component: () => import("../views/SocialRedirect.vue"),
		},
		{
			path: "/auth/facebook-redirect",
			name: "facebookRedirect",
			props: true,
			component: () => import("../views/SocialRedirect.vue"),
		},
		{
			path: "/:slug",
			name: "post",
			component: () => import("../views/PostDetailView.vue"),
		},
	],
});

router.beforeEach((to, from, next) => {
	const accessToken = localStorage.getItem("blog-app-access-token");

	if (to.name === "write") {
		if (accessToken) {
			const expired = isTokenExpired(accessToken);
			if (expired) {
				next({ name: "login" });
			}
			next();
		}
		next({ name: "login" });
	}
	next();
});

export default router;
