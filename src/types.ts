import type { Ref } from "vue";

export interface Theme {
	value: Ref<String>;
	toggleTheme: () => void;
}
