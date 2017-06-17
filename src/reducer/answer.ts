import * as Answer from '../actions/answer';

export interface Character {
    letter: string;
    id: number;
}

export interface AnswerState {
    characters: Character[]
}

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const RESET_ANSWER = 'RESET_ANSWER';

const defaultState: AnswerState = {
    characters: []
};

export function answerReducer(state = defaultState, action: Answer.Actions) {
    switch (action.type) {
        case ADD_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, action.payload]
            };
        case REMOVE_CHARACTER:
            return {
                ...state,
                characters: state.characters.filter(char => char.id !== action.payload.id)
            };
        case RESET_ANSWER:
            return defaultState;
        default:
            return state;
    }
}