export function genURLFacebookLogin(state: string) {
	const appId = import.meta.env.VITE_FB_APP_ID;
	const redirectURL = import.meta.env.VITE_FB_REDIRECT || "";

	const uri = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
		redirectURL
	)}&state=${state}&scope=email`;

	return uri;
}