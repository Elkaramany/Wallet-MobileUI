export type FungibleTokenMetadata = {
  spec: string;
  name: string;
  symbol: string;
  icon?: string;
  reference?: string;
  referenceHash?: string;
  decimals: number;
};

export type FTtoken = {
  tokenId: string;
  metadata: FungibleTokenMetadata;
  price: string;
  balance: string;
  totalSupply: string;
};

export type WalletAccountFungibleToken = Map<string, FTtoken>;
