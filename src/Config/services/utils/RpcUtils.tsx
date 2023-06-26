import * as nearAPI from 'near-api-js';

import {AccountFromSeedPhrase, WalletAccount} from '../types/wallet-account';

import {AccountView} from 'near-api-js/lib/providers/provider';
import {config} from '../Config';
import {rpcProvider} from '../Const';

export const rpcQuery = async (
  accountId: string,
  request_type: string,
): Promise<any> => {
  return await rpcProvider.query({
    request_type: request_type,
    finality: 'final',
    account_id: accountId,
  });
};

export const sendJsonRpc = async (
  method: string,
  args: object,
): Promise<any> => {
  return await rpcProvider.sendJsonRpc(method, args);
};

export const viewFunction = async (
  contractId: string,
  methodName: string,
  args?: object,
) => {
  let near = await createFreeConnection();
  return await (
    await near.account('dontcare')
  ).viewFunction(contractId, methodName, args);
};

export const createSignedConnection = async (
  accountFromSeedPhrase: AccountFromSeedPhrase,
): Promise<nearAPI.Near> => {
  let accountId = accountFromSeedPhrase.isImplicit
    ? accountFromSeedPhrase.implicitAccountId
    : accountFromSeedPhrase.accountId;
  let keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  await keyStore.setKey(
    config.networkId,
    accountId!,
    nearAPI.KeyPair.fromString(
      accountFromSeedPhrase.secretKey.replace('ed25519:', ''),
    ),
  );
  return nearAPI.connect({
    keyStore: keyStore,
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
    helperUrl: config.helperUrl,
    headers: {},
  });
};

export const createFreeConnection = async (): Promise<nearAPI.Near> => {
  return nearAPI.connect({
    keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
    helperUrl: config.helperUrl,
    headers: {},
  });
};

export async function viewAccount(): Promise<AccountView> {
  return await rpcProvider.query({
    request_type: 'view_account',
    finality: 'final',
    account_id:
      'e68341016e93422df971bc8cb84758cd275022237852014b0a58ed19d45b5056',
  });
}
/*export async function getAcocuntState(
  accountId: string,
): Promise<AccountView> {
  const connection = Connection.fromConfig({
    networkId: conf.networkId,
    provider: {
      type: 'JsonRpcProvider',
      args: {url: conf.nodeUrl + '/'},
    },
    signer: conf.keyStore,
  });

  const account = new Account(connection, accountId);
  return account.state();
}*/
