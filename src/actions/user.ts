import { Action } from "@ngrx/store";
import { USER_WON, TOGGLE_MUTE, OPEN_SETTINGS, OPEN_HINTS } from "../reducer/user";
import { Level } from "../app/levels";

export class UserWonAction implements Action {
    readonly type = USER_WON;

    constructor(public payload: Level) { }
}

export class ToggleMuteAction implements Action {
    readonly type = TOGGLE_MUTE;
}

export class OpenSettingsAction implements Action {
    readonly type = OPEN_SETTINGS;
}

export class OpenHintsAction implements Action {
    readonly type = OPEN_HINTS;
}

export type Actions =
    UserWonAction |
    ToggleMuteAction |
    OpenSettingsAction |
    OpenHintsAction;