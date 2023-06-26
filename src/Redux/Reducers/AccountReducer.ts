import { ACTION, ACCOUNTREDUCER } from './types'

import { DUMMY_NETWORKS } from './DUMMYDATA'

const INITIAL_STATE: ACCOUNTREDUCER = {
    networks: DUMMY_NETWORKS,
    accounts: { index: -1, accounts: [] },
    accFromSeedPhrase: null,
    tokens: [],
    collectibles: null,
    activities: [],
    accessKeys: [],
    send: {
        from: "",
        to: "",
        amount: 0,
        coin: "",
        total: 0,
        fee: 0
    }
}

export default (state = INITIAL_STATE, action: ACTION) => {
    switch (action.type) {
        case 'Credential_In_Account':
            return { ...state, [action.payload.prop]: action.payload.value }
        case 'RESET':
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}
