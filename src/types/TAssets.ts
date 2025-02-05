export type TAssets = {
  id: string;
  amount: number;
  price: number;
  date: Date;
};

type TExtention = {
  name: string;
  isGrow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
};

export type TAssetsArray = TAssets[];
export type TAssetsExtended = TAssets & TExtention;
export type TAssetsExtendedArray = TAssetsExtended[];
