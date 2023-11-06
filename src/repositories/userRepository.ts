import Repository from "./repository";
import type { IResponseSuccess } from "../types/global";
import type { User } from "../types/api/user";

const resource = "/user";

const UserRepository = {
	getUserInfo: async () => {
		const accessToken = localStorage.getItem("blog-app-access-token");

		const response = await Repository.get<IResponseSuccess<User>>(resource, {
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		});

		return response.data;
	},
};

export default UserRepository;
