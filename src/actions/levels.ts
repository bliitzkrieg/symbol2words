import { Action } from "@ngrx/store";
import { INCREMENT_LEVEL, SHUFFLE_KEYBOARD } from "../reducer/levels";

export class IncrementLevelAction implements Action {
    readonly type = INCREMENT_LEVEL;
}

export class ShuffleKeyboardAction implements Action {
    readonly type = SHUFFLE_KEYBOARD;
}
  
export type Actions =
    IncrementLevelAction |
    ShuffleKeyboardAction;