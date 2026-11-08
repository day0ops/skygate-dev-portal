import { css } from "@emotion/react";
import { SiteColors } from "../colors";
import { makeMantineGlobalStyles } from "./mantine-overrides.style";
import { makeSiteGlobalStyles } from "./site.style";

// prettier-ignore
import "./style-reset.css";
// prettier-ignore
import "./fontFace.css";
// prettier-ignore
// import "./graphiql.min.css";
// prettier-ignore
import "./highlight.js.min.css";

export const makeGlobalStyles = (colors: SiteColors) => css`
  ${makeMantineGlobalStyles(colors)}
  ${makeSiteGlobalStyles(colors)}
`;
