import * as User from '../actions/user';

export interface UserState {
    coins: number;
    isMuted: boolean
}

export const USER_WON = 'USER_WON';
export const TOGGLE_MUTE = 'TOGGLE_MUTE';
export const OPEN_HINTS = 'OPEN_HINTS';
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const EMAIL_SUPPORT = 'EMAIL_SUPPORT';
export const USER_PURCHASE = 'USER_PURCHASE';

const defaultState: UserState = {
    coins: 5000,
    isMuted: false
};

export function userReducer(state = defaultState, action: User.Actions) {
    switch (action.type) {
        case USER_WON:
           return {
                ...state,
                coins: state.coins + action.payload.reward
           };
        case TOGGLE_MUTE:
            return {
                ...state,
                isMuted: !state.isMuted
            };
        case USER_PURCHASE:
            return {
                ...state,
                coins: state.coins - action.payload
            };
        case OPEN_HINTS:
            return state;
        case OPEN_SETTINGS:
            return state;
        default:
            return state;
    }
}