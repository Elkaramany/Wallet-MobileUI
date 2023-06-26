import 'react-native-get-random-values';

import * as ed25519 from 'ed25519-hd-key';

import {AccountFromSeedPhrase} from '../types/wallet-account';
import bs58 from 'bs58';
import {getAccountId} from '../Api';
import nacl from 'tweetnacl';
import {toImplicit} from './Utils';

// import '@ethersproject/shims';









const KEY_DERIVATION_PATH = "m/44'/397'/0'";

const generateMnemonic = async () => {
  const bip39 = await import('bip39');
  return bip39.generateMnemonic();
};

const generateSeedPhrase = async (): Promise<AccountFromSeedPhrase> => {
  return await parseSeedPhrase(await generateMnemonic());
};

const normalizeSeedPhrase = (seedPhrase: string): string =>
  seedPhrase
    .trim()
    .split(/\s+/)
    .map(part => part.toLowerCase())
    .join(' ');

const parseSeedPhrase = async (
  seedPhrase: string,
  derivationPath?: string,
): Promise<AccountFromSeedPhrase> => {
  const bip39 = await import('bip39');
  const seed = await bip39.mnemonicToSeedSync(normalizeSeedPhrase(seedPhrase));
  const {key} = ed25519.derivePath(
    derivationPath || KEY_DERIVATION_PATH,
    seed.toString('hex'),
  );
  const keyPair = nacl.sign.keyPair.fromSeed(key);
  const publicKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.publicKey));
  const secretKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.secretKey));
  const accountIds = await getAccountId(publicKey);
  console.log(accountIds);
  console.log(toImplicit(publicKey));
  return accountIds.length != 0
    ? {
        publicKey: publicKey,
        secretKey: secretKey,
        seedPhrase: seedPhrase,
        implicitAccountId:
          accountIds[0].length === 64 ? toImplicit(publicKey) : undefined,
        isImplicit: accountIds[0].length === 64,
        accountId: accountIds[0].length === 64 ? undefined : accountIds[0],
      }
    : {
        publicKey: publicKey,
        secretKey: secretKey,
        seedPhrase: seedPhrase,
        implicitAccountId: toImplicit(publicKey),
        isImplicit: true,
        accountId: undefined,
      };
};

export {generateSeedPhrase, normalizeSeedPhrase, parseSeedPhrase};
