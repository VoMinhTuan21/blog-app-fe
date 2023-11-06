import axios from "axios";
import type { IResponseSuccess } from "../types/global";
import type { TokenInfo } from "../types/api/auth";

const Repository = axios.create({
	baseURL: import.meta.env.VITE_BE_URL,
});
Repository.interceptors.request.use(
	async function (config) {
		// const token = getCookie("Authorization");

		// if (token && config.headers) {
		// 	config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
function createAxiosResponseInterceptor() {
	const interceptor = Repository.interceptors.response.use(
		(response) => response,
		(error) => {
			// Reject promise if usual error
			if (error.response.status !== 401) {
				return Promise.reject(error.response.data);
			}

			/*
			 * When response code is 401, try to refresh the token.
			 * Eject the interceptor so it doesn't loop in case
			 * token refresh causes the 401 response.
			 *
			 * Must be re-attached later on or the token refresh will only happen once
			 */
			Repository.interceptors.response.eject(interceptor);
			const refreshToken = localStorage.getItem("blog-app-refresh-token");
			return Repository.post<IResponseSuccess<TokenInfo>>("/auth/refresh-token", undefined, {
				headers: {
					Authorization: "Bearer " + refreshToken,
				},
			})
				.then((response) => {
					const { accessToken, refreshToken } = response.data.data;

					localStorage.setItem("blog-app-access-token", accessToken);
					localStorage.setItem("blog-app-refresh-token", refreshToken);

					error.response.config.headers["Authorization"] = "Bearer " + accessToken;
					// Retry the initial call, but with the updated token in the headers.
					// Resolves the promise if successful
					return Repository(error.response.config);
				})
				.catch((error2) => {
					// Retry failed, clean up and reject the promise
					return Promise.reject(error2.response.data);
				})
				.finally(createAxiosResponseInterceptor); // Re-attach the interceptor by running the method
		}
	);
}
createAxiosResponseInterceptor();
export default Repository;
