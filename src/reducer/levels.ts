import { Action } from '@ngrx/store';
import levels from "../app/solutions";
import { Solution } from "../app/solutions";
import { Solutions } from "../app/solutions";

export interface LevelState {
    levels: Solutions,
    current: Solution
}

export const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
export const DECREMENT_LEVEL = 'DECREMENT_LEVEL';
export const RESET = 'RESET';

const defaultState: LevelState = {
    levels,
    current: levels[1]
};

export function levelReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case INCREMENT_LEVEL:
            const level: number = (state.current.level + 1);
            return {
                ...state,
                current: state.levels[level] ? state.levels[level] : state.levels[state.current.level]
             };
        default:
            return state;
    }
}