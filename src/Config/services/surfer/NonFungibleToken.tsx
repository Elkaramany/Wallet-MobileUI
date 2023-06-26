import * as nearAPI from 'near-api-js';

import {
  MediaType,
  NFTContractMetadata,
  NFTtoken,
  NFTtokenMetadata,
  NFTtokensForOwner,
  WalletAccountNonFungibleToken,
} from '../types/NFT';
import {NFT_TRANSFER_DEPOSIT, NFT_TRANSFER_GAS} from '../Const';
import {createSignedConnection, viewFunction} from '../utils/RpcUtils';

import {AccountFromSeedPhrase} from '../types/wallet-account';
import BN from 'bn.js';
import {checkAccountId} from './SurferAccount';
import {getNonFungibleTokenContracts} from '../Api';

export const nft_metadata = async (
  account: nearAPI.Account,
  contractId: string,
): Promise<NFTtokenMetadata> => {
  let contract = new nearAPI.Contract(account, contractId, {
    viewMethods: ['nft_metadata'],
    changeMethods: [],
  });

  //@ts-ignore
  return await contract.nft_metadata({
    account_id: account.accountId,
  });
};

export const nft_supply_for_owner = async (
  account: nearAPI.Account,
  contractId: string,
): Promise<string> => {
  let contract = new nearAPI.Contract(account, contractId, {
    viewMethods: ['nft_balance_of'],
    changeMethods: [],
  });

  //@ts-ignore
  return await contract.nft_balance_of({
    account_id: account.accountId,
  });
};

/*export const nft_token = async (params: type) => {};
export const nft_token_metadata = async (params: type) => {};

export const nft_tokens_for_owner_set = async (params: type) => {};
export const nft_tokens_for_owner = async (params: type) => {};
export const nft_transfer = async (params: type) => {};
*/
export const nftContractMetadata = async (
  contractName: string,
): Promise<NFTContractMetadata> => {
  let metadata;
  try {
    metadata = await viewFunction(contractName, 'nft_metadata');
  } catch (error) {}
  return metadata;
};

/**
 * Get number of tokens owned by a given account
 * @param contractName
 * @param accountId
 * @returns
 */
export const nftSupplyForOwner = async (
  contractName: string,
  accountId: string,
): Promise<string> => {
  let supply;
  try {
    supply = await viewFunction(contractName, 'nft_supply_for_owner', {
      account_id: accountId,
    });
  } catch (error) {}
  return supply;
};

export const nftToken = async (
  contractName: string,
  tokenId: string,
): Promise<NFTtokensForOwner> => {
  let token;
  try {
    token = await viewFunction(contractName, 'nft_token', {
      token_id: tokenId,
    });
  } catch (error) {}
  return token;
};

export const nftTokenMetadata = async (
  contractName: string,
  tokenId: string,
): Promise<NFTtokenMetadata> => {
  let tokenMetadata;
  try {
    tokenMetadata = await viewFunction(contractName, 'nft_token_metadata', {
      token_id: tokenId,
    });
  } catch (error) {}
  return tokenMetadata;
};

export const nftTokensForOwner = async (
  contractName: string,
  accountId: string,
  fromIndex: number = 0,
): Promise<NFTtokensForOwner[]> => {
  let tokens = new Array<NFTtokensForOwner>();
  try {
    tokens = await viewFunction(contractName, 'nft_tokens_for_owner', {
      account_id: accountId,
      from_index: fromIndex.toString(),
    });
    for (let token of tokens) {
      let contentType = await (
        await fetch(token.metadata?.media || '')
      ).headers.get('content-type');
      if (contentType && contentType.includes('image'))
        token.mediaType = MediaType.IMAGE;
      if (contentType && contentType.includes('text'))
        token.mediaType = MediaType.THREE_D_MODEL;
      if (contentType && contentType.includes('video'))
        token.mediaType = MediaType.VIDEO;
      if (contentType && contentType.includes('audio'))
        token.mediaType = MediaType.AUDIO;
    }
  } catch (error) {}

  return tokens;
};

export const getNftTokens = async (
  accountId: string,
): Promise<WalletAccountNonFungibleToken> => {
  let collectibles: WalletAccountNonFungibleToken = new Map<string, NFTtoken>();
  let nftContracts = await getNonFungibleTokenContracts(accountId);

  // check if contract exist since near are not updating the likely nfts when contract is deleted

  for (let contractName of nftContracts) {
    if (await checkAccountId(contractName)) {
      // get contract metadata
      let contractMetadata = await nftContractMetadata(contractName);
      // get supply for account id(number of copies that the account own for a specif nfts contract)
      let supply = await nftSupplyForOwner(contractName, accountId);

      let tokensForOwner = await nftTokensForOwner(contractName, accountId);
      collectibles.set(contractName, {
        nftTokensForOwner: tokensForOwner,
        nftContractMetadata: contractMetadata,
        supplyPerContract: supply,
      });
    }
  }

  return collectibles;
};

export const nftTransafer = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
  contractId: string,
  tokenId: string,
  receiverId: string,
): Promise<nearAPI.providers.FinalExecutionOutcome> => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;
  let near = await createSignedConnection(accountFromSeedPhrase);
  let payerAccount = new nearAPI.Account(near.connection, accountId!);

  //@ts-ignore
  // prettier-ignore
  return await payerAccount.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        nearAPI.transactions.functionCall(
          'nft_transfer',
          {
            receiver_id: receiverId,
            token_id: tokenId,
          },
          new BN(NFT_TRANSFER_DEPOSIT),
          new BN(NFT_TRANSFER_DEPOSIT),
        ),
      ],
    })
  //.then(tx => console.log('signAndSendTransaction tx: ', tx))
  // .catch(error => console.log('signAndSendTransaction error: ', error));
};
