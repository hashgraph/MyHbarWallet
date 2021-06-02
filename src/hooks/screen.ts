import { useMediaQuery } from "@vueuse/core";
import { Ref } from "vue";

// https://tailwindcss.com/docs/breakpoints
const breakpoints = {
  lg: "1024px",
  md: "768px",
  sm: "640px",
};

export function useScreen(breakpoint: keyof typeof breakpoints): Ref<boolean> {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}
