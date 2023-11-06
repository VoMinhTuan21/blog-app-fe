import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
	const decodedToken = jwtDecode(token);
	const currentTime = Date.now() / 1000; // Convert to seconds

	if (decodedToken.exp) {
		return decodedToken.exp < currentTime;
	}

	return false;
};
