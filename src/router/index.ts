import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isTokenExpired } from "../utils/jwt";

export enum RoutePath {
	SIGN_UP = "/sign-up",
	HOME = "/",
	GG_REDIRECT = "/auth/google-redirect",
	FB_REDIRECT = "/auth/facebook-redirect",
	CATEGORY = "/category/:slug",
	POST_DETAIL = "/:slug",
	SHARE_SUCCESS = "/share-success",
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
			path: RoutePath.SIGN_UP,
			name: "sign-up",
			component: () => import("../views/SignUpView.vue"),
		},
		{
			path: RoutePath.CATEGORY,
			name: "category",
			props: true,
			component: () => import("../views/CategoryView.vue"),
		},
		{
			path: RoutePath.SHARE_SUCCESS,
			name: "share-success",
			component: () => import("../views/ShareSuccessView.vue"),
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
			name: "google-redirect",
			props: true,
			component: () => import("../views/SocialRedirect.vue"),
		},
		{
			path: RoutePath.FB_REDIRECT,
			name: "facebook-redirec",
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

	switch (to.name) {
		case "home":
			document.title = "Báo VietNamNet - Tin tức mới nhất, tin nhanh Việt Nam và thế giới";
			break;
		case "category":
			let cateTitle = to.params.slug as string;
			cateTitle = cateTitle.split("-").join(" ");
			document.title = cateTitle[0].toUpperCase() + cateTitle.slice(1);
			break;
		case "sign-up":
			document.title = "Đăng ký";
			break;
		case "post":
			const slug = to.params.slug as string;
			const postTitle = slug.split("_")[0].split("-").join(" ");
			document.title = postTitle[0].toUpperCase() + postTitle.slice(1);
		default:
			break;
	}

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
