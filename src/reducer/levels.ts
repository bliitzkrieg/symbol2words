import levels from "../app/levels";
import { Level, Levels } from "../app/levels";
import { KeyboardCharacter } from "./answer";
import { convertStringToArray, MAX_CHARACTERS, buildRandomCharacters, shuffleArray } from "../app/utility";
import * as LevelsActions from '../actions/levels';

export interface LevelState {
    levels: Levels,
    current: Level,
    keyboard: KeyboardCharacter[]
}

export const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
export const SHUFFLE_KEYBOARD = 'SHUFFLE_KEYBOARD';
export const HIDE_LETTER = 'HIDE_LETTER';
export const RESET_GAME = 'RESET_GAME';
export const GAME_RESET = 'GAME_RESET';
export const RESET_GAME_PROMPT = 'RESET_GAME_PROMPT';

export const getVisibleKeys = (keyboard: KeyboardCharacter[]): KeyboardCharacter[] => {
    return keyboard.filter(character => !character.hidden && !character.isAnswer);
};

const buildKeyboard = (answer: string): KeyboardCharacter[] => {
    const answerCharacters = convertStringToArray(answer)
        .filter(letter => letter != ' ')
        .map(letter => {
           return {
               letter,
               isAnswer: true
           };
        });

    const extraString = buildRandomCharacters(MAX_CHARACTERS - answerCharacters.length);
    const extras = convertStringToArray(extraString)
        .map(letter => {
            return {
                letter,
                isAnswer: false
            };
        });

    return shuffleArray([...answerCharacters, ...extras]).map(({ letter, isAnswer }, index) => {
        return {
            id: index,
            hidden: false,
            letter,
            isAnswer
        };
    });
};

const hideRandomCharacter = (keyboard: KeyboardCharacter[]): KeyboardCharacter[] => {
    const visibleKeyboard = getVisibleKeys(keyboard);

    if (visibleKeyboard.length === 0) {
        return keyboard;
    }

    const randomCharacter = visibleKeyboard[Math.floor(Math.random() * visibleKeyboard.length)];
    return keyboard.map(character => character.id === randomCharacter.id ? {...character, hidden: true } : character);
};

const defaultState: LevelState = {
    levels,
    current: levels[1],
    keyboard: buildKeyboard(levels[1].answer)
};

export function levelReducer(state = defaultState, action: LevelsActions.Actions) {
    switch (action.type) {
        case INCREMENT_LEVEL:
            const level: number = (state.current.level + 1);
            const current = state.levels[level] ? state.levels[level] : state.levels[state.current.level];
            return {
                ...state,
                current,
                keyboard: buildKeyboard(current.answer)
             };
        case SHUFFLE_KEYBOARD:
            return {
                ...state,
                keyboard: shuffleArray(state.keyboard)
            };
        case HIDE_LETTER:
            return {
                ...state,
                keyboard: hideRandomCharacter(state.keyboard)
            };
        case RESET_GAME:
            return defaultState;
        default:
            return state;
    }
}