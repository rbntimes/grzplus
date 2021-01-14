import * as React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import { signIn, signOut, useSessio, providers } from "next-auth/client";
import QR from "qrcode.react";
import { csrfToken } from "next-auth/client";
import Card from "../components/Card";
import User from "../components/User";
import Date from "../components/Date";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import { Form, Input, Button, Checkbox, Divider } from "antd";

const fetcher = (...args) => fetch(...args).then(res => res.json());
const roles = {
  CLIENT: "Client",
  PSYCHOLOOG: "Psycholoog",
  DIETIST: "Dietist",
  COUNSELOR: "Behandelaar",
  MPO: "Medisch Praktijk Ondersteuner"
};
const Center = styled.div`
  text-align: center;
  margin: 0 auto;
`;
const Left = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const Right = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const MobilityList = styled.div`
  display: flex;
`;

const Mobility = styled.div`
  background: #00b0f0;
  width: 70px;
  height: 70px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 1rem 1rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 8
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const App = ({ router, users, session, providers }) => {
  if (session && session?.dbUser?.role === "CLIENT") {
    router.push(`/user/${session?.dbUser?.id}`);
    return <span>redirecting</span>;
  }
  const { data, loading } = useSWR(
    `/api/users/getRelations?email=${session?.user?.email}`,
    fetcher
  );
  console.log(data);
  if (!session) {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={values =>
          signIn("credentials", { email: values.email, password: "1234" })
        }
        // onFinishFailed={onFinishFailed}
      >
        <Center>
          <div>
            <img width={250} src="/logo-grzplus.svg" />
          </div>
          <Divider />

          <div>
            <img width={200} src="/ComBo.png" />
          </div>
          <Divider />
          <h2>Log in met gebruikersnaam en wachtwoord</h2>
        </Center>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Center>
          <Button htmlType="submit">Inloggen</Button>
        </Center>
      </Form>
    );
  }

  return (
    <>
      <Grid>
        {data ? (
          data.relations?.map(user => <User key={user.id} {...user} />)
        ) : (
          <Loading />
        )}
      </Grid>
    </>
  );
};

App.getInitialProps = async context => {
  return {
    providers: await providers(context)
  };
};

export default withRouter(App);
