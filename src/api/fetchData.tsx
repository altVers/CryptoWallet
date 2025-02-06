import { TAssetsArray } from "../types/TAssets";
import { TCryptoArray } from "../types/TCrypto";
import { cryptoAssets } from "../data";

export const fetchData = (): Promise<TCryptoArray> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": `${import.meta.env.VITE_API_KEY}`,
    },
  };

  return fetch("https://openapiv1.coinstats.app/coins", options)
    .then((res) => res.json())
    .then((res) => res.result)
    .catch((err) => console.error(err));
};

export const fetchAssets = (): Promise<TAssetsArray> => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(cryptoAssets);
    }, 1000);
  });
};
