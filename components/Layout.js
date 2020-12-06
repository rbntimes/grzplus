import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then(res => res.json());
import Loading from "./Loading";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Navigation = styled.nav`
  display: flex;
`;

const Main = styled.main`
  background: lightgray;
  font-family: sans-serif;
  padding: 1rem;
`;
const Container = styled.main`
  display: flex;
  height: 100vh;
  width: 100vw;
  text-align: center;
  flex-direction: column;
`;
const menu = [
  "Algemeen",
  "Arts",
  "Verpleegkundige",
  "Ergotherapeut",
  "Fysiotherapeut",
  "Logopedist",
  "Overige"
];

const menuClient = ["Algemeen"];

export default ({ children, router, session, user }) => {
  if (session) {
    return (
      <Layout>
        {router.route !== "/" ? (
          <Sider width={200} className="site-layout-background">
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
              {session?.dbUser?.role !== "CLIENT"
                ? menu.map(item => (
                    <Menu.Item
                      onClick={() => router.push("?test=true")}
                      key={item}
                    >
                      {item}
                    </Menu.Item>
                  ))
                : menuClient.map(item => (
                    <Menu.Item key={item}>{item}</Menu.Item>
                  ))}
            </Menu>
          </Sider>
        ) : null}
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </Layout>
    );
  }
};
