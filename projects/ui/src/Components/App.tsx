import { Global, ThemeProvider } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import { AppContextProvider } from "../Context/AppContext";
import { AppUtilsContextProvider } from "../Context/AppUtilsContext";
import {
  ColorSchemeContextProvider,
  useColorScheme,
} from "../Context/ColorSchemeContext";
import { getTheme, makeGlobalStyles } from "../Styles";
import { makeMantineThemeOverride } from "../Styles/global-styles/mantine-theme";
import PortalServerTypeChecker from "../Utility/PortalServerTypeChecker";
import PostLoginRedirectHandler from "../Utility/login/PostLoginRedirectHandler";
import SessionExpiryHandler from "../Utility/login/SessionExpiryHandler";
import UserChecker from "../Utility/UserChecker";
import AppContent from "./AppContent";

/** Rebuilds the Emotion and Mantine themes whenever the color scheme toggles. */
function ThemedApp() {
  const { colorScheme } = useColorScheme();
  const theme = getTheme(colorScheme);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={makeGlobalStyles(theme)} />
      <AppUtilsContextProvider>
        <AppContextProvider>
          <PortalServerTypeChecker />
          <UserChecker />
          <SessionExpiryHandler />
          <PostLoginRedirectHandler />

          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={makeMantineThemeOverride(theme, colorScheme)}
          >
            <AppContent />
          </MantineProvider>
        </AppContextProvider>
      </AppUtilsContextProvider>
    </ThemeProvider>
  );
}

export function App() {
  return (
    <ColorSchemeContextProvider>
      <ThemedApp />
    </ColorSchemeContextProvider>
  );
}
