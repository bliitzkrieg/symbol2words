import levels from "../app/levels";
import { Level, Levels } from "../app/levels";
import { Character } from "./answer";
import { convertStringToArray, MAX_CHARACTERS, buildRandomCharacters, shuffleArray } from "../app/utility";
import * as LevelsActions from '../actions/levels';

export interface LevelState {
    levels: Levels,
    current: Level,
    keyboard: Character[]
}

export const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
export const SHUFFLE_KEYBOARD = 'SHUFFLE_KEYBOARD';

const buildKeyboard = (answer: string) => {
    const characters = convertStringToArray(answer)
        .filter(char => char != ' ');
    const extras = buildRandomCharacters(MAX_CHARACTERS - characters.length);

    return shuffleArray([...characters, ...convertStringToArray(extras)]).map((letter, index) => {
        return {
            letter,
            id: index
        };
    });
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
        default:
            return state;
    }
}