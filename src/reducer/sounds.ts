import * as Sounds from '../actions/sounds';

export interface SoundState {}

export const PLAY_CLICK = 'PLAY_CLICK';
export const PLAY_ERROR = 'PLAY_ERROR';
export const PLAY_MENU = 'PLAY_MENU';
export const PLAY_PURCHASE = 'PLAY_PURCHASE';
export const PLAY_WIN = 'PLAY_WIN';
export const PLAY_RESET = 'PLAY_RESET';
export const PLAY_NEXT_LEVEL = 'PLAY_NEXT_LEVEL';

const defaultState: SoundState = {};

export function soundReducer(state = defaultState, action: Sounds.Actions) {
    switch (action.type) {
        case PLAY_CLICK:
        case PLAY_ERROR:
        case PLAY_MENU:
        case PLAY_PURCHASE:
        case PLAY_WIN:
        case PLAY_RESET:
        case PLAY_NEXT_LEVEL:
            return;
        default:
            return state;
    }
}