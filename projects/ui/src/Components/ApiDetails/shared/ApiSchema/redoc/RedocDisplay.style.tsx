import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { borderRadiusConstants } from "../../../../../Styles/constants";
import { makeStyledButtonCSS } from "../../../gloo-gateway-components/SchemaTab/ApiSchemaDisplay.style";

/*
*   EXPLANATION OF TAGS, CLASSNAMES, AND VARIOUS ref HOOKS
      Redocly generates the class names for its display. We have
      tried to hook on to obvious, easy-to-read classes where possible
      -while also trying to use as little page-structure 
       info where possible- as these are the most likely to change
       across versions.
      
    Unfortunately, the 6-letter-combination classes seem to be
      version dependent. -- FOR THIS REASON: If the Redoc version
      is changed from what was in the repo on latest download, it may be
      necessary to rediscover the hook names yourself.
    We will be striving to find better, more 
      consistent hooks to latch styling on to as we move forward.

    Note, depending on how fine grain styling is desired, some of these
      could be set with the Redoc theme option: 
      https://github.com/Redocly/redoc/blob/main/src/theme.ts
    This option was not as fine grain as we desired, but is an excellent
      and less fragile alternative.
*/

export const RedocDisplayContainer = styled.div(
  ({ theme }) => css`
    border: 1px solid ${theme.splashBlue};
    border-radius: ${borderRadiusConstants.small};
    width: 100%;
    margin-bottom: 40px;
    * {
      // Reset the text color
      color: unset;
    }

    .redoc-wrap {
      // The "Authorizations:"/"path Parameters"/"query Parameters"/
      // "Request Body schema:" sub-labels - Redoc hardcodes these to a
      // dark color at 50% opacity (meant to sit faintly on a white
      // background), not covered by the theme's text color options, so
      // they're nearly invisible against our dark background.
      h5 {
        color: ${theme.defaultText} !important;
        opacity: 0.8;
      }

      // The "Payload"/language tab above a request or response sample -
      // Redoc reuses our own theme.colors.text.primary (set to
      // theme.defaultText above, for heading contrast) as this tab's
      // *background* when selected, which makes it the exact same color as
      // its own text - a solid blank-looking patch.
      .react-tabs__tab--selected {
        background: ${theme.marchGrey} !important;
        color: ${theme.primary} !important;
      }

      // The security-scheme pill under "Authorizations:" (e.g. "apiKey") -
      // a hand-me-down class name (version-dependent, like the others this
      // file calls out) for Redoc's own dropdown-style selector, hardcoded
      // to a near-white background regardless of theme. Redoc generates a
      // second, prop-dependent class alongside the stable one (seen so far:
      // "jiAhSp" already inherits transparent, "dhTbPR" sets its own !important
      // background) - targeting the compound selector beats that on
      // specificity rather than relying on cascade order against it.
      .sc-krNlru {
        background: ${theme.marchGrey} !important;

        &.dhTbPR {
          background: ${theme.marchGrey} !important;
        }
      }

      // Redoc's JSON code-sample viewer (the "Payload" box) hardcodes its
      // own Prism-style token colors assuming a permanently dark panel -
      // now that the panel itself flips with the theme (see
      // RedocDisplay.tsx's theme.codeBlock), these need their own
      // light/dark-aware overrides. theme.codeString/codeNumber/
      // codeBoolean/codeKeyword are readable substitutes for light mode,
      // restored to Redoc's own originals for dark mode - see colors.ts.
      .redoc-json {
        // Object/array keys - Redoc hardcodes these white via a higher-
        // specificity ".token.property.string" rule that otherwise beats
        // the generic string-value rule below.
        .token.property.string {
          color: ${theme.novemberGrey} !important;
        }
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted,
        .token.selector,
        .token.attr-name {
          color: ${theme.codeString} !important;
        }
        .token.number,
        .token.tag,
        .token.constant,
        .token.symbol {
          color: ${theme.codeNumber} !important;
        }
        .token.boolean {
          color: ${theme.codeBoolean} !important;
        }
        .token.keyword,
        .token.atrule,
        .token.attr-value {
          color: ${theme.codeKeyword} !important;
        }
        // The expand/collapse +/- button for nested objects/arrays.
        .collapser {
          color: ${theme.novemberGrey} !important;
        }
        // The hover highlight behind a hovered key/value row.
        .hovered {
          background-color: ${theme.lightGreyTransparent} !important;
        }
      }

      /***
    * LEFT AREA
    ***/
      .menu-content {
        background: ${theme.marchGrey};

        // THE SEARCH BAR, SEARCH INPUT, and MAGNIFYING GLASS
        div[role="search"] {
          position: relative;
          margin-top: 10px;
          padding: 0px;

          input {
            border-radius: ${borderRadiusConstants.small};
            height: 34px;
            line-height: 34px;
            padding: 0 13px;
            margin-bottom: 10px;

            font-size: 18px;
            font-weight: normal;
            color: ${theme.defaultText};
            background: ${theme.background};

            &::placeholder {
              color: ${theme.augustGrey};
            }
          }

          i {
            display: none;
          }
          svg {
            pointer-events: none;
            left: auto;
            right: 28px;
            top: 23px;
            margin-top: -15px;
            width: 18px;
            height: 18px;

            path {
              fill: ${theme.augustGrey};
            }
          }

          // SEARCH RESULTS AREA & RELATED SCROLLBAR
          > div.scrollbar-container {
            margin-top: 10px;
          }
          > div.scrollbar-container,
          div[data-role="search:results"] {
            min-height: 45px;
            padding: 0px;
            margin: 0px;
            background-color: ${theme.marchGrey};
            //
            // These are the li elements (one for each search result row) in the search result list.
            li {
              background: ${theme.background};
              flex-basis: 100%;
              label {
                padding: 15px 10px;
              }
              border: 1px solid ${theme.marchGrey};
              &:not(:last-of-type) {
                border-bottom: none;
              }
            }
          }
          // These are the styles for the "no results were found" empty state.
          > div[data-role="search:results"] {
            text-align: center;
            margin-top: 5px;
            margin-bottom: -10px;
          }
        }

        // These are the styles for the li elements in the sidebar sub-menus.
        // (when a sidebar navigation accordion menu is expanded).
        li {
          border-top: 1px solid ${theme.marchGreyDark3};
        }
        // These are the styles for the li elements in the sidebar top-level-menus.
        .scrollbar-container > ul > li {
          border-top: 1px solid ${theme.marchGreyDark5};
          &:last-of-type {
            border-bottom: 1px solid ${theme.marchGreyDark5};
          }
          // This lightens the background color of expanded sub-menus.
          ul {
            background-color: ${theme.marchGreyLight5};
          }
        }

        // LABELS, typically of METHOD NAMES
        li > label {
          // When this is the active list item.
          border-left: 4px solid transparent;
          &.active {
            border-left: 4px solid ${theme.primary};
          }

          // Keep background-color interaction.
          background-color: transparent;
          &:hover {
            background-color: ${theme.marchGreyDark5};
          }
          &:active {
            background-color: ${theme.marchGreyDark10};
          }

          .operation-type {
            border-radius: ${borderRadiusConstants.small};

            margin-top: 0;
            width: 58px;
            min-width: 58px;
            height: 24px;
            line-height: 24px;

            font-size: 14px;
            font-weight: 600;

            &.delete {
              background-color: ${theme.deleteAction};
            }
            &.get {
              background-color: ${theme.getAction};
            }
            &.hook {
              background-color: ${theme.eventAction};
            }
            &.post {
              background-color: ${theme.postAction};
            }
            &.put {
              background-color: ${theme.putAction};
            }
            // QUERY (OpenAPI 3.2). Redoc does not render QUERY operations
            // yet; this covers the badge whenever it starts to.
            &.query {
              background-color: ${theme.queryAction};
            }

            &.options,
            &.patch,
            &.basic,
            &.link,
            &.head {
              background-color: ${theme.defaultAction};
            }
          }

          > span:last-of-type {
            font-size: 18px;
            line-height: 22px;
            color: ${theme.apiDocumentationText};
          }
        }
      }

      /***
    * SECOND (usually MIDDLE) THIRD
    ***/
      .api-content {
        background: ${theme.background};
        border-radius: 0 ${borderRadiusConstants.small}
          ${borderRadiusConstants.small} 0;

        // DOWNLOAD BUTTON? (this seems to change by version)
        .ilacoL {
          ${makeStyledButtonCSS(theme)}
          height: 26px;
          line-height: 26px;
        }

        // METHOD TAGS
        span[type="primary"] {
          background-color: ${theme.royalPurple};
        }
        span[type="warning"] {
          background-color: ${theme.pumpkinOrange};
          font-size: 14px;
        }

        // TABLE OF METHOD PARAMETER INFORMATION
        table {
          font-size: 16px;

          // "required" tags
          .eIjWpQ {
            font-size: 16px;
            color: ${theme.midRed};
          }
          // "recursive" and other informatic tags
          .ibAyvN {
            font-size: 16px;
            color: ${theme.darkYellow};
            text-transform: lowercase;
          }

          // 2nd column in table, PARAMETER DESCRIPTIONS
          tr > td:last-of-type,
          tr > td:last-of-type span {
            line-height: 22px;
          }

          button,
          span {
            font-size: 16px;
          }

          span.iDFogX {
            display: inline-block;
            height: 21px;
            line-height: 21px;
            padding: 0 10px;
            border-radius: 13px;

            font-size: 12px;
            color: ${theme.primary};
            border-color: ${theme.primary};
          }
        }

        // Example area type buttons
        .faCWDf button > span {
          border-radius: ${borderRadiusConstants.small};
          padding: 0;
          width: 58px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;

          &.delete {
            background-color: ${theme.deleteAction};
          }
          &.get {
            background-color: ${theme.getAction};
          }
          &.hook {
            background-color: ${theme.eventAction};
          }
          &.post {
            background-color: ${theme.postAction};
          }
          &.put {
            background-color: ${theme.putAction};
          }
          &.query {
            background-color: ${theme.queryAction};
          }

          &.options,
          &.patch,
          &.basic,
          &.link,
          &.head {
            background-color: ${theme.defaultAction};
          }
        }

        // Payload button
        .loHuJX > ul > li {
          height: 40px;
          line-height: 40px;
          padding: 0 10px;

          &.react-tabs__tab--selected {
            color: ${theme.primary};
          }
          &.tab-success {
            color: ${theme.darkGreen};
          }
          &.tab-error {
            color: ${theme.darkRed};
          }
        }

        // RESPONSE CALLOUTS
        .iDYSTN,
        .GIvIp {
          border-radius: ${borderRadiusConstants.small};
          line-height: 22px;
        }
        // FAILURES
        .iDYSTN {
          background: ${theme.lightRed};
          border: 1px solid ${theme.midRed};
          color: ${theme.midRed};
        }
        // SUCCESSES
        .GIvIp {
          background: ${theme.lightGreen};
          border: 1px solid ${theme.darkGreen};
          color: ${theme.darkGreen};
        }
      }

      .fburAk {
        display: none;
      }
    }

    // These are the buttons with the method and path name on the right side.
    // Clicking on them shows the full URL for each endpoint. Redoc defaults
    // this button's background to the same codeBlock token the request/
    // response payload box uses (see RedocDisplay.tsx's theme.codeBlock,
    // pinned to a literal dark color so syntax highlighting stays legible),
    // which leaves this button stuck dark too unless overridden here.
    .sc-EgOXT {
      margin-top: 10px;
      border-radius: 0px;
      background: ${theme.marchGrey} !important;
    }
  `
);
