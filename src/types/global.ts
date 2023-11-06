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
