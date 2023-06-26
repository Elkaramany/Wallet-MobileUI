import * as nearAPI from 'near-api-js';

import {InMemoryKeyStore} from 'near-api-js/lib/key_stores';

export interface SurferConf {
  keyStore: InMemoryKeyStore;
  networkId: string;
  nodeUrl: string;
  helperUrl: string;
  headers: {};
}

export function getConnection(conf: SurferConf): nearAPI.Connection {
  return nearAPI.Connection.fromConfig({
    networkId: conf.networkId,
    provider: {
      type: 'JsonRpcProvider',
      args: {url: conf.nodeUrl + '/'},
    },
    signer: conf.keyStore,
  });
}
