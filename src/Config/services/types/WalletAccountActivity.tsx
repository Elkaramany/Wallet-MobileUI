import {Direction, TxKind, TxStatus} from './Transaction';

export type WalletAccountActivity = {
  kind: TxKind;
  timestamp: number;
  hash: string;
  receiverId: string;
  signerId: string;
  status: TxStatus;
  ammount?: string;
  gasFee?: string;
  direction?: Direction;
};
