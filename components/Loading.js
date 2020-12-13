import Link from "next/link";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Main>
      <h1>Aan het laden...</h1>
    </Main>
  );
};
