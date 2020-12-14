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
import Head from "next/head";
import { Button, PageHeader, Avatar } from "antd";

import { useRouter } from "next/router";

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

export default function App({ Component, pageProps }) {
  const [session, loading] = useSession();
  const router = useRouter();
  if (loading) return <Loading />;
  return (
    <Layout router={router} session={session}>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {session ? (
          <PageHeader
            title={`${session?.user?.name}`}
            onBack={
              session?.dbUser?.role !== "CLIENT" && router.pathname !== "/"
                ? () => router.push("/")
                : null
            }
            avatar={
              <Avatar
                src={`https://fakeface.rest/face/view/1?gender=female&minimum_age=55`}
              />
            }
            extra={[
              <Button onClick={signOut} key="1" type="primary">
                Uitloggen
              </Button>
            ]}
            subTitle={
              session?.dbUser?.role === "CLIENT"
                ? `- ${session?.dbUser?.room}`
                : "Jouw relaties"
            }
          />
        ) : null}
        <Component session={session} {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
