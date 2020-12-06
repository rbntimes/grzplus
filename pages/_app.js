import { createGlobalStyle, ThemeProvider } from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import "antd/dist/antd.css";
const Main = styled.main`
  background: lightgray;
  font-family: sans-serif;
  padding: 1rem;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

export default function App({ router, Component, pageProps }) {
  const [session, loading] = useSession();
  if (loading) return <Loading />;
  return (
    <Layout router={router} session={session}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component session={session} {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
