import * as fromAnswer from './answer';
import * as fromLevels from './levels';

export interface State {
    levels: fromLevels.LevelState;
    answer: fromAnswer.AnswerState;
}