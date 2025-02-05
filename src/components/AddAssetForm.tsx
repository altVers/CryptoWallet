import { FC, useContext, useRef, useState } from "react";
import CryptoContext from "../context/CryptoContext";
import {
  Button,
  Divider,
  Form,
  FormProps,
  InputNumber,
  Select,
  Space,
  DatePicker,
  Result,
} from "antd";
import { TCrypto } from "../types/TCrypto";
import CoinInfo from "./CoinInfo";
import { TAssets, TAssetsExtended } from "../types/TAssets";
import { percentDiff } from "../helpers/percentDiff";

type FieldType = {
  amount?: number;
  price?: number;
  date?: Date;
  total?: number;
};

interface Props {
  onClose: () => void;
}

const AddAssetForm: FC<Props> = ({ onClose }) => {
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState<TCrypto | undefined>();
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const asset = useRef<TAssets | null>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (coin && values.amount && values.price) {
      const newAsset: TAssets = {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date ? new Date(values.date) : new Date(),
      };

      asset.current = newAsset;
      addAsset(newAsset);
      setSubmitted(true);
    }
  };

  const handleAnountChange = (value: number | null): void => {
    if (coin && value) {
      form.setFieldsValue({
        total: +(value * coin.price).toFixed(2),
      });
    }
  };
  const handlePriceChange = (value: number | null): void => {
    const amount = form.getFieldValue("amount");
    if (value && amount) {
      form.setFieldsValue({
        total: +(amount * value).toFixed(2),
      });
    }
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title={`Монета ${coin?.name} успешно добавлена в кошелек`}
        subTitle={`Количество: ${asset.current?.amount}, Стоимость: ${asset.current?.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Закрыть
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Выбрать монету"
        onSelect={(v) => setCoin(crypto?.find((c) => c.id === v))}
        options={crypto?.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              width={30}
              height={30}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  return (
    <>
      <CoinInfo coin={coin} />
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Количество"
          name="amount"
          rules={[{ required: true, message: "Введите количество монет" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            onChange={handleAnountChange}
            min={0}
            placeholder="Сколько купили"
            inputMode="numeric"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Цена монеты"
          name="price"
          initialValue={+coin.price.toFixed(2)}
        >
          <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
        </Form.Item>

        <Form.Item<FieldType> label="Дата и время" name="date">
          <DatePicker showTime placeholder="Выберите дату" />
        </Form.Item>

        <Form.Item<FieldType> label="Стоимость" name="total">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Добавить монету
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetForm;
