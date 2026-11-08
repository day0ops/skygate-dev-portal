import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorScheme = "light" | "dark";

const STORAGE_KEY = "skygate-portal-color-scheme";

function getInitialColorScheme(): ColorScheme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(
  null
);

export function ColorSchemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    getInitialColorScheme
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, colorScheme);
  }, [colorScheme]);

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme(): ColorSchemeContextValue {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error(
      "useColorScheme must be used within a ColorSchemeContextProvider"
    );
  }
  return context;
}
