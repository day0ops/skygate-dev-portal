import { MantineThemeOverride } from "@mantine/core";
import { SiteColors } from "../colors";

export const makeMantineThemeOverride = (
  colors: SiteColors,
  colorScheme: "light" | "dark"
): MantineThemeOverride => ({
  colorScheme,
  // These colors are used for providing nice default theming
  // when using Mantine components.
  // Each color is required to have 10 shades, however we mainly
  // care about the commented lines, which are colors used
  // for specific app components.
  // https://v6.mantine.dev/theming/colors/
  colors: {
    gray: [
      colors.aprilGrey,
      colors.aprilGrey,
      colors.aprilGrey,
      colors.aprilGrey,
      colors.aprilGrey, // button color
      colors.aprilGreyDark10, // button hover color
      colors.septemberGrey, // some text colors
      colors.novemberGrey, // table header text color
      colors.novemberGrey,
      colors.novemberGrey,
    ],
    yellow: [
      colors.lightYellow,
      colors.midYellow,
      colors.midYellow,
      colors.midYellow,
      colors.midYellow,
      colors.midYellow,
      colors.midYellow, // button standard color
      colors.midYellowDark20, // button hover + active color
      colors.darkYellow,
      colors.darkYellow,
    ],
    red: [
      colors.lightRed, // button text
      colors.lightRedDark10,
      colors.midRed,
      colors.midRed,
      colors.midRed,
      colors.midRed,
      colors.darkRed, // button standard color
      colors.darkRedDark20, // button hover + active color
      colors.darkRedDark20,
      colors.darkRedDark20, // button text
    ],
    green: [
      colors.lightGreen, // button text
      colors.midGreen,
      colors.midGreen,
      colors.midGreen,
      colors.midGreen,
      colors.midGreen,
      colors.darkGreen, // button standard color
      colors.darkGreenDark20, // button hover + active color
      colors.darkGreenDark20,
      colors.darkGreenDark20,
    ],
    blue: [
      colors.splashBlue, // button text, subtle-button hover
      colors.lakeBlue,
      colors.lakeBlue,
      colors.lakeBlue,
      colors.lakeBlue,
      colors.lakeBlue,
      colors.lakeBlue, // button standard color
      colors.lakeBlueDark10, // button hover + active color
      colors.lakeBlueDark10,
      colors.neptuneBlue,
    ],
    // The site's one brand accent (Button.tsx's "primary" variant) - kept
    // distinct from "blue" above, which backs unrelated Mantine defaults.
    accent: [
      colors.accentLight20,
      colors.accentLight10,
      colors.accentLight10,
      colors.accentLight10,
      colors.accentLight10,
      colors.accentLight10,
      colors.accent, // button standard color
      colors.accentDark10, // button hover + active color
      colors.accentDark10,
      colors.accentDark10,
    ],
    // Backs Mantine's own components (Modal, Popover, Menu, ...) when
    // colorScheme is "dark" - follows Mantine's own convention of lightest
    // (text-ish) shade at index 0, darkest (background) shade at index 9.
    dark: [
      colors.novemberGrey,
      colors.septemberGrey,
      colors.augustGrey,
      colors.aprilGrey,
      colors.aprilGrey,
      colors.marchGrey,
      colors.marchGrey,
      colors.januaryGrey,
      colors.januaryGrey,
      colors.dropBlue,
    ],
  },
});
