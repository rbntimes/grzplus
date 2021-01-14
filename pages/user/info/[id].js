import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";
import Date from "../../../components/Date";
import { PageHeader, Layout, Breadcrumb, List, Avatar } from "antd";
const { Content } = Layout;
import { Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  HistoryOutlined,
  SaveOutlined
} from "@ant-design/icons";
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

const Container = styled.div`
  padding: 1rem 0;
`;

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

const getData = async (key, user) => {
  if (key) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/data/info/${key}?user=${user}`
    );
    return await response.json();
  }
  return null;
};

const App = ({ router, session }) => {
  // if (typeof window !== "undefined" && loading) return null;
  //
  // if (!session) {
  //   router.push("/");
  //   return null;
  // }
  const swrKey = `/api/data/info/${router.query.id}?user=${router.query.user}`;
  const { data: goal, mutate, loading } = useSWR(swrKey, () => getData());
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    setValue(goal?.goal || "Nog niet ingevuld");
  }, [goal]);
  console.log(goal, "jaja");

  const addGoal = async event => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/data/info/${router.query.id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          goal: value,
          user_id: contextUserId,
          changed_by: 3
        })
      }
    );

    mutate(swrKey);
    return await response.json();
  };

  const handleChanges = event => {
    setValue(event.target.value);
  };
  console.log(goal, "--------");
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Card
          title={router.query.title}
          loading={loading}
          actions={[
            <Button
              loading={loading}
              type="primary"
              disabled={goal?.goal === value}
              onClick={addGoal}
              icon={<SaveOutlined />}
            >
              Opslaan
            </Button>
          ]}
        >
          <Container>
            {!loading ? (
              <Content>
                <ContentEditable
                  disabled={session?.dbUser?.role === "CLIENT"}
                  onChange={handleChanges}
                  html={value}
                />
              </Content>
            ) : null}
          </Container>
        </Card>
      </Content>
    </Layout>
  );
};

export default withRouter(App);
