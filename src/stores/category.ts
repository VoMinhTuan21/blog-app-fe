import { defineStore } from "pinia";
import type { Category } from "../types/api/category";

export const useCategory = defineStore("category", {
	state: () => ({
		categories: [] as Category[],
		selectedCate: undefined as Category | undefined,
	}),
	actions: {
		setCategories(data: Category[]) {
			this.categories = data;
		},
		setSelectedCate(id?: string) {
			if (id) {
				this.selectedCate = this.categories.find((item) => item.id === id);
			} else {
				this.selectedCate = undefined;
			}
		},
	},
});
