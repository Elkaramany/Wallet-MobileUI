import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Payload from '@ReduxTypes';
import { AuthProps } from './type';

const INITIAL_STATE: AuthProps = {
    user: null,
    snakeHighscore: 0,
    hamsterHighscore: 0,
    shooterHighscore: 0,
    flappyBirdHighscore: 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        credentialIn: (state, action: PayloadAction<Payload>) => {
            const { prop, value } = action.payload;
            return { ...state, [prop]: value };
        },
        reset: () => INITIAL_STATE,
    },
});

export const { credentialIn, reset } = authSlice.actions;

export default authSlice.reducer;