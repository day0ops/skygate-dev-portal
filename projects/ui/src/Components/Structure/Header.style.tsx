import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ContentWidthNav } from "../../Styles/ContentWidthHelpers";

export const headerHeightPx = 90;

export namespace HeaderStyles {
  export const StyledLogoImg = styled.img`
    height: ${headerHeightPx}px;
    padding: 5px 0px;
  `;

  /**
   * Marks the session as an admin one. The admin and non-admin views render
   * the same pages with the same navigation labels, and the admin view lists
   * every team and app in the portal rather than the caller's own, so the
   * distinction has to be visible on every page.
   *
   * Styled after skygate's own status badge (skygate/web's `.badge`/
   * `VersionBadge` - a bracketed, border-only, monospace label with no
   * fill) rather than a filled pill, to read as part of the same mission-
   * control visual language instead of a generic SaaS chip.
   */
  export const StyledAdminBadge = styled.div(
    ({ theme }) => css`
      margin-left: 8px;
      padding: 2px 10px;
      border: 1px solid currentColor;

      color: ${theme.primary};

      font-family: "JetBrains Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
    `
  );

  export const StyledTopNavHeader = styled.header(
    ({ theme }) => css`
      grid-area: header;
      width: 100%;
      height: ${headerHeightPx}px;
      background: ${theme.background};
      border-bottom: 1px solid ${theme.marchGrey};
      box-shadow: #253e580b 0px 2px 8px;

      // These are the hover/active styles for the links in the main top bar,
      // and links in the logged in user dropdown area.
      .userLoginArea.loggedIn,
      .siteNavigating a.navLink,
      .userLoginArea .dropdownContainer,
      a,
      button.logout {
        cursor: pointer;
        // Replaces the browser's own default focus outline (which otherwise
        // stays visible after a mouse click, not just keyboard focus) with
        // one scoped to :focus-visible only, so it shows for keyboard
        // navigation but not after a plain click.
        outline: none;
        &:focus-visible {
          outline: 2px solid ${theme.primary};
          outline-offset: 2px;
        }
        &:hover {
          color: ${theme.internalLinkColorDark10};
          background-color: ${theme.splashBlueLight10};
          border-color: ${theme.splashBlue};
        }
        &:active {
          color: ${theme.internalLinkColorDark10};
          background-color: ${theme.splashBlueLight7};
          border-color: ${theme.splashBlue};
        }

        // .active means that this is the page that the user is on.
        // This overrides the font color and border color so that it doesn't
        // get the same hover/active states.
        &.active,
        &.active:hover,
        &.active:active {
          color: ${theme.internalLinkColor};
          border-color: ${theme.internalLinkColor};
        }
      }

      // The logo is a brand mark, not a nav action - it keeps the pointer
      // cursor (it does link home) but skips the boxed hover/active
      // background every other header link gets, which read as an odd,
      // conspicuous highlight sitting behind the wordmark.
      .logoContainer {
        cursor: pointer;
        a:hover,
        a:active {
          background-color: transparent;
          border-color: transparent;
          color: inherit;
        }
      }
    `
  );

  export const StyledTopNavContent = styled(ContentWidthNav)(
    ({ theme }) => css`
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      user-select: none;

      height: 100%;

      color: ${theme.defaultText};

      .logoContainer {
        display: flex;
        align-items: center;
        margin-left: -12px;
        padding: 0 12px;
        width: auto;
        height: 100%;

        // The global \`*:not(code) { color }\` rule in site.style.ts matches
        // the SVG's own <text> directly, so it wins over inheriting
        // currentColor from this container - this has to target the text
        // explicitly to actually override it.
        svg text {
          fill: ${theme.logoColor};
        }
      }

      .siteNavigating {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        height: 100%;
        gap: 5px;

        a.navLink {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 0px 12px;
          cursor: pointer;

          color: ${theme.externalLinkColor};
          border-bottom: 4px solid white;
          transition:
            background-color 0.25s,
            border-bottom-color 0.25s,
            color 0.25s;
          &.active,
          &.active:hover,
          &.active:active {
            color: ${theme.internalLinkColor};
            border-bottom-color: ${theme.internalLinkColor};
          }
        }

        .divider {
          height: 33px;
          width: 1px;
          background: ${theme.splashBlue};
        }
      }

      .userLoginArea {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 12px;
        margin-right: -12px;

        .dropdownContainer {
          display: flex;
          align-items: center;
          margin-top: -4px;

          svg.userCircle {
            width: 40px;
            height: 40px;
            margin-right: 10px;

            * {
              fill: currentColor;
            }
          }

          svg.dropdownArrow {
            width: 14px;
            margin-left: 10px;
            * {
              stroke: currentColor;
              stroke-width: 2;
            }
          }
        }
      }
    `
  );

  export const StyledThemeToggleButton = styled.button(
    ({ theme }) => css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: ${theme.septemberGrey};
      transition: 0.15s background-color, 0.15s color;
      // Replaces the browser's own default focus outline (which otherwise
      // stays visible after a mouse click, not just keyboard focus) with
      // one scoped to :focus-visible only - the same reset the other
      // header controls get below, missed here since this button isn't
      // part of that shared selector group.
      outline: none;
      &:focus-visible {
        outline: 2px solid ${theme.primary};
        outline-offset: 2px;
      }

      svg {
        width: 18px;
        height: 18px;
      }

      &:hover {
        background-color: ${theme.splashBlueLight7};
        color: ${theme.primary};
      }
      &:active {
        background-color: ${theme.splashBlueLight5};
      }
    `
  );
}
