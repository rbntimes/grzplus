import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import { signIn, signOut, useSession } from "next-auth/client";
import { PageHeader } from "antd";
import Card from "../components/Card";
import User from "../components/User";
import Date from "../components/Date";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const fetcher = (...args) => fetch(...args).then(res => res.json());
const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar",
  MPO: "Medisch Praktijk Ondersteuner"
};

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const App = ({ router, users, session }) => {
  const { data, loading } = useSWR(
    `/api/users/getRelations?email=${session?.user?.email}`,
    fetcher
  );
  if (loading) return <Loading />;

  return (
    <>
      <PageHeader
        title={`Welkom ${data?.user?.name}`}
        subTitle="Dit zijn al jouw relaties"
      />
      <Grid>
        {data ? (
          data.relations?.map(user => <User key={user.id} {...user} />)
        ) : (
          <Loading />
        )}
      </Grid>
    </>
  );
};

export default withRouter(App);
