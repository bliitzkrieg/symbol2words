import { Action } from "@ngrx/store";
import {
    USER_WON, TOGGLE_MUTE, OPEN_SETTINGS, OPEN_HINTS, EMAIL_SUPPORT,
    USER_PURCHASE, INITIALIZE_APP, SET_USER, UserState
} from '../reducer/user';
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

export class EmailSupportAction implements Action {
    readonly type = EMAIL_SUPPORT;
}

export class PurchaseAction implements Action {
    readonly type = USER_PURCHASE;

    constructor(public payload: number) { }
}

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public payload: UserState) {}
}

export class InitializeAppAction implements Action {
    readonly type = INITIALIZE_APP;
}

export type Actions =
    UserWonAction |
    ToggleMuteAction |
    OpenSettingsAction |
    OpenHintsAction |
    EmailSupportAction |
    PurchaseAction |
    InitializeAppAction |
    SetUserAction;