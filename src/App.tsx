import { Layout } from "antd";
import { Header } from "./components/layout/Header/Header";
import { Footer } from "./components/layout/Footer/Footer";
import { MainPage } from "./pages/MainPage";
import { CryptoContextProvider } from "./context/CryptoContext";


export default function App() {
  return (
    <CryptoContextProvider>
      <Layout>
        <Header />
        <Layout>
          <MainPage />
        </Layout>
        <Footer />
      </Layout>
    </CryptoContextProvider>
  );
}
