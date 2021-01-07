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

const Label = styled.label`
  font-size: 10px;
  /* word-break: break-all; */
  width: 100%;
  color: ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
`;

const MobilityList = styled.div`
  display: flex;
`;
// background: ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
const Mobility = styled.div`
  width: 80px;
  border: 1px solid ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
  height: 80px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 0.5rem 1rem 0;
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
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "passievelift"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "passievelift"
                      : false
                  }
                  onClick={() => handleMobility("passievelift", type)}
                  src="/transfer/passievelift.jpg"
                />
                Passieve lift
              </Label>
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "actievelift"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "actievelift"
                      : false
                  }
                  onClick={() => handleMobility("actievelift", type)}
                  src="/transfer/actievelift.jpg"
                />
                Actieve lift
              </Label>
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "beaopstaphulp"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "beaopstaphulp"
                      : false
                  }
                  onClick={() => handleMobility("beaopstaphulp", type)}
                  src="/transfer/beaopstaphulp.jpg"
                />
                Bea opstaphulp
              </Label>
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "lotusopstaphulp"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "lotusopstaphulp"
                      : false
                  }
                  onClick={() => handleMobility("lotusopstaphulp", type)}
                  src="/transfer/lotusopstaphulp.jpeg"
                />
                Lotus opstaphulp
              </Label>
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "rollator"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "rollator"
                      : false
                  }
                  onClick={() => handleMobility("rollator", type)}
                  src="/transfer/rollator.jpg"
                />
                Rollator
              </Label>
              <Label
                checked={
                  mobility && mobility[type]
                    ? mobility[type] === "kortedraai"
                    : false
                }
              >
                <Mobility
                  checked={
                    mobility && mobility[type]
                      ? mobility[type] === "kortedraai"
                      : false
                  }
                  onClick={() => handleMobility("kortedraai", type)}
                  src="/transfer/kortedraai.jpg"
                />
                Korte draai
              </Label>
            </MobilityList>
          </>
        ))}
      </>
    );
  }
  return null;
};
