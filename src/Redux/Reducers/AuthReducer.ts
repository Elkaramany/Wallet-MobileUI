import { ACTION, AUTHREDUCER } from './types'

const INITIAL_STATE: AUTHREDUCER = {
  token: false,
  seedPhrase: '',
  password: '',
  confirmPassword: '',
  fromImport: false,
  fromHome: false,
  authLoading: false,
  biometrics: null
}

export default (state = INITIAL_STATE, action: ACTION) => {
  switch (action.type) {
    case 'Credential_In':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'RESET':
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}
