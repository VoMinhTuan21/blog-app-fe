export type GetComments = {
	postId: string;
	page: number;
	limit: number;
	sortType: 1 | 2 | 3;
};

export interface IComment {
	id: string;
	description: string;
	createdAt: Date;
	love: number;
	user: {
		id: string;
		name: string;
	};
}

export interface CreateCommentDTO {
	description: string;
	postId: string;
}
