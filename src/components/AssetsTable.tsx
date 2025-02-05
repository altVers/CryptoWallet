import React, { useContext } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import CryptoContext from "../context/CryptoContext";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
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
    title: "Цена, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price
  },
  {
    title: "Количество",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount
  },
];

const AssetsTable = () => {
  const { assets } = useContext(CryptoContext);
  const data = assets?.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));
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
