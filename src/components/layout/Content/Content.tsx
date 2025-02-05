import { FC, useContext } from "react";
import { Flex, Layout, Typography } from "antd";
import CryptoContext from "../../../context/CryptoContext";
import { TCrypto } from "../../../types/TCrypto";
import PortfolioChart from "../../PortfolioChart";
import AssetsTable from "../../AssetsTable";

const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 64px)",
  color: "#fff",
  backgroundColor: "#02315E",
  padding: 20,
};

const Content: FC = () => {
  const { assets, crypto } = useContext(CryptoContext);

  const cryptoMap =
    crypto?.reduce((acc: Record<string, number>, c: TCrypto) => {
      acc[c.id] = c.price;
      return acc;
    }, {}) || {};

  const walletAmount =
    assets?.reduce((acc, asset) => {
      const coinPrice = cryptoMap[asset.id];
      if (coinPrice) {
        acc += asset.amount * coinPrice;
      }
      return acc;
    }, 0) || 0;

  return (
    <Layout.Content style={contentStyle}>
      <Flex gap={20} vertical>
        <Typography.Title
          level={3}
          style={{ color: "white", textAlign: "start", margin: 0 }}
        >
          Общая сумма кошелька: {walletAmount?.toFixed()} $
        </Typography.Title>
        <PortfolioChart />
        <AssetsTable />
      </Flex>
    </Layout.Content>
  );
};

export default Content;
