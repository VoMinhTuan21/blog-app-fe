export function genURLGoogleLogin(state: string) {
	const rootUrl = import.meta.env.VITE_GOOGLE_URL;

	const options = {
		redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
		client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [import.meta.env.VITE_GOOGLE_EMAIL_SCOPE, import.meta.env.VITE_GOOGLE_PROFILE_SCOPE].join(" "),
		state,
	};

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`;
}
