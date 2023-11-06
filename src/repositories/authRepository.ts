import Repository from "./repository";
import type { IResponseSuccess } from "../types/global";
import type { LoginSocial, TokenInfo } from "../types/api/auth";

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
};

export default AuthRepository;
