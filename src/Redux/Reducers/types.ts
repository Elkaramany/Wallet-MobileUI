import { AccessKeys } from "../../Config/services/types/AccessKeys"
import { FTtoken } from "../../Config/services/types/FT"
import { WalletAccountNonFungibleToken } from "../../Config/services/types/NFT"
import { AccountFromSeedPhrase, } from "../../Config/services/types/wallet-account"
import { WalletAccountActivity } from "../../Config/services/types/WalletAccountActivity"

export type ACTION = {
    type: string
    payload: any
}

export type AUTHREDUCER = {
    token: boolean
    seedPhrase: string
    password: string
    confirmPassword: string
    fromImport: boolean
    fromHome: boolean
    authLoading: boolean
    biometrics: null | string
}

export type NETWORK = {
    id: number,
    name: string,
    type: string,
    color: string,
    selected: boolean
}

export type ACCOUNTS = {
    index: number
    accounts: AccountFromSeedPhrase[]
}

export type TOKEN = {
    id: number
    img: string
    name: string
    amount: string
    total: number
    gain: number
}

export type SEND = {
    from: any
    to: any
    amount: number
    coin: string
    total: number
    fee: number
}

export type ACCOUNTREDUCER = {
    networks: any
    accounts: ACCOUNTS
    accFromSeedPhrase: AccountFromSeedPhrase | null
    tokens: FTtoken[]
    collectibles: WalletAccountNonFungibleToken | null
    activities: WalletAccountActivity[]
    accessKeys: AccessKeys[]
    send: any
}