import type { Ref } from "vue";

export interface Theme {
	value: Ref<String>;
	toggleTheme: () => void;
}

export interface IResponseSuccess<T> {
	message: string;
	data: T;
}
export interface IResponseError {
	error: string;
	statusCode: number;
}

export type Option = {
	label: string;
	value: string;
};

export interface PaginationResponse<T> {
	total: number;
	previous?: {
		page: number;
		limit: number;
	};
	data: T[];
	next?: {
		page: number;
		limit: number;
	};
	rowPerpage: number;
}
