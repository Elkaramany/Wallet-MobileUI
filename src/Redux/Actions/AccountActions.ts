import { getWalletAccountActivity } from "../../Config/services/Api"
import { getNftTokens } from "../../Config/services/surfer/NonFungibleToken"
import { getFtTokens, getWalletAccountAccessKeys } from "../../Config/services/surfer/SurferAccount"
import { AccountFromSeedPhrase } from "../../Config/services/types/wallet-account"

interface Cred {
    prop: string
    value: any
}


export const CredentialAccount = (dispatch: any, cred: Cred) => {
    dispatch({
        type: 'Credential_In_Account',
        payload: { prop: cred.prop, value: cred.value }
    })
}

export const RefreshTokens = async (dispatch: any, importAccountFromSeedPhrase: AccountFromSeedPhrase) => {
    let tokens = await getFtTokens(importAccountFromSeedPhrase.accountId!);

    CredentialAccount(dispatch, { prop: 'tokens', value: tokens });
}

export const RefreshCollectibles = async (dispatch: any, importAccountFromSeedPhrase: AccountFromSeedPhrase) => {
    let collectibles = await getNftTokens(importAccountFromSeedPhrase.accountId!);
    
    CredentialAccount(dispatch, { prop: 'collectibles', value: collectibles });
}

export const RefreshActivities = async (dispatch: any, importAccountFromSeedPhrase: AccountFromSeedPhrase) => {
    let activities = await getWalletAccountActivity(importAccountFromSeedPhrase.accountId!);

    CredentialAccount(dispatch, { prop: 'activities', value: activities });
}

export const RefreshAccessKeys = async (dispatch: any, importAccountFromSeedPhrase: AccountFromSeedPhrase) => {
    let accessKeys = await getWalletAccountAccessKeys(importAccountFromSeedPhrase.accountId!);

    CredentialAccount(dispatch, { prop: 'accessKeys', value: accessKeys });
}