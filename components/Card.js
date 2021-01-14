import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import useSWR from "swr";
import { Skeleton, Switch, Card, Avatar, Layout, Tooltip } from "antd";
const { Content } = Layout;
import { Button } from "antd";
import Mobility from "./Mobility";
import Reanimation from "./Reanimation";
import ADL from "./ADL";
import Transfer from "./Transfer";
import Cognitive from "./Cognitive";
import Date from "./Date";
import Link from "next/link";
import isValid from "date-fns/isValid";
import toDate from "date-fns/toDate";
import format from "date-fns/format";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  HistoryOutlined,
  SaveOutlined
} from "@ant-design/icons";

const { Meta } = Card;
import ContentEditable from "react-contenteditable";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Title = styled.h2`
  font-size: 1.5rem;
`;

const GlobalStyle = createGlobalStyle`
  .ant-card-head-title {
    white-space: pre-wrap;
  }
`;

const Created = styled.span`
  font-size: 1rem;
`;

const Container = styled.div`
  padding: 1rem 0;
`;

const getData = async (key, user) => {
  if (key) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/data/${key}?user=${user}`
    );
    return await response.json();
  }
  return null;
};

const addGoal = async (goal, key) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${key}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(goal)
  });
  return await response.json();
};

export default ({
  contextUserId,
  title,
  slug,
  currentAudience,
  audience,
  children,
  session
}) => {
  const swrKey = `data/${slug}/${contextUserId}`;
  const { data: goal, mutate, loading } = useSWR(swrKey, () =>
    getData(slug, contextUserId)
  );
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    setValue(goal?.goal || "Nog niet ingevuld");
  }, [goal]);

  const addGoal = async event => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/data/${slug}`,
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

  return (
    <Card
      title={title}
      loading={loading}
      actions={[
        <Tooltip
          placement="topLeft"
          title={goal?.info?.goal}
          arrowPointAtCenter
        >
          <Button icon={<InfoCircleOutlined />}>
            <Link
              href={`/user/info/${slug}?title=${title}&user=${contextUserId}`}
            >
              Extra
            </Link>
          </Button>
        </Tooltip>,
        <Button icon={<HistoryOutlined />}>
          <Link
            href={`/user/history/${slug}?title=${title}&user=${contextUserId}`}
          >
            Geschiedenis
          </Link>
        </Button>,
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
      <GlobalStyle />
      <>
        {goal?.created ? (
          <Meta
            avatar={
              <Avatar src={`https://randomuser.me/api/portraits/men/21.jpg`} />
            }
            description={`Laatst gewijzigd op ${format(
              parseISO(goal?.created),
              "dd-MM-yyyy"
            )} door Hylke Vink (Fysiotherapeut)`}
          ></Meta>
        ) : null}
        <Container>
          {!loading ? (
            <>
              {slug === "mobility" ? (
                <>
                  <Mobility value={goal?.goal} setValue={setValue} />
                </>
              ) : slug === "adl" ? (
                <>
                  <ADL value={goal?.goal} setValue={setValue} />
                </>
              ) : slug === "reanimation" ? (
                <>
                  <Reanimation value={goal?.goal} setValue={setValue} />
                </>
              ) : slug === "transfer" ? (
                <>
                  <Transfer value={goal?.goal} setValue={setValue} />
                </>
              ) : slug === "cognitive" ? (
                <>
                  <Cognitive value={goal?.goal} setValue={setValue} />
                </>
              ) : slug === "discharge_date" ? (
                <Date
                  value={goal?.goal}
                  editable={session?.dbUser?.role !== "CLIENT"}
                  setValue={setValue}
                />
              ) : (
                <Content>
                  <ContentEditable
                    disabled={session?.dbUser?.role === "CLIENT"}
                    onChange={handleChanges}
                    html={value}
                  />
                </Content>
              )}
            </>
          ) : null}
        </Container>
      </>
    </Card>
  );
};
