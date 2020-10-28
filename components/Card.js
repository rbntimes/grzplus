import styled from "styled-components";

const Card = styled.article`
  background: white;
  padding: 0.5rem;
  border-radius: 3px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  border-bottom: 1px solid lightgray;
`;

const Content = styled.p`
  color: gray;
`;

export default ({ title, currentAudience, audience, children }) =>
  currentAudience === audience || currentAudience === "COUNSELOR" ? (
    <Card>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Card>
  ) : null;
