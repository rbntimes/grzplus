import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Skeleton, Switch, Card, Avatar } from "antd";
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

const Created = styled.span`
  font-size: 1rem;
`;

const Content = styled.p`
  color: gray;
`;

const getData = async (key, user) => {
  if (key) {
    const response = await fetch(
      `http://localhost:3000/api/data/${key}?user=${user}`
    );
    return await response.json();
  }
  return null;
};

const addGoal = async (goal, key) => {
  const response = await fetch(`http://localhost:3000/api/${key}`, {
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
  children
}) => {
  const swrKey = `data/${slug}/${contextUserId}`;
  const [value, setValue] = useState("Nog niet ingevuld");

  const { data: goal, mutate, loading } = useSWR(swrKey, () =>
    getData(slug, contextUserId)
  );

  const addGoal = async event => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/api/data/${slug}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ goal: value, user_id: 2, changed_by: 3 })
    });
    mutate(swrKey);
    return await response.json();
  };

  const handleChanges = event => {
    setValue(event.target.value);
  };

  if (
    currentAudience === audience ||
    currentAudience === "COUNSELOR" ||
    !audience
  ) {
    return (
      <Card loading={loading}>
        <Meta
          title={title}
          description={
            goal
              ? `Laatst gewijzigd op ${format(
                  new Date(goal?.created),
                  "dd-MM-yyyy HH:mm"
                )} door ${goal.changed_by}`
              : null
          }
        ></Meta>
        <ContentEditable onChange={handleChanges} html={value || goal?.goal} />
        <button disabled={goal?.goal === value} onClick={addGoal}>
          Submit
        </button>
      </Card>
    );
  }
  return null;
};
