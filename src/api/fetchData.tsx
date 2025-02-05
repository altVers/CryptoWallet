import { TAssetsArray } from "../types/TAssets";
import { TCryptoArray } from "../types/TCrypto";
import { cryptoAssets, cryptoData } from "../data";

export const fetchData = ():Promise<TCryptoArray> => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(cryptoData.result);
    }, 1500);
  });
};

export const fetchAssets = ():Promise<TAssetsArray> => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(cryptoAssets);
    }, 1500);
  });
};
