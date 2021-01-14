import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
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
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  grid-gap: 1rem;
  width: 100%;

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

const App = ({ router, session }) => {
  const { data, loading } = useSWR(`/api/users/${router.query.id}`, fetcher);
  if (!data?.name) return <Loading />;

  // if (typeof window !== "undefined" && loading) return null;
  //
  // if (!session) {
  //   router.push("/");
  //   return null;
  // }
  console.log(data);

  return (
    <>
      <h1>
        Dit zijn de kaarten van {data?.name}, kamer {data?.room}
      </h1>

      <Grid>
        <Left>
          <Card
            title={`Mobiliteit ${data?.name}`}
            contextUserId={router.query.id}
            currentAudience={router.query.audience}
            slug="mobility"
            session={session}
          ></Card>
          <Card
            title={`Transfer ${data?.name}`}
            contextUserId={router.query.id}
            currentAudience={router.query.audience}
            slug="transfer"
            session={session}
          ></Card>
          <Card
            title={`ADL ${data?.name}`}
            contextUserId={router.query.id}
            currentAudience={router.query.audience}
            slug="adl"
            session={session}
          ></Card>
          <Card
            title={`Cognitieve begeleiding ${data?.name}`}
            contextUserId={router.query.id}
            currentAudience={router.query.audience}
            slug="cognitive"
            session={session}
          ></Card>
          <Card
            contextUserId={router.query.id}
            slug="agreements"
            title="Afspraken"
            currentAudience={router.query.audience}
            session={session}
          />
        </Left>
        <Right>
          {session?.dbUser?.role !== "CLIENT" ? (
            <Card
              contextUserId={router.query.id}
              title="Reanimatiebeleid"
              slug="reanimation"
              currentAudience={router.query.audience}
              session={session}
            />
          ) : null}
          <Card
            contextUserId={router.query.id}
            title="Voorlopige ontslagdatum"
            slug="discharge_date"
            currentAudience={router.query.audience}
            session={session}
          />
          <Card
            contextUserId={router.query.id}
            slug="goals"
            title="Doel van de week"
            currentAudience={router.query.audience}
            session={session}
          />
          <Card
            contextUserId={router.query.id}
            title="Naam + foto's van behandelaren"
            slug="counselors_list"
            audience="CLIENT"
            currentAudience={router.query.audience}
            session={session}
          />
          <Card
            contextUserId={router.query.id}
            slug="exercises"
            title={`Oefeningen van ${data?.name}`}
            currentAudience={router.query.audience}
            session={session}
          />
          <Card
            contextUserId={router.query.id}
            title="Slikadvies"
            slug="swallow_advice"
            audience="DIETIST"
            currentAudience={router.query.audience}
            session={session}
          />
        </Right>
      </Grid>
    </>
  );
};

export default withRouter(App);
