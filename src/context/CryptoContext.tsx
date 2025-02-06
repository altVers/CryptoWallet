import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchAssets, fetchData } from "../api/fetchData";
import { percentDiff } from "../helpers/percentDiff";
import { TAssets, TAssetsArray, TAssetsExtendedArray } from "../types/TAssets";
import { TCryptoArray } from "../types/TCrypto";

interface CryptoContextType {
  assets: TAssetsExtendedArray | undefined;
  crypto: TCryptoArray | undefined;
  loading: boolean;
  addAsset: (newAsset: TAssets) => void;
  removeAsset: (id: string) => void;
  editAsset: (updatedAsset: TAssets) => void;
}

interface CryptoContextProviderProps {
  children: ReactNode;
}

const CryptoContext = createContext<CryptoContextType>({
  loading: false,
  crypto: [],
  assets: [],
  addAsset: () => {},
  removeAsset: () => {},
  editAsset: () => {},
});

export function CryptoContextProvider({
  children,
}: CryptoContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<TCryptoArray>([]);
  const [assets, setAssets] = useState<TAssetsExtendedArray>([]);

  const mapAssets = (asstes: TAssetsArray, result: TCryptoArray) => {
    return asstes.map((item) => {
      const coin = result.find((c) => item.id === c.id);
      if (!coin) {
        return {
          ...item,
          name: "unknown coin",
          isGrow: false,
          growPercent: 0,
          totalAmount: 0,
          totalProfit: 0,
        };
      }
      return {
        name: coin.name,
        isGrow: item.price > coin.price,
        growPercent: percentDiff(item.price, coin.price),
        totalAmount: item.amount * coin.price,
        totalProfit: item.amount * item.price - item.amount * coin.price,
        ...item,
      };
    });
  };

  useEffect(() => {
    async function preload() {
      try {
        setLoading(true);
        const myAssets = await fetchAssets();
        const result = await fetchData();

        setCrypto(result);
        setAssets(mapAssets(myAssets, result));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    preload();
  }, []);

  function addAsset(newAsset: TAssets) {
    setAssets((prevAssets) => {
      const existingAssetIndex = prevAssets.findIndex(
        (asset) => asset.id === newAsset.id
      );

      if (existingAssetIndex !== -1) {
        // Если актив уже существует, обновляем его
        const updatedAssets = [...prevAssets];
        const existingAsset = updatedAssets[existingAssetIndex];

        updatedAssets[existingAssetIndex] = {
          ...existingAsset,
          amount: existingAsset.amount + newAsset.amount,
          totalAmount:
            existingAsset.totalAmount + newAsset.amount * newAsset.price,
        };

        return mapAssets(updatedAssets, crypto);
      } else {
        // Если актива нет, добавляем новый
        return mapAssets([...prevAssets, newAsset], crypto);
      }
    });
  }

  function removeAsset(id: string) {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  }

  function editAsset(updatedAsset: TAssets) {
    console.log(assets);
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id === updatedAsset.id) {
          // Обновляем существующий актив, сохраняя все поля, которые не были изменены
          return { ...asset, ...updatedAsset };
        }
        return asset;
      })
    );
    console.log(assets);
  }

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, removeAsset, editAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
