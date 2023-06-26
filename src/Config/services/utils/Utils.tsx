import {decode} from 'bs58';

export const toImplicit = (publicKey: string) => {
  return decode(publicKey.replace('ed25519:', '')).toString('hex');
};

export const parseBase64 = (base64String: string) => {
  return JSON.parse(Buffer.from(base64String, 'base64').toString());
};
