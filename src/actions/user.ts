import { Action } from "@ngrx/store";
import { USER_WON } from "../reducer/user";
import { Level } from "../app/levels";

export class UserWonAction implements Action {
    readonly type = USER_WON;

    constructor(public payload: Level) { }
}

export type Actions =
    UserWonAction;