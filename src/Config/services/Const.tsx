import * as nearAPI from 'near-api-js';

import {config} from './Config';

export const FT_MINIMUM_STORAGE_BALANCE =
  nearAPI.utils.format.parseNearAmount('0.00125')!;

export const FT_MINIMUM_STORAGE_BALANCE_LARGE =
  nearAPI.utils.format.parseNearAmount('0.0125')!;

export const FT_STORAGE_DEPOSIT_GAS =
  nearAPI.utils.format.parseNearAmount('0.00000000003')!;

export const FT_TRANSFER_GAS =
  nearAPI.utils.format.parseNearAmount('0.00000000003')!;

export const FT_TRANSFER_DEPOSIT = '1';

export const rpcProvider = new nearAPI.providers.JsonRpcProvider(
  config.nodeUrl,
);

export const NFT_TRANSFER_GAS =
  nearAPI.utils.format.parseNearAmount('0.00000000003');

export const NFT_TRANSFER_DEPOSIT = 1; // 1 yocto Near

export const LINKDROP_GAS = '100000000000000';

export const MIN_BALANCE_TO_CREATE =
  nearAPI.utils.format.parseNearAmount('0.1');
