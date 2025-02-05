import { FC, useContext } from "react";
import { Layout } from "antd";
import { Sider } from "../components/layout/Sider/Sider";
import CryptoContext from "../context/CryptoContext";
import Content from "../components/layout/Content/Content";

export const MainPage: FC = () => {
  const {assets, loading} = useContext(CryptoContext)

  return (
    <Layout hasSider>
      <Sider assets={assets} isLoading={loading}/>
      <Content/>
    </Layout>
  );
};
