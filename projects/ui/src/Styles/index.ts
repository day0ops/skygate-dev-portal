import { colors, darkColors, SiteColors } from "./colors";

export { colors, darkColors } from "./colors";
export { makeGlobalStyles } from "./global-styles";

// Themes
export type SiteTheme = SiteColors;

/** Picks the Emotion theme object for a color scheme - the light theme is the default. */
export function getTheme(colorScheme: "light" | "dark"): SiteTheme {
  return colorScheme === "dark" ? darkColors : colors;
}
