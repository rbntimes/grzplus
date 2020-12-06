import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import { Card, Avatar } from "antd";

const { Meta } = Card;

const Title = styled.h2`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Created = styled.span`
  font-size: 1rem;
`;

const Content = styled.p`
  color: gray;
`;

export default ({ name, id, room, age, gender }) => {
  if (name) {
    return (
      <Link href={`/user/${id}`}>
        <Card
          style={{ width: "100%" }}
          cover={
            <img
              alt="example"
              src={`https://fakeface.rest/face/view/${id}?gender=${
                gender === "MALE" ? "male" : "female"
              }&minimum_age=55`}
            />
          }
        >
          <Meta title={`${name}, ${age}`} description={room} />
        </Card>
      </Link>
    );
  }
  return null;
};
