import { Moon, Sun } from "../../Assets/Icons/Icons";
import { useColorScheme } from "../../Context/ColorSchemeContext";
import { HeaderStyles } from "./Header.style";

/** Switches between light and dark mode - the icon shows the mode a click would switch TO. */
const ThemeToggleButton = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <HeaderStyles.StyledThemeToggleButton
      type="button"
      onClick={toggleColorScheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun /> : <Moon />}
    </HeaderStyles.StyledThemeToggleButton>
  );
};

export default ThemeToggleButton;
