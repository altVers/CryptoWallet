import { FC, useContext } from "react";
import { Layout, Spin, Typography } from "antd";
import { AssetCard } from "../../asset/AssetCard";
import CryptoContext from "../../../context/CryptoContext";

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#00457E",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "20px",
};

export const Sider: FC = () => {
  const { assets, loading, removeAsset, crypto } = useContext(CryptoContext);

  if (loading) {
    return (
      <Layout.Sider width="35%" style={siderStyle}>
        <Spin fullscreen />
      </Layout.Sider>
    );
  }

  return (
    <Layout.Sider width="35%" style={siderStyle}>
      {assets?.length ? (
        assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onRemove={removeAsset}
          />
        ))
      ) : (
        <Typography.Paragraph style={{ color: "#fff", fontSize: 20 }}>
          В вашем портфеле нет монет.
        </Typography.Paragraph>
      )}
    </Layout.Sider>
  );
};
