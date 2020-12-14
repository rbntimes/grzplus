import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import useSWR from "swr";
import { Skeleton, Switch, Card, Avatar, Layout } from "antd";
const { Content } = Layout;
import { Button } from "antd";
import Mobility from "./Mobility";
import Date from "./Date";

import format from "date-fns/format";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
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
    setValue(goal?.goal);
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
      extra={
        <Button
          loading={loading}
          type="primary"
          disabled={goal?.goal === value}
          onClick={addGoal}
        >
          Opslaan
        </Button>
      }
      loading={loading}
    >
      <GlobalStyle />
      <Meta
        avatar={
          <Avatar
            src={`https://fakeface.rest/face/view/${goal &&
              goal?.changed_by}?gender=female&minimum_age=55`}
          />
        }
        description={
          goal && goal.created && goal.created instanceof Date
            ? `Laatst gewijzigd op ${format(
                new Date(goal?.created),
                "dd-MM-yyyy HH:mm"
              )}`
            : null
        }
      ></Meta>
      <Container>
        {!loading ? (
          <>
            {slug === "mobility" ? (
              <>
                <Mobility value={goal?.goal} setValue={setValue} />
              </>
            ) : slug === "discharge_date" ? (
              <Date
                value={goal?.goal}
                editable={session?.dbUser?.role !== "CLIENT"}
                setValue={setValue}
              />
            ) : (
              <Content>
                {session?.dbUser?.role !== "CLIENT" ? (
                  <ContentEditable onChange={handleChanges} html={value} />
                ) : (
                  value
                )}
              </Content>
            )}
          </>
        ) : null}
      </Container>
    </Card>
  );
};
