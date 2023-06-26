export type TxDetails = {
  action_index: number;
  action_kind: string;
  args: object;
  block_hash: string;
  block_timestamp: number;
  hash: string;
  receiver_id: string;
  signer_id: string;
};

export enum Direction {
  SEND = 'send',
  RECIEVE = 'recieve',
}

export enum TxStatus {
  SUCCESS_VALUE = 'SuccessValue',
  FAILURE = 'Failure',
  NOT_AVAILABLE = 'notAvailable',
}

export enum TxKind {
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  FUNCTION_CALL = 'FUNCTION_CALL',
  TRANSFER = 'TRANSFER',
  STAKE = 'STAKE',
  ADD_KEY = 'ADD_KEY',
  DELETE_KEY = 'DELETE_KEY',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
}
