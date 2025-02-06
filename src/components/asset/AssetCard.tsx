import { Card, Flex, Statistic, List, Typography, Tag, Modal } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FC, useState } from "react";
import { TAssetsExtended } from "../../types/TAssets";
import AssetModalInfo from "../AssetModalInfo";

interface Props {
  asset: TAssetsExtended;
  onRemove: (id: string) => void;
}

export const AssetCard: FC<Props> = ({ asset, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card bordered={false} style={{ width: "100%", marginBottom: 20 }}>
      <Flex style={{ marginBottom: 20 }} justify="space-between">
        <Statistic
          title={asset.name}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{ color: asset.isGrow ? "#3f8600" : "#cf1322" }}
          prefix={asset.isGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        <Flex gap={10}>
          <EditOutlined
            style={{
              width: "30px",
              height: "30px",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(true)}
          />
          <DeleteOutlined
            style={{
              width: "30px",
              height: "30px",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={() => onRemove(asset.id)}
          />
        </Flex>
      </Flex>
      <List
        bordered
        dataSource={[
          {
            title: "Полная выручка",
            value: `${asset.totalProfit.toFixed(1)} $`,
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
        renderItem={(item) => (
          <List.Item>
            <span>{item.title}</span>
            {item.isPlain ? (
              <span>{item.value}</span>
            ) : (
              <Typography.Text type={asset.isGrow ? "success" : "danger"}>
                {item.withTag && (
                  <Tag color={asset.isGrow ? "success" : "error"}>
                    {asset.growPercent.toFixed(2)} %
                  </Tag>
                )}
                {item.value}
              </Typography.Text>
            )}
          </List.Item>
        )}
      />
      <Modal
        title={`Редактирование актива — ${asset.name}`}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <AssetModalInfo
          asset={asset}
          onCloseModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};
