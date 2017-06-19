import * as User from '../actions/user';

export interface UserState {
    coins: number;
}

export const USER_WON = 'USER_WON';

const defaultState: UserState = {
    coins: 100
};

export function userReducer(state = defaultState, action: User.Actions) {
    switch (action.type) {
        case USER_WON:
           return {
                coins: state.coins + action.payload.reward
           };
        default:
            return state;
    }
}