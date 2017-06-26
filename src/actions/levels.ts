import { Action } from "@ngrx/store";
import {
    INCREMENT_LEVEL, SHUFFLE_KEYBOARD, HIDE_LETTER, RESET_GAME, GAME_RESET,
    RESET_GAME_PROMPT
} from "../reducer/levels";
import { ViewController } from "ionic-angular/index";

export class IncrementLevelAction implements Action {
    readonly type = INCREMENT_LEVEL;
}

export class ShuffleKeyboardAction implements Action {
    readonly type = SHUFFLE_KEYBOARD;
}

export class HideCharacterAction implements Action {
    readonly type = HIDE_LETTER;
}

export class ResetGamePromptAction implements Action {
    readonly type = RESET_GAME_PROMPT;
}

export class ResetGameAction implements Action {
    readonly type = RESET_GAME;
}

export class GameResetAction implements Action {
    readonly type = GAME_RESET;
}

export type Actions =
    IncrementLevelAction |
    ShuffleKeyboardAction |
    HideCharacterAction |
    ResetGamePromptAction |
    ResetGameAction |
    GameResetAction;