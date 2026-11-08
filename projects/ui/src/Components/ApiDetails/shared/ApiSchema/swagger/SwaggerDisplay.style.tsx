import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { contentWidth } from "../../../../../Styles/ContentWidthHelpers";
import { borderRadiusConstants } from "../../../../../Styles/constants";
import { makeStyledButtonCSS } from "../../../gloo-gateway-components/SchemaTab/ApiSchemaDisplay.style";

/*
*   EXPLANATION OF div[id^="display-swagger"]
      First, WHAT IS IT?  Our SwaggerDisplay component relies on
      this ID to both connect and update the component. This is the 
      prefix we provide, where the suffix is based on the schema
      being displayed.


      Second, WHY? Swagger does not currently offer a way to modify 
      their css. Importing their styling means competing 
      specificity, and this makes it easier to do that.

      Alternatives might include seemingly arbitrary swagger classes 
      to bump specifity or throwing !important on to everything.
*/

export const SwaggerDisplayContainer = styled.div(
  ({ theme }) => css`
    display: contents;
    * {
      // Reset the text color
      color: unset;
    }
    div[id^="display-swagger"] {
      width: 100%;

      .swagger-ui {
        .wrapper {
          max-width: ${contentWidth.wide};

          &.information-container {
            background: ${theme.background};
            padding: 10px 20px;

            .info {
              margin: 15px 0;
            }
          }
        }

        // The "Servers" dropdown block above the operation list - same
        // hardcoded-for-light-mode background as .information-container/
        // .opblock above.
        .scheme-container {
          background: ${theme.background};

          select {
            background: ${theme.background};
            color: ${theme.defaultText};
          }
        }

        // Plain, unclassed text/number inputs - "Try it out" parameter
        // fields and the "Authorize" dialog's value field both render as
        // bare <input> elements with no hook to target more narrowly.
        input[type="text"],
        input[type="number"],
        input[type="password"] {
          background: ${theme.background};
          color: ${theme.defaultText};
        }

        // The "Available authorizations" dialog (opened from the top-level
        // "Authorize" button) - entirely unthemed by swagger-ui, so it's a
        // flat white panel regardless of site theme.
        .dialog-ux .modal-ux {
          background: ${theme.background};

          h3,
          label,
          code,
          p {
            color: ${theme.defaultText};
          }
        }

        .btn {
          ${makeStyledButtonCSS(theme)}
          height: 26px;
          line-height: 26px;

          span {
            padding: 0;
          }

          svg {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-left: 4px;

            * {
              fill: white;
            }
          }
        }

        // Swagger-UI's own stylesheet hardcodes this navy-grey (#3b4151) on
        // these elements - meant for a white background, so it's effectively
        // unreadable on ours. Our generic \`* { color: unset }\` reset above
        // can't win against swagger-ui's own class-based specificity here.
        .info .title,
        .opblock-tag,
        .opblock-summary-path,
        .opblock-summary-description,
        .opblock-section-header h4,
        .opblock-title_normal,
        .col_header,
        .parameter__type,
        .parameter__in,
        .response-col_status,
        table.model tr {
          color: ${theme.defaultText};
        }

        // The "Parameters"/"Responses" section header band - a semi-
        // transparent white overlay meant to sit on a white page, which
        // washes out to a jarring light-grey band on ours.
        .opblock-section-header {
          background: ${theme.background};
        }

        // The request/response "Content-Type" dropdown.
        .content-type {
          background: ${theme.background};
          color: ${theme.defaultText};
        }

        .parameter__name.required span,
        .parameter__name.required:after {
          font-size: 14px;
          color: ${theme.midRed} !important;
        }
        .parameter__name.required:after {
          top: -3px;
          padding: 0 0 0 2px;
        }

        .opblock {
          background-color: ${theme.background};
          border-color: ${theme.defaultAction};

          .opblock-summary {
            border-color: ${theme.defaultAction};

            .opblock-summary-method {
              border-radius: ${borderRadiusConstants.small};
              margin-top: 0;
              padding: 0;
              width: 58px;
              min-width: 58px;
              height: 24px;
              font-size: 14px;
              font-weight: 600;

              background-color: ${theme.defaultAction};
            }
          }
          .opblock-body .tab-header .tab-item.active h4 span:after {
            background-color: ${theme.defaultAction};
          }

          &.opblock-delete {
            .opblock-summary {
              border-color: ${theme.deleteAction};
              .opblock-summary-method {
                background-color: ${theme.deleteAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.deleteAction};
              }
            }
          }
          &.opblock-get {
            .opblock-summary {
              border-color: ${theme.getAction};
              .opblock-summary-method {
                background-color: ${theme.getAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.getAction};
              }
            }
          }
          &.opblock-hook {
            .opblock-summary {
              border-color: ${theme.eventAction};
              .opblock-summary-method {
                background-color: ${theme.eventAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.eventAction};
              }
            }
          }
          &.opblock-post {
            .opblock-summary {
              border-color: ${theme.postAction};
              .opblock-summary-method {
                background-color: ${theme.postAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.postAction};
              }
            }
          }
          &.opblock-put {
            .opblock-summary {
              border-color: ${theme.putAction};
              .opblock-summary-method {
                background-color: ${theme.putAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.putAction};
              }
            }
          }
          // QUERY is an OpenAPI 3.2 method (swagger-ui >= 5.32 renders it).
          // Other unbranded methods (patch/head/options/trace) fall back to
          // the defaultAction styling on .opblock above.
          &.opblock-query {
            .opblock-summary {
              border-color: ${theme.queryAction};
              .opblock-summary-method {
                background-color: ${theme.queryAction};
              }
            }
            .opblock-body {
              .tab-header .tab-item.active h4 span:after {
                background-color: ${theme.queryAction};
              }
            }
          }

          &.opblock-deprecated {
            border-color: ${theme.marchGrey};
            background-color: hsla(0, 0%, 92%, 0.1);

            .opblock-summary {
              border-color: ${theme.novemberGrey};
              .opblock-summary-method {
                background-color: ${theme.novemberGrey};
              }
            }
            .opblock-body .tab-header .tab-item.active h4 span:after {
              background-color: ${theme.novemberGrey};
            }
          }
        }

        //
        // Fixes some interaction issues with buttons in the main opblock sections.
        // And makes it clearer when something is a button.
        //
        .opblock-summary {
          padding: 0px;
          > button {
            padding: 5px;
          }
        }
      }

      //
      // Fixes some of the layout in the Models section.
      // width: 100% makes the expand buttons easier to find.
      //
      section.models {
        position: relative;
        .model-container > .model-box {
          padding: 5px;
        }
        .model-box {
          > button > .model-toggle.collapsed {
            position: absolute;
            top: 30px;
            right: 15px;
            margin-top: -10px;
          }
          width: 100%;
          button.model-box-control {
            width: 100%;
          }
          .model-toggle {
            float: right;
            margin-top: -2px;
          }
        }
      }
    }
  `
);
