import * as Answer from '../actions/answer';
import { convertStringToArray } from "../app/utility";

export interface Character {
    letter: string;
    id: number;
}

export interface SolutionSlot {
    id: number;
    letter: string;
    entered: Character
}

export interface AnswerState {
    slots: SolutionSlot[],
    isFull: boolean;
}

const addCharacterToSlot = (character: Character, slots: SolutionSlot[]): SolutionSlot[] => {
    let added = false;
    return slots.map((slot: SolutionSlot) => {

        if (added || slot.letter === ' ') return slot;

        if (!slot.entered) {
            added = true;
            return {
                ...slot,
                entered: character
            };
        }

        return slot;
    });
};

const removeSlotById = (slot: SolutionSlot, removing: SolutionSlot): any => {
    return slot.id !== removing.id ? slot : {
        ...slot,
        entered: undefined
    };
};

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const RESET_ANSWER = 'RESET_ANSWER';
export const TOO_MANY_CHARACTERS_NOTIFICATION = 'TOO_MANY_CHARACTERS_NOTIFICATION';
export const CREATE_SLOTS = 'CREATE_SLOTS';

const defaultState: AnswerState = {
    slots: [],
    isFull: false
};

export function answerReducer(state = defaultState, action: Answer.Actions) {
    switch (action.type) {
        case ADD_CHARACTER:
            return {
                ...state,
                slots: addCharacterToSlot(action.payload, state.slots)
            };
        case REMOVE_CHARACTER:
            return {
                ...state,
                slots: state.slots.map(slot => removeSlotById(slot, action.payload)),
                isFull: false
            };
        case TOO_MANY_CHARACTERS_NOTIFICATION:
            return {
                ...state,
                isFull: true
            };
        case CREATE_SLOTS:
            return {
                ...state,
                slots: convertStringToArray(action.payload)
                        .map((item, index) => { return { id: index, letter: item, entered: undefined }})
            };
        case RESET_ANSWER:
            return defaultState;
        default:
            return state;
    }
}