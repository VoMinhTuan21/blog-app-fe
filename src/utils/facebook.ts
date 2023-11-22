export function genURLFacebookLogin(state: string) {
	const appId = import.meta.env.VITE_FB_APP_ID;
	const redirectURL = import.meta.env.VITE_FB_REDIRECT || "";

	const uri = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
		redirectURL
	)}&state=${state}&scope=email`;

	return uri;
}

export const shareOnFacebook = (path: string) => {
	const appId = import.meta.env.VITE_FB_APP_ID;
	const href = encodeURIComponent(path); // URL of the article you want to share

	const shareSuccessUri = import.meta.env.VITE_FB_SHARE_SUCCESS;
	const redirectUri = encodeURIComponent(shareSuccessUri); // URL where Facebook will redirect after sharing

	const shareUrl = `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${href}&redirect_uri=${redirectUri}`;

	window.open(shareUrl, "_blank");
};
