import styled from "styled-components";

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

export default ({ year, month, day }) => (
  <Card>
    <Box>
      <Value>{day}</Value>
    </Box>
    -
    <Box>
      <Value>{month}</Value>
    </Box>
    -
    <Box>
      <Value>{year}</Value>
    </Box>
  </Card>
);
