import Repository from "./repository";
import type { IResponseSuccess } from "../types/global";
import type { Category } from "../types/api/category";

const resource = "/category";

const CategoryRepository = {
	getAll: async () => {
		const response = await Repository.get<IResponseSuccess<Category[]>>(resource);

		return response.data;
	},
};

export default CategoryRepository;
