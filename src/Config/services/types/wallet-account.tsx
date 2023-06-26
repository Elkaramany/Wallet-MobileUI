import {FTtoken, WalletAccountFungibleToken} from './FT';

import {AccessKeys} from './AccessKeys';
import {KeyPair} from 'near-api-js';
import {WalletAccountActivity} from './WalletAccountActivity';
import {WalletAccountNonFungibleToken} from './NFT';

export interface WalletAccount {
  account?: AccountFromSeedPhrase;
  signerKeys?: Array<KeyPair>;
  accessKeys?: Array<AccessKeys>;
  activities?: Array<WalletAccountActivity>;
  tokens?: Array<FTtoken>;
  collectibles?: WalletAccountNonFungibleToken;
}

export type AccountFromSeedPhrase = {
  publicKey: string;
  secretKey: string;
  seedPhrase: string;
  isImplicit: Boolean;
  implicitAccountId?: string;
  accountId?: string;
};
