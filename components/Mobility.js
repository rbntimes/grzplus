import React, { useState, useEffect } from "react";
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

const MobilityList = styled.div`
  display: flex;
`;

const Mobility = styled.div`
  background: ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
  width: 70px;
  height: 70px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 1rem 1rem 0;
`;

export default ({ value, setValue }) => {
  const [mobility, setMobility] = useState({ ...value });
  const handleMobility = (item, type) => {
    setMobility({
      ...mobility,
      [type]: {
        ...mobility[type],
        [item]: !Boolean(mobility[type][item])
      }
    });
  };

  useEffect(() => {
    setValue(mobility);
  }, [mobility]);

  if (value) {
    return (
      <>
        {Object.keys(value).map(type => (
          <>
            <h3>
              Mobiliteit{" "}
              {type === "room"
                ? "op kamer"
                : type === "department"
                ? "op afdeling"
                : "buiten afdeling"}
            </h3>
            <MobilityList>
              <Mobility
                checked={mobility[type]?.wheelchair}
                onClick={() => handleMobility("wheelchair", type)}
                src="/wheelchair.svg"
              />
              <Mobility
                checked={mobility[type]?.walkingstick}
                onClick={() => handleMobility("walkingstick", type)}
                src="/walking-stick.svg"
              />
              <Mobility
                checked={mobility[type]?.walker}
                onClick={() => handleMobility("walker", type)}
                src="/walker.svg"
              />
            </MobilityList>
          </>
        ))}
      </>
    );
  }
  return null;
};