import { defineStore } from "pinia";

export const useUser = defineStore("user", {
	state: () => ({
		isAuthenticated: false,
		user: {
			id: "",
			name: "",
			email: "",
		} as {
			id: string;
			name: string;
			email: string;
		},
	}),
	actions: {
		setLogined() {
			this.isAuthenticated = true;
		},
		setUserData(data: { id: string; name: string; email: string }) {
			this.user = data;
		},
		logout() {
			this.isAuthenticated = false;
			this.user = {
				id: "",
				name: "",
				email: "",
			};
		},
	},
});
