import { Action } from "@ngrx/store";
import {
    Character, ADD_CHARACTER, RESET_ANSWER, REMOVE_CHARACTER, TOO_MANY_CHARACTERS_NOTIFICATION,
    CREATE_SLOTS, SolutionSlot
} from "../reducer/answer";

export class AddCharacterAction implements Action {
    readonly type = ADD_CHARACTER;

    constructor(public payload: Character) { }
}

export class RemoveCharacterAction implements Action {
    readonly type = REMOVE_CHARACTER;

    constructor(public payload: SolutionSlot) { }
}

export class TooManyCharacters implements Action {
    readonly type = TOO_MANY_CHARACTERS_NOTIFICATION;
}

export class CreateSlots implements Action {
    readonly type = CREATE_SLOTS;

    constructor(public payload: string) { }
}

export class ResetAnswerAction implements Action {
    readonly type = RESET_ANSWER;
}

export type Actions =
    AddCharacterAction |
    ResetAnswerAction |
    RemoveCharacterAction |
    TooManyCharacters |
    CreateSlots