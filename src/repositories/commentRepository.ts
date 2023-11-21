import Repository from "./repository";
import type { IResponseSuccess, PaginationResponse } from "../types/global";
import type { IComment, GetComments, CreateCommentDTO } from "../types/api/comment";

const resource = "/comment";

const CommentRepository = {
	getMany: async (query: GetComments) => {
		const response = await Repository.get<IResponseSuccess<PaginationResponse<IComment>>>(
			`${resource}?postId=${query.postId}&page=${query.page}&limit=${query.limit}&sortType=${query.sortType}`
		);

		return response.data.data;
	},
	create: async (data: CreateCommentDTO) => {
		const response = await Repository.post<IResponseSuccess<string>>(resource, data);

		return response.data;
	},
	reactionComment: async (commentId: string, actionType: number) => {
		const response = await Repository.put<IResponseSuccess<boolean>>(
			`${resource}/like-or-dislike/${commentId}/${actionType}`
		);

		return response.data;
	},
};

export default CommentRepository;
