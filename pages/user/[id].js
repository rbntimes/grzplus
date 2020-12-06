import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Card from "../../components/Card";
import Date from "../../components/Date";
import { PageHeader } from "antd";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then(res => res.json());

const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar",
  MPO: "Medisch Praktijk Ondersteuner"
};

const contextUser = {
  name: "Aard Bakker"
};

const loggedinUser = {
  name: "Hylke Vink"
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const Right = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const MobilityList = styled.div`
  display: flex;
`;

const Mobility = styled.div`
  background: #00b0f0;
  width: 70px;
  height: 70px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 1rem 1rem 0;
`;

const App = ({ router, session }) => {
  const { data, loading } = useSWR(
    `/api/users/getUser?id=${router.query.id}`,
    fetcher
  );
  if (loading && !data.name) return <Loading />;
  return (
    <>
      <PageHeader
        title={`Pagina van ${data?.name}`}
        onBack={() => router.push("/")}
        subTitle={`${data?.age} jaar - ${data?.room}`}
      />
      <Grid>
        <Left>
          <Card
            title={`Mobiliteit ${contextUser.name}`}
            currentAudience={router.query.audience}
            audience="MPO"
          >
            <h3>Mobiliteit op kamer</h3>
            <MobilityList>
              <Mobility src="/wheelchair.svg" />
              <Mobility src="/walking-stick.svg" />
              <Mobility src="/walker.svg" />
            </MobilityList>
            <h3>Mobiliteit op afdeling</h3>
            <MobilityList>
              <Mobility src="/wheelchair.svg" />
              <Mobility src="/walking-stick.svg" />
              <Mobility src="/walker.svg" />
            </MobilityList>
            <h3>Mobiliteit buiten afdeling</h3>
            <MobilityList>
              <Mobility src="/wheelchair.svg" />
              <Mobility src="/walking-stick.svg" />
              <Mobility src="/walker.svg" />
            </MobilityList>
          </Card>

          <Card
            contextUserId={router.query.id}
            slug="exercises"
            title={`Oefeningen van ${data?.name}`}
            currentAudience={router.query.audience}
          />
          <Card
            contextUserId={router.query.id}
            title="DSM-V"
            slug="dsm"
            currentAudience={router.query.audience}
            audience="PSYCHOLOOG"
          />
          <Card
            contextUserId={router.query.id}
            title="Slikadvies"
            slug="swallow_advice"
            audience="DIETIST"
            currentAudience={router.query.audience}
          />
        </Left>
        <Right>
          <Card
            contextUserId={router.query.id}
            title="Voorlopige ontslagdatum"
            slug="discharge_date"
            currentAudience={router.query.audience}
          />
          <Card
            contextUserId={router.query.id}
            slug="goals"
            title="Doel van de week"
            currentAudience={router.query.audience}
          />
          <Card
            contextUserId={router.query.id}
            title="Naam + foto's van behandelaren"
            slug="counselors_list"
            audience="CLIENT"
            currentAudience={router.query.audience}
          />
          <Card
            contextUserId={router.query.id}
            slug="agreements"
            title="Afspraken"
            currentAudience={router.query.audience}
          />
        </Right>
      </Grid>
    </>
  );
};

export default withRouter(App);
