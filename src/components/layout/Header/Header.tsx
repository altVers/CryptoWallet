import { Button, Layout, Modal, Select, Space, Drawer } from "antd";
import { useContext, useState, useEffect } from "react";
import CryptoContext from "../../../context/CryptoContext";
import { TCrypto } from "../../../types/TCrypto";
import CryptoModalInfo from "../../CryptoModalInfo";
import AddAssetForm from "../../AddAssetForm";

const headerStyle: React.CSSProperties = {
  height: 64,
  lineHeight: "64px",
  backgroundColor: "#2F70AF",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const Header = () => {
  const { crypto } = useContext(CryptoContext);
  const [select, setSelect] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<TCrypto>();

  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => {
      document.removeEventListener("keypress", keypress);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedCoin(crypto?.find((c) => c.id === value));
    setIsModalOpen(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: "250px" }}
        value='Нажми "/" для выбора'
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        open={select}
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
      <Button onClick={() => setIsDrawerOpen(true)}>Добавить монету</Button>

      <Modal
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <CryptoModalInfo coin={selectedCoin} />
      </Modal>

      <Drawer
        width={"25%"}
        title="Добавить монету"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setIsDrawerOpen(false)}/>
      </Drawer>
    </Layout.Header>
  );
};
