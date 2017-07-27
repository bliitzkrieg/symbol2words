import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import * as fromRoot from '../reducer';
import { ADD_CHARACTER, REVEAL_SLOT } from "../reducer/answer";
import { TooManyCharactersAction } from "../actions/answer";
import { UserWonAction } from "../actions/user";
import { PlayErrorAction } from "../actions/sounds";

@Injectable()
export class WinConditionEffects {

    constructor(private actions$: Actions, private store: Store<fromRoot.State>) { }

    @Effect()
    win$: Observable<Action> = this.actions$
        .ofType(ADD_CHARACTER, REVEAL_SLOT)
        .withLatestFrom(this.store)
        // first item in deconstruction is empty to suppress TS warning - Completely valid TS.
        .switchMap(([ , state]) => {
            const answer = state.levels.current.answer.replace(/\s/g, '');
            const input = state.answer.slots
                .filter(slot => slot.entered || slot.isRevealed ? true : false)
                .map(slot => slot.entered ? slot.entered.letter : slot.letter)
                .join('');

            if (answer.length !== input.length) return empty();

            if (answer === input) {
                return Observable.of(new UserWonAction(state.levels.current));
            }

            return [
                new PlayErrorAction(),
                new TooManyCharactersAction()
            ];
        });
}