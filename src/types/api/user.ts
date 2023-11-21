export type User = {
	id: string;
	name: string;
	email: string;
};

export interface UserPost extends Omit<User, "email"> {
	avatar: string;
}
