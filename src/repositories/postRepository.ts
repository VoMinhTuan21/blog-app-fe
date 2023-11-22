import Repository from "./repository";
import type { IResponseSuccess, PaginationResponse } from "../types/global";
import type { Post, PostItem, PostLatest, PostsCateLatest } from "../types/api/post";

const resource = "/post";

const PostRepository = {
	create: async (data: FormData) => {
		const accessToken = localStorage.getItem("blog-app-access-token");

		const response = await Repository.post<IResponseSuccess<Post>>(resource, data, {
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		});

		return response.data;
	},

	getOne: async (id: string) => {
		const response = await Repository.get<IResponseSuccess<Post>>(`${resource}/${id}`);

		return response.data;
	},

	getTopStories: async () => {
		const response = await Repository.get<IResponseSuccess<PostItem[]>>(
			`${resource}/top-stories?limit=14`
		);

		return response.data.data;
	},

	getLatestPostAllCate: async () => {
		const response = await Repository.get<IResponseSuccess<PostsCateLatest[]>>(
			`${resource}/latest-all-cate?limit=5`
		);

		return response.data.data;
	},

	getRelatedPosts: async (postId: string, limit: number) => {
		const response = await Repository.get<IResponseSuccess<PostLatest[]>>(
			`${resource}/related/${postId}?limit=${limit}`
		);

		return response.data.data;
	},

	getLatestPosts: async (postId: string, limit: number) => {
		const response = await Repository.get<IResponseSuccess<PostItem[]>>(
			`${resource}/latest/${postId}?limit=${limit}`
		);

		return response.data;
	},

	getPostsByCategory: async (query: { categoryId: string; limit: number; page: number }) => {
		const response = await Repository.get<IResponseSuccess<PaginationResponse<PostItem>>>(
			`${resource}?categoryId=${query.categoryId}&limit=${query.limit}&page=${query.page}`
		);

		return response.data.data;
	},
};

export default PostRepository;
