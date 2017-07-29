import { Action } from "@ngrx/store";
import {
    PLAY_CLICK, PLAY_ERROR, PLAY_MENU, PLAY_NEXT_LEVEL, PLAY_PURCHASE, PLAY_RESET,
    PLAY_WIN
} from '../reducer/sounds';

export class PlayClickAction implements Action {
    readonly type = PLAY_CLICK;
}

export class PlayErrorAction implements Action {
    readonly type = PLAY_ERROR;
}

export class PlayMenuAction implements Action {
    readonly type = PLAY_MENU;
}

export class PlayPurchaseAction implements Action {
    readonly type = PLAY_PURCHASE;
}

export class PlayWinAction implements Action {
    readonly type = PLAY_WIN;
}

export class PlayResetAction implements Action {
    readonly type = PLAY_RESET;
}

export class PlayNextLevel implements Action {
    readonly type = PLAY_NEXT_LEVEL;
}

export type Actions =
    PlayClickAction |
    PlayErrorAction |
    PlayMenuAction |
    PlayPurchaseAction |
    PlayWinAction |
    PlayResetAction |
    PlayNextLevel;

