import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import { Card, Avatar } from "antd";
import { Tooltip } from "antd";

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
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 125px;
  display: flex;
  border: 1px solid ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
  margin: 4px;
  padding: 4px;
  flex-direction: column;
`;

const Icon = styled.div`
  background: ${({ active }) => (active ? "#00b0f0" : "lightgrey")};
  width: 100%;
  height: 100px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: ${({ position }) => position};
`;

const LargeList = styled.ul`
  margin: 4px 0;
  padding: 0;
  display: flex;
`;

const Large = styled.li`
  background: ${({ active }) => (active ? "#00b0f0" : "lightgrey")};
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  width: 75px;
  margin: 1px;
  height: 75px;
  background-repeat: no-repeat;
  background-position: ${({ position }) => position};
  list-style-type: none;
`;

const SmallList = styled.ul`
  margin: 4px 0;
  padding: 0;
  display: flex;
`;

const Small = styled.li`
  background: ${({ active }) => (active ? "#00b0f0" : "lightgrey")};
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  width: 30px;
  margin: 1px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: ${({ position }) => position};
  list-style-type: none;
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

export default ({ editable, value, setValue }) => {
  const types = {
    "shower-upper": "",
    "shower-lower": "",
    "sponge-upper": "",
    "sponge-lower": "",
    shirt: "",
    trousers: "",
    toilet: "",
    bed: ""
  };
  const choices = [
    "fysieke-begeleiding",
    "auditieve-begeleiding",
    "supervisie",
    "zelfstandig"
  ];
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

  if (types) {
    return (
      <>
        <Container>
          {Object.keys(types).map(type => (
            <Item>
              <Icon position="top" src={`/adl/${type}.svg`} />
              <SmallList>
                {choices.map(choice => (
                  <Small
                    active={
                      mobility && mobility[type]
                        ? mobility[type] === choice
                        : false
                    }
                    onClick={
                      !editable ? () => {} : () => handleMobility(choice, type)
                    }
                    position="center"
                    src={`/adl/choice/${choice}.svg`}
                  />
                ))}
              </SmallList>
            </Item>
          ))}
        </Container>
        <LargeList>
          {choices.map(choice => (
            <Tooltip title={choice}>
              <Large position="center" src={`/adl/choice/${choice}.svg`} />
            </Tooltip>
          ))}
        </LargeList>
      </>
    );
  }
  return null;
};
