import { FC } from "react";
import { TCrypto } from "../types/TCrypto";
import { Flex, Typography } from "antd";

interface Props {
  coin: TCrypto;
  withSymbol?: boolean;
}

const CoinInfo: FC<Props> = ({ coin, withSymbol = false }) => {
  return (
    <Flex align="center" gap={15}>
      <img src={coin.icon} alt={coin.name} width={40} height={40} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
