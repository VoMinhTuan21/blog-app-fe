import type { InjectionKey } from "vue";
import type { Theme } from "./types";

const ThemeKey: InjectionKey<Theme> = Symbol("Theme");

export { ThemeKey };
