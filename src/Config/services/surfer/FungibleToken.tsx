import * as nearAPI from 'near-api-js';

import {FungibleTokenMetadata} from '../types/FT';

export const ftTotalSupply = async (
  account: nearAPI.Account,
  contractId: string,
): Promise<string> => {
  let contract = new nearAPI.Contract(account, contractId, {
    viewMethods: ['ft_total_supply'],
    changeMethods: [],
  });

  //@ts-ignore
  return await contract.ft_total_supply({
    account_id: account.accountId,
  });
};

export const ftMetadata = async (
  account: nearAPI.Account,
  contractId: string,
): Promise<FungibleTokenMetadata> => {
  let contract = new nearAPI.Contract(account, contractId, {
    viewMethods: ['ft_metadata'],
    changeMethods: [],
  });

  //@ts-ignore
  return await contract.ft_metadata({
    account_id: account.accountId,
  });
};

export const ftBalanceOf = async (
  account: nearAPI.Account,
  contractId: string,
): Promise<string> => {
  let contract = new nearAPI.Contract(account, contractId, {
    viewMethods: ['ft_balance_of'],
    changeMethods: [],
  });

  //@ts-ignore
  return await contract.ft_balance_of({
    account_id: account.accountId,
  });
};

export const ftTransfer = async (
  source: string,
  destintaion: string,
  ammount: string,
): Promise<string> => {
  return '';
};
