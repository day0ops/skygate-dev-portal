import { useTheme } from "@emotion/react";
import { RedocRawOptions, RedocStandalone } from "redoc";
import { ApiVersionSchema } from "../../../../../Apis/api-types";
import { RedocDisplayContainer } from "./RedocDisplay.style";

export function RedocDisplay({
  apiVersionSpec,
}: {
  apiVersionSpec: ApiVersionSchema | undefined;
}) {
  const theme = useTheme();

  // Redoc renders its own headings (h1/h2/...) with hardcoded light-mode text
  // colors (#333 etc) via its internal styled-components, which our CSS
  // overrides in RedocDisplay.style.tsx can't reach (they win on specificity
  // over our global `color: unset` reset). Redoc's own theme option is the
  // supported way to recolor that text - see this directory's own earlier
  // comment about it being "less fragile" than chasing Redoc's class names.
  const redocOptions: RedocRawOptions = {
    theme: {
      colors: {
        // Redoc's own default accent (a blue/purple) shows up anywhere it
        // highlights something as "active" - e.g. the path segment of the
        // expanded request URL - independent of the http.* method colors
        // below, so it needs pointing at our site accent too.
        primary: { main: theme.primary },
        // Redoc applies "secondary" to operation subheadings (e.g. "Responses")
        // as well as body text - a dimmer grey there reads as low-contrast
        // against a near-black page, so both slots use the same bright color.
        text: { primary: theme.novemberGrey, secondary: theme.novemberGrey },
        http: {
          get: theme.lakeBlue,
          post: theme.darkGreen,
          put: theme.pumpkinOrange,
          delete: theme.midRed,
          basic: theme.oceanBlue,
          link: theme.oceanBlue,
          head: theme.oceanBlue,
          options: theme.oceanBlue,
          patch: theme.oceanBlue,
        },
      },
      sidebar: { backgroundColor: theme.marchGrey, textColor: theme.novemberGrey },
      // Keeps the payload code panel itself in step with the rest of the
      // page (light in light mode, dark in dark mode) rather than a
      // permanently-dark panel, matching the surrounding chrome. Redoc's
      // own Prism theme for the JSON token text inside it is hardcoded
      // assuming a dark panel though, so RedocDisplay.style.tsx overrides
      // those token colors separately for light-mode contrast.
      codeBlock: { backgroundColor: theme.marchGrey },
      rightPanel: {
        backgroundColor: theme.januaryGrey,
        textColor: theme.novemberGrey,
        // The "full request URL" dropdown each operation's method/path row
        // expands into - defaults to a light overlay meant for Redoc's
        // light-mode right panel, so it needs the same override.
        servers: {
          overlay: { backgroundColor: theme.marchGrey, textColor: theme.novemberGrey },
          url: { backgroundColor: theme.marchGrey },
        },
      },
    },
  };

  return (
    <RedocDisplayContainer aria-label="Schema Display">
      <RedocStandalone spec={apiVersionSpec} options={redocOptions} />
    </RedocDisplayContainer>
  );
}
