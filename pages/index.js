import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";

import Card from "../components/Card";
import Date from "../components/Date";

const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar",
  MPO: "Medisch Praktijk Ondersteuner"
};

const contextUser = {
  name: "Cees Ligtelijn"
};

const loggedinUser = {
  name: "Hylke Vink"
};

const Main = styled.main`
  background: lightgray;
  font-family: sans-serif;
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 100px;
  height: 100px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 1rem 1rem 0;
`;

const App = ({ router }) => {
  return (
    <Main>
      <label>
        Ingelogd als:
        <select
          value={router.query.audience}
          onChange={event => router.push(`/?audience=${event.target.value}`)}
        >
          {Object.keys(roles).map(role => (
            <option value={role}>{roles[role]}</option>
          ))}
        </select>
      </label>
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
            title={`Oefeningen van ${contextUser.name}`}
            currentAudience={router.query.audience}
          >
            Jouw oefeningen voor vandaag
          </Card>
          <Card
            title="DSM-V"
            currentAudience={router.query.audience}
            audience="PSYCHOLOOG"
          >
            <ul>
              <li>Persisterende depressieve stoornis</li>
            </ul>
          </Card>
          <Card
            title="Slikadvies"
            audience="DIETIST"
            currentAudience={router.query.audience}
          >
            <h1>Slikadvies aanwezig: Nee</h1>
            <h1>Eten drinken onder toezicht: Ja</h1>
          </Card>
        </Left>
        <Right>
          <Card
            title="Voorlopige ontslagdatum"
            currentAudience={router.query.audience}
          >
            <Date year={2020} month={12} day={31}></Date>
          </Card>
          <Card
            title="Doel van de week"
            currentAudience={router.query.audience}
          >
            <p>
              Etiam porta sem malesuada magna mollis euismod. Aenean lacinia
              bibendum nulla sed consectetur. Nulla vitae elit libero, a
              pharetra augue. Donec sed odio dui. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </Card>
          <Card
            title="Naam + foto's van behandelaren"
            audience="CLIENT"
            currentAudience={router.query.audience}
          >
            <ul>
              <li>Frank Fysio</li>
              <li>Petra Psycholoog</li>
            </ul>
          </Card>
          <Card title="Afspraken" currentAudience={router.query.audience}>
            <ul>
              <li>Commodo Dolor Ultricies</li>
              <li>Pharetra Ligula</li>
              <li>Vestibulum Cras Inceptos Dapibus</li>
            </ul>
          </Card>
        </Right>
      </Grid>
    </Main>
  );
};

export default withRouter(App);
