import { FC } from "react";
import { TCrypto } from "../types/TCrypto";
import { Divider, Flex, Tag, Typography } from "antd";
import CoinInfo from "./CoinInfo";

interface Props {
  coin: TCrypto | undefined;
}

const CryptoModalInfo: FC<Props> = ({ coin }) => {
  if (!coin) {
    return <div>По данной монете нет никаких данных.</div>;
  }
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Title level={4}>Изменения:</Typography.Title>
      <Flex align="center" gap={10}>
        <Typography.Paragraph>
          <Typography.Text>Час: </Typography.Text>
          <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
            {coin.priceChange1h} %
          </Tag>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>День: </Typography.Text>
          <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
            {coin.priceChange1d} %
          </Tag>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>Неделя: </Typography.Text>
          <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
            {coin.priceChange1w} %
          </Tag>
        </Typography.Paragraph>
      </Flex>
      <Typography.Title level={4}>Информация:</Typography.Title>
      <Typography.Paragraph>
        <Typography.Text>
          <b>Стоимость монеты:</b> {coin.price.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>
          <b>Стоимость монеты в BTC:</b> {coin.priceBtc.toFixed(2)}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>
          <b>Капитал валюты:</b> {coin.marketCap.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
    </>
  );
};

export default CryptoModalInfo;
