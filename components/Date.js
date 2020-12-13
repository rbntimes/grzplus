import styled from "styled-components";
import { DatePicker } from "antd";

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

const Value = styled.h2`
  font-size: 1.5rem;
`;

const Content = styled.p`
  color: gray;
`;

export default ({ value, setValue }) => <DatePicker onChange={setValue} />;
