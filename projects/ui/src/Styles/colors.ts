import Color from "color";

// Matches Styles/utils.ts's `Color`/`ColorOrAllowed` template-literal type -
// narrow enough to satisfy that constraint, but (unlike a specific literal
// such as `"#f0f5f7"`) not tied to one theme's exact values, so both the
// light and dark palettes below can share this same field type.
type HexColor = `#${string}`;

interface BaseColors {
  januaryGrey: HexColor;
  marchGrey: HexColor;
  aprilGrey: HexColor;
  augustGrey: HexColor;
  septemberGrey: HexColor;
  novemberGrey: HexColor;

  lightGreyTransparent: HexColor;
  darkGreyTransparent: HexColor;

  dropBlue: HexColor;
  splashBlue: HexColor;
  pondBlue: HexColor;
  lakeBlue: HexColor;
  seaBlue: HexColor;
  oceanBlue: HexColor;
  neptuneBlue: HexColor;

  lightGreen: HexColor;
  midGreen: HexColor;
  darkGreen: HexColor;

  royalPurple: HexColor;

  lightRed: HexColor;
  midRed: HexColor;
  darkRed: HexColor;

  pumpkinOrange: HexColor;
  pumpkinOrangeLight10: HexColor;
  pumpkinOrangeLight20: HexColor;

  lightYellow: HexColor;
  midYellow: HexColor;
  darkYellow: HexColor;

  accent: HexColor;
}

// Light mode - the portal's original palette, plus one brand accent. Matches
// lakeBlue below (the REST "GET" method badge color) by design, so the
// accent reads as part of the same color family as the method color key
// rather than introducing an unrelated hue.
const lightBaseColors: BaseColors = {
  januaryGrey: "#f0f5f7",
  marchGrey: "#e9eef3",
  aprilGrey: "#d4d8de",
  augustGrey: "#8693a5",
  septemberGrey: "#6e7477",
  novemberGrey: "#35393b",

  lightGreyTransparent: "#ccd4db21",
  darkGreyTransparent: "#253e5812",

  dropBlue: "#f8fafb",
  splashBlue: "#dbe4ec",
  pondBlue: "#55b8e3",
  lakeBlue: "#158bc2",
  seaBlue: "#45698a",
  oceanBlue: "#325476",
  neptuneBlue: "#253e58",

  lightGreen: "#ebfff9",
  midGreen: "#0dce93",
  darkGreen: "#0fac7c",

  royalPurple: "#7e4bc6",

  lightRed: "#fff7f7",
  midRed: "#bf0a17",
  darkRed: "#a23f3a",

  pumpkinOrange: "#d75b1d",
  pumpkinOrangeLight10: "#e57842",
  pumpkinOrangeLight20: "#ec986e",

  lightYellow: "#fff6e5",
  midYellow: "#ffb831",
  darkYellow: "#c98709",

  accent: "#158bc2",
};

// Dark mode - the greyscale/surface family inverts to match skygate's own
// dashboard (--bg: #0a0a0a, --surface: #121212, --fg: #eaeaea). API-method
// and status colors (lakeBlue, darkGreen, pumpkinOrange, etc.) are kept
// identical to light mode - they're mid-toned enough to read on both
// backgrounds, and staying consistent avoids relearning the REST method
// color key between themes.
const darkBaseColors: BaseColors = {
  ...lightBaseColors,

  januaryGrey: "#121212",
  marchGrey: "#1c1c1c",
  aprilGrey: "#2a2a2a",
  augustGrey: "#9aa3ad",
  septemberGrey: "#a8adb3",
  novemberGrey: "#eaeaea",

  lightGreyTransparent: "#ffffff14",
  darkGreyTransparent: "#00000040",

  dropBlue: "#0a0a0a",
  splashBlue: "#2c2f36",
  neptuneBlue: "#c3cedb",
};

/** `Color(...).hex()` returns a plain `string` - this re-asserts what's always true at runtime: it's a hex color. */
const hex = (color: ReturnType<typeof Color>): HexColor =>
  color.hex() as HexColor;

/** Derives the full color set (base + computed shades + semantic names) from one base palette. */
function buildColors(baseColors: BaseColors) {
  // We can modify the base colors using the color package.
  // https://www.npmjs.com/package/color
  const colorMap = {
    ...baseColors,

    januaryGreyDark1: hex(Color(baseColors.januaryGrey).darken(0.01)),

    marchGreyDark3: hex(Color(baseColors.marchGrey).darken(0.03)),
    marchGreyDark5: hex(Color(baseColors.marchGrey).darken(0.05)),
    marchGreyDark10: hex(Color(baseColors.marchGrey).darken(0.1)),
    marchGreyLight5: hex(Color(baseColors.marchGrey).lighten(0.05)),

    aprilGreyDark10: hex(Color(baseColors.aprilGrey).darken(0.1)),

    splashBlueLight5: hex(Color(baseColors.splashBlue).lighten(0.05)),
    splashBlueLight7: hex(Color(baseColors.splashBlue).lighten(0.07)),
    splashBlueLight10: hex(Color(baseColors.splashBlue).lighten(0.1)),
    splashBlueDark10: hex(Color(baseColors.splashBlue).darken(0.1)),

    lakeBlueDark10: hex(Color(baseColors.lakeBlue).darken(0.1)),
    lakeBlueLight10: hex(Color(baseColors.lakeBlue).lighten(0.1)),
    lakeBlueLight20: hex(Color(baseColors.lakeBlue).lighten(0.2)),

    midGreenLight10: hex(Color(baseColors.midGreen).lighten(0.1)),
    midGreenLight20: hex(Color(baseColors.midGreen).lighten(0.2)),

    darkGreenDark20: hex(Color(baseColors.darkGreen).darken(0.2)),

    lightGreyTransparentDark10: hex(
      Color(baseColors.lightGreyTransparent).darken(0.1)
    ),
    lightGreyTransparentDark25: hex(
      Color(baseColors.lightGreyTransparent).darken(0.25)
    ),

    lightRedDark10: hex(
      Color(baseColors.lightRed).darken(0.1).desaturate(0.25)
    ),
    lightMidRed: hex(Color(baseColors.midRed).lighten(1.2).desaturate(0.2)),
    darkRedDark20: hex(Color(baseColors.darkRed).darken(0.2)),

    pumpkinOrangeLight10: hex(Color(baseColors.pumpkinOrange).lighten(0.1)),
    pumpkinOrangeLight20: hex(Color(baseColors.pumpkinOrange).lighten(0.2)),

    lightYellowLight1: hex(Color(baseColors.lightYellow).lighten(0.02)),
    midYellowDark20: hex(Color(baseColors.midYellow).darken(0.2)),
    darkYellowDark10: hex(Color(baseColors.darkYellow).darken(0.1)),
    darkYellowDark20: hex(Color(baseColors.darkYellow).darken(0.2)),

    accentLight10: hex(Color(baseColors.accent).lighten(0.1)),
    accentLight20: hex(Color(baseColors.accent).lighten(0.2)),
    accentDark10: hex(Color(baseColors.accent).darken(0.1)),
  };

  const semanticColorMap = {
    // Site wide. One accent only - used for links, active states, and buttons.
    primary: colorMap.accent,
    primaryLight10: colorMap.accentLight10,
    primaryLight20: colorMap.accentLight20,
    secondary: colorMap.accentDark10,
    background: colorMap.dropBlue,
    defaultText: colorMap.novemberGrey,
    defaultColoredText: colorMap.neptuneBlue,
    internalLinkColor: colorMap.accent,
    internalLinkColorDark10: colorMap.accentDark10,
    externalLinkColor: colorMap.neptuneBlue,
    // The SKYGATE wordmark: the accent on a light background reads as a
    // clear brand mark. On a near-black background (dark mode), that same
    // color competes with the header's accent nav-active state - skygate's
    // own dashboard keeps its wordmark plain white there, so dark mode
    // overrides this back to defaultText below.
    logoColor: colorMap.accent,

    // Api (Redoc/Swagger) Display
    defaultAction: colorMap.oceanBlue,
    deleteAction: colorMap.midRed,
    eventAction: colorMap.royalPurple,
    getAction: colorMap.lakeBlue,
    postAction: colorMap.darkGreen,
    putAction: colorMap.pumpkinOrange,
    // QUERY (OpenAPI 3.2): safe like GET, so a related-but-distinct blue.
    queryAction: colorMap.pondBlue,
    apiDocumentationText: colorMap.neptuneBlue,

    // Redoc's JSON code-sample viewer ships its own fixed Prism theme for
    // string/number/boolean/null token colors, hardcoded assuming a dark
    // code panel (see RedocDisplay.tsx's theme.codeBlock, which now flips
    // with the site). These are readable light-mode substitutes for
    // Redoc's own hardcoded values; darkColors overrides them back to
    // Redoc's originals below, since those already read fine on dark.
    codeString: "#0a7051",
    codeNumber: "#386886",
    codeBoolean: "#c41d1a",
    codeKeyword: "#af4b5b",
  };

  return { ...colorMap, ...semanticColorMap };
}

export const colors = buildColors(lightBaseColors);
export const darkColors = {
  ...buildColors(darkBaseColors),
  // Redoc's own hardcoded Prism theme values - these already read fine
  // against the dark code panel, so dark mode restores them instead of
  // the light-mode-only substitutes computed above.
  codeString: "#a0fbaa" as HexColor,
  codeNumber: "#4a8bb3" as HexColor,
  codeBoolean: "#e64441" as HexColor,
  codeKeyword: "#d1949e" as HexColor,
  // Lightening an already near-black splashBlue by the same ratios used in
  // light mode (where splashBlue starts off pale) produces a hover/active
  // block that jumps to a flat, jarringly bright grey against the rest of
  // the dark UI - these hand-picked shades keep the hover state subtle,
  // staying close to the surrounding #0a0a0a/#121212 surfaces instead of
  // reading as a plain "grey box."
  splashBlueLight5: "#141417" as HexColor,
  splashBlueLight7: "#17171b" as HexColor,
  splashBlueLight10: "#1c1c20" as HexColor,
  // Keep the wordmark plain (matching skygate's own dashboard) rather than
  // the accent color here - the accent is already the active-nav-state
  // color against this same dark header, so an accent-colored logo would
  // blend into that instead of reading as a distinct brand mark.
  logoColor: buildColors(darkBaseColors).defaultText,
};
export type SiteColors = typeof colors;
