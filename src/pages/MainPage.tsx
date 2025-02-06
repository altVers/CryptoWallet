import { FC } from "react";
import { Layout } from "antd";
import { Sider } from "../components/layout/Sider/Sider";
import Content from "../components/layout/Content/Content";

export const MainPage: FC = () => {
  return (
    <Layout hasSider>
      <Sider />
      <Content/>
    </Layout>
  );
};
