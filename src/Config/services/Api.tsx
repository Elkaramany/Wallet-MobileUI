import {Direction, TxDetails, TxKind, TxStatus} from './types/Transaction';

import {WalletAccountActivity} from './types/WalletAccountActivity';
import {config} from './Config';
import moment from 'moment';
import {parseTx} from './surfer/SurferAccount';

export const getWalletAccountTokens = async (
  accountId: string,
): Promise<Array<string>> => {
  return await fetch(
    config.helperUrl + '/account/' + accountId! + '/likelyTokens',
    {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    },
  )
    .then(res => res.json())
    .then(tokens => {
      return tokens;
    });
};

export const getCurrentUnixTime = async (): Promise<any> => {
  return await fetch(config.indexerUrl + '/timestamp', {
    method: 'GET',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then(res => res.json())
    .then(ts => {
      return ts.ts;
    })
    .catch(() => {
      return moment().unix();
    });
};

export const currentRefPrice = async (): Promise<any> => {
  return await fetch(
    config.indexerUrl + '/get-token-price?token_id=token.v2.ref-finance.near',
    {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    },
  )
    .then(res => res.json())
    .then(priceBody => {
      return priceBody.price;
    })
    .catch(() => {
      return '-';
    });
};

export const currentTokensPrice = async (ids: string): Promise<any> => {
  return await fetch(
    config.indexerUrl + '/list-token-price-by-ids?ids=' + ids,
    {
      method: 'GET',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    },
  )
    .then(res => res.json())
    .then(priceBody => {
      return priceBody;
    })
    .catch(() => {
      return [];
    });
};

/**
 * Get Named Account
 * @param implicitAccountId
 * @returns
 */
export const getAccountId = async (
  publicKey: string,
): Promise<Array<string>> => {
  return await fetch(`${config.helperUrl}/publicKey/${publicKey}/accounts`, {
    method: 'GET',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then(res => res.json())
    .then((accountId: Array<string>) => {
      return accountId;
    });
};

/**
 * list ft tokens for a given walletAccount
 * @param walletAccount
 * @returns
 */
export const getFungibleTokenContracts = async (
  accountId: string,
): Promise<string[]> => {
  return await fetch(`${config.helperUrl}/account/${accountId}/likelyTokens`, {
    method: 'GET',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then(res => res.json())
    .then((tokens: Array<string>) => {
      return [...tokens];
    });
};

/**
 * list nft tokens for a given walletAccount
 * @param walletAccount
 * @returns
 */
export const getNonFungibleTokenContracts = async (
  accountId: string,
): Promise<string[]> => {
  return await fetch(`${config.helperUrl}/account/${accountId!}/likelyNFTs`, {
    method: 'GET',
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then(res => res.json())
    .then((accountId: Array<string>) => {
      return accountId;
    });
};

/**
 * list Account Activity for a given walletAccount
 * @param walletAccount
 * @returns
 */
export const getWalletAccountActivity = async (
  accountId: string,
): Promise<WalletAccountActivity[]> => {
  let activities = new Array<WalletAccountActivity>();

  return await fetch(`${config.helperUrl}/account/${accountId}/activity`)
    .then(res => res.json())
    .then(async (tx: TxDetails[]) => {
      for (let activity of tx) {
        let parsedTx = await parseTx(activity.hash, activity.signer_id);

        let status;
        try {
          status =
            Object.keys(parsedTx.status)[0] == 'SuccessValue'
              ? TxStatus.SUCCESS_VALUE
              : TxStatus.FAILURE;
        } catch (error) {
          status = TxStatus.NOT_AVAILABLE;
        }

        activities = [
          ...activities,
          {
            kind: activity.action_kind as TxKind,
            timestamp: activity.block_timestamp,
            hash: activity.hash,
            receiverId: activity.receiver_id,
            signerId: activity.signer_id,
            status: status,
            direction:
              activity.action_kind === TxKind.TRANSFER
                ? activity.signer_id === accountId
                  ? Direction.SEND
                  : Direction.RECIEVE
                : undefined,
          },
        ];
      }
      return activities;
    });
};
