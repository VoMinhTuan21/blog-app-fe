import Repository from "./repository";
import type { IResponseSuccess } from "../types/global";
import type { LoginSocial, SignIn, SignUp, TokenInfo } from "../types/api/auth";

const resource = "/auth";

const AuthRepository = {
	loginGoogle: async (data: LoginSocial) => {
		const response = await Repository.post<IResponseSuccess<TokenInfo>>(`${resource}/google`, data);

		return response.data;
	},
	loginFacebook: async (data: LoginSocial) => {
		const response = await Repository.post<IResponseSuccess<TokenInfo>>(`${resource}/facebook`, data);

		return response.data;
	},
	signIn: async (data: SignIn) => {
		const response = await Repository.post<IResponseSuccess<TokenInfo>>(`${resource}/sign-in`, data);

		return response.data.data;
	},
	signUp: async (data: SignUp) => {
		const response = await Repository.post<IResponseSuccess<TokenInfo>>(`${resource}/sign-up`, data);

		return response.data.data;
	},
};

export default AuthRepository;
