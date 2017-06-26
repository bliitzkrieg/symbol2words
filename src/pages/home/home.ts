import { Component } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Store } from "@ngrx/store";
import { LevelState } from "../../reducer/levels";
import { KeyboardCharacter, SolutionSlot } from "../../reducer/answer";
import * as fromRoot from '../../reducer';
import * as answer from '../../actions/answer';
import { Level } from "../../app/levels";
import { UserState } from "../../reducer/user";
import { IncrementLevelAction } from "../../actions/levels";
import { ResetAnswerAction } from "../../actions/answer";
import { CreateSlots } from "../../actions/answer";
import { PlayClickAction, PlayErrorAction, PlayMenuAction } from "../../actions/sounds";
import { OpenHintsAction } from "../../actions/user";
import { OpenSettingsAction } from "../../actions/user";
import { UserWonAction } from "../../actions/user";
import { AddCharacterAction } from "../../actions/answer";
import { TooManyCharacters } from "../../actions/answer";
import { ShuffleKeyboardAction } from "../../actions/levels";
import { RemoveCharacterAction } from "../../actions/answer";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public levels: Observable<LevelState>;
    public answer: Observable<KeyboardCharacter[]>;
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
                const slotsAnswer = state.answer.slots.filter(item => item.entered || item.isRevealed);
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
        this.store.dispatch(new RemoveCharacterAction(slot));
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
        this.store.dispatch(new ShuffleKeyboardAction());
    }

    private TooManyCharacters(): void {
        this.store.dispatch(new PlayErrorAction());
        this.store.dispatch(new TooManyCharacters())
    }

    private addCharacter(character: KeyboardCharacter): void {
        this.store.dispatch(new PlayClickAction());
        this.store.dispatch(new AddCharacterAction(character));
    }

    private checkAnswer(answer: string, slots: SolutionSlot[], character: KeyboardCharacter, level: Level): void {
        const entered = slots.map(slot => {
                if (slot.entered) {
                    return slot.entered.letter;
                }

                if (slot.isRevealed) {
                    return slot.letter;
                }
            }).join('') + character.letter;

        if(entered === answer) {
            this.store.dispatch(new UserWonAction(level));

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
