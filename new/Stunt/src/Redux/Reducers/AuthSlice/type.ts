import Payload from "@ReduxTypes"

export interface AuthProps {
    user: GOOGLEUSER | null
    snakeHighscore: number
    hamsterHighscore: number
    shooterHighscore: number
    flappyBirdHighscore: number
}

interface GOOGLEUSER {
    familyName: string
    givenName: string
    email: string
    id: string
    name: string
    photo: string
}

export interface CredentialInAction {
    type: 'Credential_In',
    payload: Payload
}

export interface ResetAction {
    type: 'RESET'
}

export type AuthActions = CredentialInAction | ResetAction;
