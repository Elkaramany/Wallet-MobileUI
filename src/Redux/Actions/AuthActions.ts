import {
  getFtTokens,
  getWalletAccountData,
  importAccountFromSeedPhrase,
  validateSeedPhrase,
} from '../../Config/services/surfer/SurferAccount';
import { generateSeedPhrase } from '../../Config/services/utils/SurferSeedPhrase';

import { CredentialAccount, RefreshTokens } from './AccountActions';

interface Cred {
  prop: string;
  value: any;
}

export const Credential = (dispatch: any, cred: Cred) => {
  dispatch({
    type: 'Credential_In',
    payload: { prop: cred.prop, value: cred.value },
  });
};

export const VeirySeedPhraseFormat = async (dispatch: any, phrase: string) => {
  SwitchLoader(dispatch, true);
  const val = await validateSeedPhrase(phrase);
  SwitchLoader(dispatch, false);
  return val;
};

export const GetAccountData = async (dispatch: any, phrase: string, newAccount = false, existingAccounts = []) => {
  SwitchLoader(dispatch, true);
  let importedAccFromSeedPhrase;

  if (newAccount && existingAccounts) {
    const newSeedPhrase = await generateSeedPhrase();
    importedAccFromSeedPhrase = await importAccountFromSeedPhrase(newSeedPhrase.seedPhrase);
    const newAccounts = [...existingAccounts, { ...importedAccFromSeedPhrase, name: phrase }]
    CredentialAccount(dispatch, { prop: 'accounts', value: { index: existingAccounts.length, accounts: newAccounts } });
  } else {
    importedAccFromSeedPhrase = await importAccountFromSeedPhrase(phrase);
    CredentialAccount(dispatch, { prop: 'accounts', value: { index: 0, accounts: [{ ...importedAccFromSeedPhrase, name: "Main" }] } });
    //To order navigation to switch to the main App UI away from Auth
    Credential(dispatch, { prop: 'token', value: true });
  }

  CredentialAccount(dispatch, { prop: 'accFromSeedPhrase', value: importedAccFromSeedPhrase });

  SwitchLoader(dispatch, false);
};

export const ResetAuthReducer = (dispatch: any) => {
  dispatch({ type: 'RESET' });
};

const SwitchLoader = (dispatch: any, value: boolean) => {
  Credential(dispatch, { prop: 'authLoading', value });
};
