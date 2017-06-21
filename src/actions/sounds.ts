import { Action } from "@ngrx/store";
import { PLAY_CLICK, PLAY_ERROR } from "../reducer/sounds";

export class PlayClickAction implements Action {
    readonly type = PLAY_CLICK;
}

export class PlayErrorAction implements Action {
    readonly type = PLAY_ERROR;
}

export type Actions =
    PlayClickAction |
    PlayErrorAction;