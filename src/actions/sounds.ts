import { Action } from "@ngrx/store";
import { PLAY_CLICK, PLAY_ERROR, PLAY_MENU, PLAY_PURCHASE } from "../reducer/sounds";

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

export type Actions =
    PlayClickAction |
    PlayErrorAction |
    PlayMenuAction |
    PlayPurchaseAction;

