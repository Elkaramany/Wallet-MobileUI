import * as nearAPI from 'near-api-js';

import {AccountFromSeedPhrase, WalletAccount} from '../types/wallet-account';
import {
  FT_MINIMUM_STORAGE_BALANCE,
  FT_MINIMUM_STORAGE_BALANCE_LARGE,
  FT_STORAGE_DEPOSIT_GAS,
  FT_TRANSFER_DEPOSIT,
  FT_TRANSFER_GAS,
  LINKDROP_GAS,
  MIN_BALANCE_TO_CREATE,
} from '../Const';
import {FTtoken, FungibleTokenMetadata} from '../types/FT';
import {KeyPair, connect, utils} from 'near-api-js';
import {
  createFreeConnection,
  createSignedConnection,
  rpcQuery,
  sendJsonRpc,
  viewFunction,
} from '../utils/RpcUtils';
import {ftBalanceOf, ftMetadata, ftTotalSupply} from './FungibleToken';
import {generateSeedPhrase, parseSeedPhrase} from '../utils/SurferSeedPhrase';
import {
  getAccountId,
  getFungibleTokenContracts,
  getNonFungibleTokenContracts,
  getWalletAccountActivity,
} from '../Api';

import {AccessKeys} from '../types/AccessKeys';
import BN from 'bn.js';
import {NFTtokenMetadata} from '../types/NFT';
import {config} from '../Config';
import {getNftTokens} from './NonFungibleToken';

export async function validateSeedPhrase(phrase: string) {
  const bip39 = await import('bip39');
  return bip39.validateMnemonic(phrase);
}

/**
 * Create Unfunded Account
 * @returns
 */
export async function createImplicitAccount(): Promise<AccountFromSeedPhrase> {
  return await generateSeedPhrase();
}

/**
 * Restore Account From Seed Phrase
 * @param seedPhrase
 * @returns
 */
export async function importAccountFromSeedPhrase(
  seedPhrase: string,
): Promise<AccountFromSeedPhrase> {
  return await parseSeedPhrase(seedPhrase);
}

/**
 * Check if accountId is available
 * @param accountId
 * @returns
 */
export const checkAccountId = async (accountId: string): Promise<boolean> => {
  return await rpcQuery(accountId, 'view_account')
    .then(() => {
      return true;
    })
    .catch((err: any) => {
      if (err.toString().includes('does not exist while viewing')) return false;
      return true;
    });
};

// TODO finish addLocalKeyAndFinishSetup
export const createNewAccountWithNearContract = async (
  fundingAccountFromSeedPhrase: AccountFromSeedPhrase,
  newAccountId: string,
  newAccountFromSeedPhrase: AccountFromSeedPhrase,
): Promise<nearAPI.providers.FinalExecutionOutcome> => {
  let near = await createSignedConnection(fundingAccountFromSeedPhrase);
  let account = new nearAPI.Account(
    near.connection,
    fundingAccountFromSeedPhrase.accountId!,
  );

  return await account.functionCall({
    contractId: config.ACCOUNT_ID_SUFFIX,
    methodName: 'create_account',
    args: {
      new_account_id: newAccountId,
      new_public_key: newAccountFromSeedPhrase.publicKey
        .toString()
        .replace(/^ed25519:/, ''),
    },
    gas: new BN(LINKDROP_GAS),
    attachedDeposit: new BN(MIN_BALANCE_TO_CREATE!),
  });
};

/**
 * list access keys for a given account
 * @param accountId
 */
export const getWalletAccountAccessKeys = async (
  accountId: string,
): Promise<AccessKeys[]> => {
  let accountAccessKeys = new Array<AccessKeys>();

  let near = await createFreeConnection();

  return (await near.account(accountId!))
    .getAccessKeys()
    .then(accessKeys => {
      for (let key of accessKeys)
        typeof key.access_key.permission === 'string'
          ? (accountAccessKeys = [
              ...accountAccessKeys,
              {
                accessKey: {
                  nonce: key.access_key.nonce,
                  permission: key.access_key.permission,
                },
                publicKey: key.public_key,
              },
            ])
          : [];
      return accountAccessKeys;
    })
    .catch(() => {
      return new Array<AccessKeys>();
    });
};

export const getFtTokens = async (
  accountId: string,
): Promise<Array<FTtoken>> => {
  let fTtokens = new Array<FTtoken>();
  let ftContracts = await getFungibleTokenContracts(accountId!);

  const near = await createFreeConnection();
  const payerWalletAccount = new nearAPI.Account(near.connection, accountId!);

  for (let ftContract of ftContracts) {
    let totalSupply = await ftTotalSupply(payerWalletAccount, ftContract);
    let metadata = await ftMetadata(payerWalletAccount, ftContract);
    let balance = await ftBalanceOf(payerWalletAccount, ftContract);
    fTtokens = [
      ...fTtokens,
      {
        tokenId: metadata.symbol,
        metadata: metadata,
        price: 'string',
        balance: balance,
        totalSupply: totalSupply,
      },
    ];
  }
  return fTtokens;
};

export const parseNonFungibleTokenForWalletAccount = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
) => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;

  let nftTokens = await getNonFungibleTokenContracts(accountId!);

  const nftMethodOptions = {
    viewMethods: ['nft_total_supply', 'nft_metadata'],
    changeMethods: [],
  };
  const near = await createSignedConnection(accountFromSeedPhrase);
  const payerWalletAccount = new nearAPI.Account(near.connection, accountId!);

  for (let nftToken of nftTokens) {
    let contract = new nearAPI.Contract(
      payerWalletAccount,
      nftToken,
      nftMethodOptions,
    );

    const nonFungibleTokenMetadata: NFTtokenMetadata =
      //@ts-ignore
      await contract.nft_metadata({
        accountId: accountId,
      });
    console.log(
      'nonFungibleTokenMetadata for ',
      nftToken,
      nonFungibleTokenMetadata,
    );
  }
};

/**
 * parse a given tx
 * @param hash
 * @param signerId
 * @returns
 */
export const parseTx = async (hash: string, signerId: string): Promise<any> => {
  return await sendJsonRpc('tx', [hash, signerId])
    .then((data: any) => {
      return data;
    })
    .catch(() => {
      return undefined;
    });
};

export const sendMoneyForNear = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
  destinationId: string,
  amount: string,
): Promise<nearAPI.providers.FinalExecutionOutcome> => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;

  let near = await createSignedConnection(accountFromSeedPhrase);
  let yoctoAmount = utils.format.parseNearAmount(amount)!;

  return (await near.account(accountId!)).sendMoney(
    destinationId,
    new BN(yoctoAmount),
  );
};

export const getStorageBalance = async (
  contractName: string,
  accountId: string,
) => {
  return await viewFunction(contractName, 'storage_balance_of', {
    account_id: accountId,
  });
};

export const isStorageBalanceAvailable = async (
  contractName: string,
  accountId: string,
): Promise<boolean> => {
  const storageBalance = await getStorageBalance(contractName, accountId);
  return storageBalance?.total !== undefined;
};

export const sendMoneyForFungibleToken: any = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
  destinationAccountId: string,
  contractName: string,
  amount: string,
  memo: string = 'Happy Surfer Wallet Transfer',
) => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;

  let near = await createSignedConnection(accountFromSeedPhrase);
  let payerAccount = new nearAPI.Account(near.connection, accountId!);
  const storageAvailable = await isStorageBalanceAvailable(
    contractName,
    destinationAccountId,
  );
  if (!storageAvailable)
    transferStorageDeposit(
      accountFromSeedPhrase,
      contractName,
      destinationAccountId,
      new BN(FT_MINIMUM_STORAGE_BALANCE),
    )
      .then(tx => {
        console.log('transferStorageDeposit MINIMUM tx: ', tx);
      })
      .catch((error: string) => {
        if (error.toString().includes('attached deposit is less than')) {
          transferStorageDeposit(
            accountFromSeedPhrase,
            contractName,
            destinationAccountId,
            new BN(FT_MINIMUM_STORAGE_BALANCE_LARGE),
          )
            .then(tx => {
              console.log('transferStorageDeposit LARGE tx: ', tx);
            })
            .catch(error => console.log(error));
        }
      });

  //@ts-ignore
  // prettier-ignore
  payerAccount.signAndSendTransaction({
      receiverId: contractName,
      actions: [
        nearAPI.transactions.functionCall(
          'ft_transfer',
          {
            amount,
            memo: memo,
            receiver_id: destinationAccountId,
          },
          new BN(FT_TRANSFER_GAS),
          new BN(FT_TRANSFER_DEPOSIT),
        ),
      ],
    })
    .then(tx => console.log('signAndSendTransaction tx: ', tx))
    .catch(error => console.log('signAndSendTransaction error: ', error));
};

export const sendMoneyForNonFungibleToken: any = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
  destinationId: string,
  contractId: string,
) => {
  const near = await createSignedConnection(accountFromSeedPhrase);
};

export const transferStorageDeposit = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
  contractName: string,
  receiverId: string,
  storageDepositAmount: BN,
): Promise<nearAPI.providers.FinalExecutionOutcome> => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;

  let near = await createSignedConnection(accountFromSeedPhrase);
  let payerAccount = new nearAPI.Account(near.connection, accountId!);
  //@ts-ignore
  return await payerAccount.signAndSendTransaction({
    receiverId: contractName,
    actions: [
      nearAPI.transactions.functionCall(
        'storage_deposit',
        {
          account_id: receiverId,
          registration_only: true,
        },
        new BN(FT_STORAGE_DEPOSIT_GAS),
        storageDepositAmount,
      ),
    ],
  });
};

export const getWalletAccountData = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
): Promise<WalletAccount> => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;

  return {
    account: accountFromSeedPhrase,
    signerKeys: Array<KeyPair>(),
    accessKeys: await getWalletAccountAccessKeys(accountId!),
    activities: await getWalletAccountActivity(accountId!),
    tokens: await getFtTokens(accountId!),
    collectibles: await getNftTokens(accountId!),
  };
};
