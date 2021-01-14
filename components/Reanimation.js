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
const Label = styled.label`
  font-size: 12px;
  /* word-break: break-all; */
  width: 100%;
  color: ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
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
  const types = {
    room: ""
  };
  const [mobility, setMobility] = useState(value);

  const handleMobility = (item, type) => {
    setMobility({
      ...mobility,
      [type]: item
    });
  };

  useEffect(() => {
    setValue(mobility);
  }, [mobility]);

  useEffect(() => {
    setMobility(value);
  }, [value]);
  console.log(value, mobility);
  if (types) {
    return (
      <>
        {Object.keys(types).map(type => (
          <>
            <MobilityList>
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "red" : false
                }
                onClick={() => handleMobility("red", type)}
                src="/reanimation/red.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "orange"
                    : false
                }
                onClick={() => handleMobility("orange", type)}
                src="/reanimation/orange.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "yellow"
                    : false
                }
                onClick={() => handleMobility("yellow", type)}
                src="/reanimation/yellow.svg"
              />
            </MobilityList>
          </>
        ))}
      </>
    );
  }
  return null;
};
