import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const Card = styled.article`
  background: white;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

const Box = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 4px;
  padding: 4px;
`;

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`
  width: 50%;
  display: flex;
  border: 1px solid ${({ checked }) => (checked ? "#00b0f0" : "lightgrey")};
  margin: 4px;
  padding: 4px;
`;

const Icon = styled.div`
  background: ${({ active }) => (active ? "#00b0f0" : "lightgrey")};
  min-width: 70px;
  height: 70px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: ${({ position }) => position};
`;

const Value = styled.h2`
  font-size: 1.5rem;
`;

const Content = styled.p`
  color: gray;
`;

export default ({ value, setValue, editable }) => {
  const [cognitive, setCognitive] = useState(value);

  useEffect(() => {
    setValue(cognitive);
  }, [cognitive]);

  useEffect(() => {
    setCognitive(value);
  }, [value]);
  return (
    <Container>
      <Item
        checked={cognitive === "strict"}
        onClick={() => setCognitive("strict")}
      >
        <Icon
          active={cognitive === "strict"}
          position="center"
          src="/cognitive/strict.svg"
        />
        <ul>
          <li>Foutloos leren (geen fouten laten maken)</li>
          <li>Directe instructies</li>
          <li>Instructies voor/per stap (voor uitvoer stap)</li>
        </ul>
      </Item>
      <Item
        checked={cognitive === "trial"}
        onClick={() => setCognitive("trial")}
      >
        <Icon
          active={cognitive === "trial"}
          position="bottom"
          src="/cognitive/trial.svg"
        />
        <ul>
          <li>Ervaringsgewijs leren (leren van ervaringen)</li>
          <li>Laten proberen</li>
          <li>
            Reflecteren tijdens of achteraf (vragen stellen) ervaringsgewijs
          </li>
        </ul>
      </Item>
    </Container>
  );
};
