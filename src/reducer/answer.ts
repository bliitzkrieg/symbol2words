import * as Answer from '../actions/answer';
import { convertStringToArray } from "../app/utility";

export interface KeyboardCharacter {
    letter: string;
    id: number;
    hidden: boolean;
    isAnswer: boolean;
}

export interface SolutionSlot {
    id: number;
    letter: string;
    entered: KeyboardCharacter
    isRevealed: boolean;
}

export interface AnswerState {
    slots: SolutionSlot[],
    isFull: boolean
}

const addCharacterToSlot = (character: KeyboardCharacter, slots: SolutionSlot[]): SolutionSlot[] => {
    let added = false;
    return slots.map((slot: SolutionSlot) => {

        if (added || slot.letter === ' ') return slot;

        if (!slot.entered && !slot.isRevealed) {
            added = true;
            return {
                ...slot,
                entered: character
            };
        }

        return slot;
    });
};

const revealRandomSlot = (slots: SolutionSlot[]): SolutionSlot[] => {
    const available = slots
        .filter(slot => !slot.isRevealed)
        .filter(slot => slot.letter !== ' ');
    const randomSlot = available[Math.floor(Math.random() * available.length)];

    return slots.map(slot => slot.id === randomSlot.id ? {...slot, isRevealed: true } : slot);
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
export const REVEAL_SLOT = 'REVEAL_SLOT';
export const REVEAL_SLOT_FINISHED = 'REVEAL_SLOT_FINISHED';
export const REVEAL_SLOT_AT_INDEX = 'REVEAL_SLOT_AT_INDEX';

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
                        .map((item, index) => { return { id: index, letter: item, entered: undefined, isRevealed: false }})
            };
        case RESET_ANSWER:
            return {
                ...state,
                slots: state.slots.map(slot => { return {...slot, entered: undefined }})
            };
        case REVEAL_SLOT:
            return {
                ...state,
                slots: revealRandomSlot(state.slots)
            };
        case REVEAL_SLOT_AT_INDEX:
            return {
                ...state,
                slots: state.slots.map((slot, index) => index !== action.payload ? slot : { ...slot, isRevealed: true })
            };
        default:
            return state;
    }
}