import type { InjectionKey } from "vue";
import type { Theme } from "./types/global";

const ThemeKey: InjectionKey<Theme> = Symbol("Theme");

export { ThemeKey };
