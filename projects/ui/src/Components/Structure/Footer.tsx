import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { ContentWidthDiv } from "../../Styles/ContentWidthHelpers";

export const footerHeightPx = 40;

const FooterContainer = styled.footer(
  ({ theme }) => css`
    margin-bottom: 40px;
    grid-area: footer;
    width: 100%;
    height: ${footerHeightPx}px;
    background: ${theme.marchGrey};
    color: ${theme.augustGrey};
    display: block;
  `
);

// Matches skygate/web's own #build-footer: monospace, uppercase, letter-
// spaced meta text, not a regular prose sentence.
const FooterContent = styled(ContentWidthDiv)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export function Footer() {
  const { pageContentIsWide } = useContext(AppContext);

  return (
    <FooterContainer>
      <FooterContent pageContentIsWide={pageContentIsWide} role="contentinfo">
        © {new Date().getFullYear()} Skygate · All Rights Reserved
      </FooterContent>
    </FooterContainer>
  );
}
