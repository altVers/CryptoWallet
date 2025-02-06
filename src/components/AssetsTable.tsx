import React, { useContext } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import CryptoContext from "../context/CryptoContext";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
  capital: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Название",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Цена монеты, $",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Количество",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Сумма, $",
    dataIndex: "capital",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.capital - b.capital,
  },
];

const AssetsTable = () => {
  const { assets, crypto } = useContext(CryptoContext);
  const data = assets?.map((asset) => {
    const coin = crypto?.find((c) => c.id === asset.id);

    return {
      key: asset.id,
      name: asset.name,
      price: coin ? +coin.price.toFixed(2) : +asset.price.toFixed(2),
      amount: asset.amount,
      capital: +asset.totalAmount.toFixed(2),
    };
  });
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
      pagination={false}
    />
  );
};

export default AssetsTable;
