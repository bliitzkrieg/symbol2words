import { Component } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Store } from "@ngrx/store";
import { LevelState } from "../../reducer/levels";
import { Character, SolutionSlot } from "../../reducer/answer";
import * as fromRoot from '../../reducer';
import * as answer from '../../actions/answer';
import * as user from '../../actions/user';
import * as levelActions from '../../actions/levels';
import { Level } from "../../app/levels";
import { UserState } from "../../reducer/user";
import { IncrementLevelAction } from "../../actions/levels";
import { ResetAnswerAction } from "../../actions/answer";
import { CreateSlots } from "../../actions/answer";
import { PlayClickAction, PlayErrorAction, PlayMenuAction } from "../../actions/sounds";
import { OpenHintsAction } from "../../actions/user";
import { OpenSettingsAction } from "../../actions/user";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public levels: Observable<LevelState>;
    public answer: Observable<Character[]>;
    public user: Observable<UserState>;
    public onClickAdd$ = new Subject<any>();

    constructor(private store: Store<fromRoot.State>)  {
        this.levels = store.select('levels');
        this.answer = store.select('answer');
        this.user = store.select('user');

        this.onClickAdd$
            .withLatestFrom(store)
            .subscribe(([data, state]) => {
                const answerWithoutSpaces = state.levels.current.answer.replace(/\s/g, '');
                const slotsAnswer = state.answer.slots.filter(item => item.entered);

                answerWithoutSpaces.length === slotsAnswer.length ?
                    this.TooManyCharacters() : this.addCharacter(data.character);

                answerWithoutSpaces.length === (slotsAnswer.length + 1) ?
                    this.checkAnswer(answerWithoutSpaces, slotsAnswer, data.character, state.levels.current) : () => {};
            });

        this.levels.subscribe((state: LevelState) => {
            this.store.dispatch(new CreateSlots(state.current.answer));
        }).unsubscribe();
    }

    public removeCharacterFromAnswer(slot: SolutionSlot): void {
        this.store.dispatch(new PlayClickAction());
        this.store.dispatch(new answer.RemoveCharacterAction(slot));
    }

    public openHints(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new OpenHintsAction());
    }
    public openSettings(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new OpenSettingsAction());
    }

    public resetSolution(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new answer.ResetAnswerAction());
    }

    public shuffleKeyboard(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new levelActions.ShuffleKeyboardAction());
    }

    private TooManyCharacters(): void {
        this.store.dispatch(new PlayErrorAction());
        this.store.dispatch(new answer.TooManyCharacters())
    }

    private addCharacter(character: Character): void {
        this.store.dispatch(new PlayClickAction());
        this.store.dispatch(new answer.AddCharacterAction(character));
    }

    private checkAnswer(answer: string, slots: SolutionSlot[], character: Character, level: Level): void {
        const entered = slots.map(item => item.entered.letter).join('') + character.letter;

        if(entered === answer) {
            this.store.dispatch(new user.UserWonAction(level));

            setTimeout(() => {
                this.store.dispatch(new ResetAnswerAction());
                this.store.dispatch(new IncrementLevelAction());

                this.levels.subscribe((state: LevelState) => {
                    this.store.dispatch(new CreateSlots(state.current.answer));
                }).unsubscribe();
            }, 1000);
        } else {
            this.TooManyCharacters();
        }
    }

}
