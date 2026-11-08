import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaQueryWithScreenSize } from "../../Styles/breakpoints";

export namespace HomePageStyles {
  // A plain, borderless row rather than another feature-card grid - the
  // home page is a tool's front door, not a marketing page, so it ends
  // here instead of padding itself out with a second boxed section.
  export const HighlightsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 36px;
    margin: 50px 0 70px;

    ${mediaQueryWithScreenSize.mediumAndSmaller} {
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
  `;

  export const HighlightItem = styled.div(
    ({ theme }) => css`
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      color: ${theme.septemberGrey};
    `
  );

  export const CheckIcon = styled.svg(
    ({ theme }) => css`
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: ${theme.primary};
    `
  );
}
