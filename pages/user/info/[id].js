import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";
import Date from "../../../components/Date";
import { PageHeader, Layout, Breadcrumb, List, Avatar } from "antd";
const { Content } = Layout;
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then(res => res.json());
import format from "date-fns/format";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar",
  MPO: "Medisch Praktijk Ondersteuner"
};
import ContentEditable from "react-contenteditable";

const contextUser = {
  name: "Aard Bakker"
};

const loggedinUser = {
  name: "Hylke Vink"
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  const { data, loading } = useSWR(
    `/api/data/info/${router.query.id}?user=${router.query.user}`,
    fetcher
  );
  if (!data) return <Loading />;

  // if (typeof window !== "undefined" && loading) return null;
  //
  // if (!session) {
  //   router.push("/");
  //   return null;
  // }
  console.log(data);

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <h1>{router.query.title}</h1>
        <Content style={{ background: "white" }}>
          <ContentEditable
            disabled={session?.dbUser?.role === "CLIENT"}
            html={data?.goal ? data?.goal : "Vul in"}
          />
        </Content>
      </Content>
    </Layout>
  );
};

export default withRouter(App);
