import {WalletAccount} from '../types/wallet-account';

export interface Wallet {
  accounts: Array<WalletAccount>;
  cuurrentWalletAccount?: WalletAccount;
  index: number;
}

export const addWalletAccount = (
  WalletAccount: WalletAccount,
  wallet: Wallet,
): Wallet => {
  return {
    accounts: [...wallet.accounts, WalletAccount],
    cuurrentWalletAccount: WalletAccount,
    index: wallet.index + 1,
  };
};

export const removeWalletAccount = (
  walletAccount: WalletAccount,
  wallet: Wallet,
): Wallet => {
  return walletAccount.isImplicit
    ? {
        accounts: wallet.accounts.splice(
          wallet.accounts.findIndex(
            account =>
              account.implicitAccountId === walletAccount.implicitAccountId,
          ),
          1,
        ),
        cuurrentWalletAccount:
          wallet.index === -1 ? undefined : wallet.accounts[wallet.index - 1],
        index: wallet.index === -1 ? -1 : wallet.index - 1,
      }
    : {
        accounts: wallet.accounts.splice(
          wallet.accounts.findIndex(
            account => account.accountId === walletAccount.accountId,
          ),
          1,
        ),
        cuurrentWalletAccount: walletAccount,
        index: wallet.index === -1 ? -1 : wallet.index - 1,
      };
};

export const selectWalletAccount = (wallet: Wallet, index: number): Wallet => {
  return {
    accounts: wallet.accounts,
    cuurrentWalletAccount:
      index !== -1 && index <= wallet.accounts.length
        ? wallet.accounts[index]
        : undefined,
    index: index,
  };
};
