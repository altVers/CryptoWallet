import { FC, useContext, useState } from "react";
import { TAssets } from "../types/TAssets";
import { Button, Form, InputNumber } from "antd";
import CryptoContext from "../context/CryptoContext";

interface Props {
  asset: TAssets;
  onCloseModal: () => void;
}

type FieldType = {
  amount?: number;
};

const AssetModalInfo: FC<Props> = ({ asset, onCloseModal }) => {
  const { editAsset, crypto } = useContext(CryptoContext);
  const [amount, setAmount] = useState<number>(asset.amount);
  const coin = crypto?.find((c) => c.id === asset.id);
  const onFinish = () => {
    if (coin) {
      const editedAsset = {
        ...asset,
        amount,
        totalAmount: amount * coin.price,
      };
      editAsset(editedAsset);
    }
    onCloseModal();
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 30 }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label="Количество"
        name="amount"
        rules={[{ required: true, message: "Введите количество монет" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          onChange={(v) => setAmount(v || 0)}
          min={0}
          value={amount}
          placeholder="Введите новое количество монет"
          inputMode="numeric"
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Изменить количество монет
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssetModalInfo;
