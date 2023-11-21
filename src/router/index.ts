import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isTokenExpired } from "../utils/jwt";

export enum RoutePath {
	SIGN_UP = "/sign-up",
	HOME = "/",
	GG_REDIRECT = "/auth/google-redirect",
	FB_REDIRECT = "/auth/facebook-redirect",
	CATEGORY = "/category",
	POST_DETAIL = "/:slug",
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: RoutePath.HOME,
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
			path: RoutePath.SIGN_UP,
			name: "sign-up",
			component: () => import("../views/SignUpView.vue"),
		},
		{
			path: RoutePath.CATEGORY,
			name: "category",
			component: () => import("../views/CategoryView.vue"),
		},
		{
			path: "/write",
			name: "write",
			component: () => import("../views/WriteView.vue"),
		},
		{
			path: "/text-editor",
			name: "text-editor",
			component: () => import("../components/TextEditor.vue"),
		},
		{
			path: RoutePath.GG_REDIRECT,
			name: "googleRedirect",
			props: true,
			component: () => import("../views/SocialRedirect.vue"),
		},
		{
			path: RoutePath.FB_REDIRECT,
			name: "facebookRedirect",
			props: true,
			component: () => import("../views/SocialRedirect.vue"),
		},
		{
			path: RoutePath.POST_DETAIL,
			name: "post",
			component: () => import("../views/PostDetailView.vue"),
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0, behavior: "smooth" };
		}
	},
});

router.beforeEach((to, from, next) => {
	const accessToken = localStorage.getItem("blog-app-access-token");

	// if (to.name === "write") {
	// 	if (accessToken) {
	// 		const expired = isTokenExpired(accessToken);
	// 		if (expired) {
	// 			next({ name: "login" });
	// 		}
	// 		next();
	// 	}
	// 	next({ name: "login" });
	// }
	next();
});

export default router;
