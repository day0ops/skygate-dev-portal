import { NavLink } from "react-router";
import { companyName, homeImageURL } from "../../user_variables.tmplr";
import { BannerHeading } from "../Common/Banner/BannerHeading";
import { BannerHeadingTitle } from "../Common/Banner/BannerHeadingTitle";
import { Button } from "../Common/Button";
import { PageContainer } from "../Common/PageContainer";
import { useOnApisPageClick } from "../Structure/Header";
import { HomePageStyles } from "./HomePage.style";

const HIGHLIGHTS = [
  "REST and gRPC catalogs in one place",
  "Self-service API keys, no ticket required",
  "Team-scoped access, audit-ready",
];

export function HomePage() {
  const { onApisPageClick } = useOnApisPageClick();

  return (
    <PageContainer>
      <div>
        <BannerHeading
          bgImageURL={homeImageURL}
          title={<BannerHeadingTitle text={"Cleared for Takeoff"} />}
          description={`Integrate with ${companyName}'s live flight-ops APIs - look up flight status, track departures and gate changes, and plug into mission control in real time.`}
          additionalContent={
            <NavLink to="/apis" onClick={onApisPageClick}>
              <Button
                tabIndex={0}
                style={{ width: "150px", marginTop: "10px" }}
              >
                VIEW APIS
              </Button>
            </NavLink>
          }
          tall={true}
        />
      </div>

      <HomePageStyles.HighlightsRow role="region" aria-label="What you can do here">
        {HIGHLIGHTS.map(item => (
          <HomePageStyles.HighlightItem key={item}>
            <HomePageStyles.CheckIcon viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3 8.5 6.2 11.5 13 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </HomePageStyles.CheckIcon>
            {item}
          </HomePageStyles.HighlightItem>
        ))}
      </HomePageStyles.HighlightsRow>
    </PageContainer>
  );
}
