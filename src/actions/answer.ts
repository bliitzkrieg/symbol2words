import { Action } from "@ngrx/store";
import { Character, ADD_CHARACTER, RESET_ANSWER, REMOVE_CHARACTER } from "../reducer/answer";

export class AddCharacterAction implements Action {
    readonly type = ADD_CHARACTER;

    constructor(public payload: Character) { }
}

export class RemoveCharacterAction implements Action {
    readonly type = REMOVE_CHARACTER;

    constructor(public payload: Character) { }
}

export class ResetAnswerAction implements Action {
    readonly type = RESET_ANSWER;

    constructor(public payload: any) { }
}

export type Actions = AddCharacterAction | ResetAnswerAction | RemoveCharacterAction