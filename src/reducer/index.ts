import * as fromAnswer from './answer';
import * as fromLevels from './levels';
import * as fromUser from './user';

export interface State {
    levels: fromLevels.LevelState;
    answer: fromAnswer.AnswerState;
    user: fromUser.UserState;
}