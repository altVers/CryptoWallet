import { Layout, Card, Statistic, List, Typography, Tag, Spin } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { TAssetsExtendedArray } from "../../../types/TAssets";
import { FC } from "react";

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#00457E",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "20px",
};

interface Props {
  assets: TAssetsExtendedArray | undefined;
  isLoading: boolean;
}

export const Sider: FC<Props> = ({ assets, isLoading }) => {
  if (isLoading)
    return (
      <Layout.Sider width="35%" style={siderStyle}>
        <Spin fullscreen />
      </Layout.Sider>
    );

  return (
    <Layout.Sider width="35%" style={siderStyle}>
      {assets ? (
        assets.map((asset) => {
          return (
            <Card
              key={asset.name}
              bordered={false}
              style={{
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Statistic
                title={asset.name}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{
                  color: asset.isGrow ? "#3f8600" : "#cf1322",
                }}
                prefix={
                  asset.isGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
                style={{ marginBottom: 20 }}
              />
              <List
                bordered
                dataSource={[
                  {
                    title: "Полная выручка",
                    value: `${asset.totalProfit.toFixed(1)}$`,
                    withTag: true,
                    isPlain: false,
                  },
                  {
                    title: "Количество монет",
                    value: asset.amount,
                    isPlain: true,
                    withTag: false,
                  },
                ]}
                renderItem={(listItem) => (
                  <List.Item>
                    <span>{listItem.title}</span>

                    {listItem.isPlain ? (
                      <span>{listItem.value}</span>
                    ) : (
                      <Typography.Text
                        type={asset.isGrow ? "success" : "danger"}
                      >
                        {listItem.withTag && (
                          <Tag color={asset.isGrow ? "success" : "error"}>
                            {asset.growPercent.toFixed(2)} %
                          </Tag>
                        )}
                        {listItem.value}
                      </Typography.Text>
                    )}
                  </List.Item>
                )}
              />
            </Card>
          );
        })
      ) : (
        <div>В вашем портфеле нет монет.</div>
      )}
    </Layout.Sider>
  );
};
