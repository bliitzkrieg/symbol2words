import { Action } from "@ngrx/store";
import { INCREMENT_LEVEL } from "../reducer/levels";

export class IncrementLevelAction implements Action {
    readonly type = INCREMENT_LEVEL;
}

export type Actions =
    IncrementLevelAction;