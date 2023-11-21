export type LoginSocial = {
	code: string;
	redirectURL: string;
};

export type TokenInfo = {
	accessToken: string;
	refreshToken: string;
};

export type SignIn = {
	email: string;
	password: string;
	rememberMe?: boolean;
};

export interface SignUp extends Omit<SignIn, "rememberMe"> {
	name: string;
}
