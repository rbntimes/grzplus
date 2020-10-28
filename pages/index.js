import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";

import Card from "../components/Card";

const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar"
};

const Main = styled.main`
  background: lightgray;
  font-family: sans-serif;
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
`;

const App = ({ router }) => {
  return (
    <Main>
      <select
        value={router.query.audience}
        onChange={event => router.push(`/?audience=${event.target.value}`)}
      >
        {Object.keys(roles).map(role => (
          <option value={role}>{roles[role]}</option>
        ))}
      </select>
      <Grid>
        <Card
          title="Stoornis"
          currentAudience={router.query.audience}
          audience={"PSYCHOLOOG"}
        >
          Schiezofrenie
        </Card>
        <Card
          title="Slikadvies"
          currentAudience={router.query.audience}
          audience={"DIETIST"}
        >
          <h1>JA</h1>
        </Card>
        <Card
          title="Jouw oefeningen"
          currentAudience={router.query.audience}
          audience={"CLIENT"}
        >
          Jouw oefeningen voor vandaag
        </Card>
      </Grid>
    </Main>
  );
};

export default withRouter(App);
