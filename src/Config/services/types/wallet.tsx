import {WalletAccount} from './wallet-account';

/*export interface Wallet {
  accounts: Array<WalletAccount>;
  activeAccount: WalletAccount;
}*/

export type Wallet = Map<string, WalletAccount>;
