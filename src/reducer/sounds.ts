import * as Sounds from '../actions/sounds';

export interface SoundState {}

export const PLAY_CLICK = 'PLAY_CLICK';
export const PLAY_ERROR = 'PLAY_ERROR';
export const PLAY_MENU = 'PLAY_MENU';
export const PLAY_PURCHASE = 'PLAY_PURCHASE';

const defaultState: SoundState = {};

export function soundReducer(state = defaultState, action: Sounds.Actions) {
    switch (action.type) {
        case PLAY_CLICK:
            return;
        case PLAY_ERROR:
            return;
        case PLAY_MENU:
            return;
        case PLAY_PURCHASE:
            return;
        default:
            return state;
    }
}