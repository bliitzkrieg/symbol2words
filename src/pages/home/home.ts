import { Component } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Store } from "@ngrx/store";
import { LevelState } from "../../reducer/levels";
import { KeyboardCharacter, SolutionSlot } from "../../reducer/answer";
import * as fromRoot from '../../reducer';
import * as answer from '../../actions/answer';
import { UserState } from "../../reducer/user";
import { PlayClickAction, PlayErrorAction, PlayMenuAction } from "../../actions/sounds";
import { OpenHintsAction } from "../../actions/user";
import { OpenSettingsAction } from "../../actions/user";
import { AddCharacterAction } from "../../actions/answer";
import { TooManyCharactersAction } from "../../actions/answer";
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
                const slotsAnswer = state.answer.slots.filter(slot =>  slot.entered || slot.isRevealed ? true : false);
                answerWithoutSpaces.length === slotsAnswer.length ?
                    this.TooManyCharacters() : this.addCharacter(data.character);
            });
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
        this.store.dispatch(new TooManyCharactersAction())
    }

    private addCharacter(character: KeyboardCharacter): void {
        this.store.dispatch(new PlayClickAction());
        this.store.dispatch(new AddCharacterAction(character));
    }

}
