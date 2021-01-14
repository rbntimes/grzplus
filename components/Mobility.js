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

export default ({ editable, value, setValue }) => {
  const types = {
    room: "",
    department: "",
    outside: ""
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

  if (types) {
    return (
      <>
        {Object.keys(types).map(type => (
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
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac1" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac1", type)
                }
                src="/mobility/fac1.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac2" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac2", type)
                }
                src="/mobility/fac2.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac3" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac3", type)
                }
                src="/mobility/fac3.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac4" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac4", type)
                }
                src="/mobility/fac4.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac5" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac5", type)
                }
                src="/mobility/fac5.svg"
              />
              <Mobility
                checked={
                  mobility && mobility[type] ? mobility[type] === "fac6" : false
                }
                onClick={
                  !editable ? () => {} : () => handleMobility("fac6", type)
                }
                src="/mobility/fac6.svg"
              />
            </MobilityList>
          </>
        ))}
      </>
    );
  }
  return null;
};
