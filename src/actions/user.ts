import { Action } from "@ngrx/store";
import { USER_WON, TOGGLE_MUTE } from "../reducer/user";
import { Level } from "../app/levels";

export class UserWonAction implements Action {
    readonly type = USER_WON;

    constructor(public payload: Level) { }
}

export class ToggleMuteAction implements Action {
    readonly type = TOGGLE_MUTE;
}

export type Actions =
    UserWonAction |
    ToggleMuteAction;