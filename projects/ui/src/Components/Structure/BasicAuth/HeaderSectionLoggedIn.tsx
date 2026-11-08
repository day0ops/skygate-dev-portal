import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popover } from "@mantine/core";
import { useContext, useEffect, useMemo, useState } from "react";
import { di } from "react-magnetic-di";
import { NavLink, useLocation, useSearchParams } from "react-router";
import { useGetCurrentUser } from "../../../Apis/gg_hooks";
import { Icon } from "../../../Assets/Icons";
import { AppContext } from "../../../Context/AppContext";
import { AuthContext } from "../../../Context/AuthContext";
import { borderRadiusConstants } from "../../../Styles/constants";
import { logoutEndpoint } from "../../../user_variables.tmplr";

export const StyledUserDropdown = styled(Popover.Dropdown)(
  ({ theme }) => css`
    border: 1px solid ${theme.aprilGrey};
    border-radius: ${borderRadiusConstants.small};
    box-shadow: ${theme.darkGreyTransparent} 0px 4px 12px;
    padding: 0px;
    margin-top: 4px;
    overflow: hidden;
    white-space: nowrap;

    .userEmailHeader {
      display: block;
      padding: 10px 20px;
      font-size: 0.8rem;
      color: ${theme.septemberGrey};
      border-bottom: 1px solid ${theme.aprilGrey};
      cursor: default;
    }

    a,
    button.logout,
    div.disabled {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 50px;
      line-height: 35px;
      font-size: 0.8rem;
      cursor: pointer;
      border-left: 4px solid transparent;
      color: ${theme.defaultColoredText};

      &:hover {
        background: ${theme.lightGreyTransparent};
      }
    }

    div.disabled {
      background: rgba(50, 50, 50, 0.4);
      color: ${theme.augustGrey};
      border-left-color: ${theme.augustGrey};
      cursor: default;

      &:hover {
        background: rgba(50, 50, 50, 0.4);
      }
    }
  `
);

const HeaderSectionLoggedIn = () => {
  di(useGetCurrentUser);
  const routerLocation = useLocation();
  const { portalServerType } = useContext(AppContext);
  const { idToken } = useContext(AuthContext);
  const { data: user } = useGetCurrentUser();
  const [opened, setOpened] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("state");
    newSearchParams.delete("session_state");
    newSearchParams.delete("code");
    setSearchParams(newSearchParams);
  }, [setSearchParams]);

  const inUsagePlansArea = useMemo(
    () => routerLocation.pathname.includes("/usage-plans"),
    [routerLocation.pathname]
  );

  return (
    <Popover position="bottom-end" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <button
          className="userLoginArea loggedIn"
          aria-label={
            user?.username ? `Account menu for ${user.username}` : "Account menu"
          }
          onClick={() => setOpened(!opened)}
        >
          {/*
           * Note: The "userHolder" class is kept here for testing purposes.
           */}
          <div className="userHolder dropdownContainer">
            <Icon.UserProfile className="userCircle" />
            <Icon.DownArrow
              className={`dropdownArrow canRotate ${opened ? "rotate180" : ""}`}
            />
          </div>
        </button>
      </Popover.Target>
      <StyledUserDropdown>
        <>
          <div className="userEmailHeader">{user?.username ?? ""}</div>
          {portalServerType === "gloo-mesh-gateway" && (
            <NavLink
              to={"/usage-plans"}
              className={inUsagePlansArea ? "active" : ""}
              onClick={() => setOpened(!opened)}
            >
              API Keys
            </NavLink>
          )}
          <a
            href={`${logoutEndpoint}?id_token_hint=${idToken}&post_logout_redirect_uri=${window.location.origin}/logout`}
            className="logout"
          >
            Logout
          </a>
        </>
      </StyledUserDropdown>
    </Popover>
  );
};

export default HeaderSectionLoggedIn;
