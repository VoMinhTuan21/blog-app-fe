import type { Category } from "./category";
import type { UserPost } from "./user";

export type Post = {
	id: string;
	title: string;
	mainDesc: string;
	desc: string;
	thumbnail: string;
	images: ImagePost[];
	user: UserPost;
	createdAt: string;
	category: string;
};

export type ImagePost = {
	id: string;
	url: string;
};

export interface PostItem extends Pick<Post, "id" | "title" | "thumbnail" | "mainDesc"> {
	category: Category;
	comments: number;
}

export interface PostLatest extends Pick<Post, "id" | "title"> {
	thumbnail?: string;
}

export interface PostsCateLatest {
	category: Category;
	posts: PostLatest[];
}
