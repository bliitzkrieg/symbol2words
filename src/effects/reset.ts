import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RESET_GAME } from '../reducer/levels';
import * as fromRoot from '../reducer';
import { CreateSlots } from '../actions/answer';
import { PlayResetAction } from '../actions/sounds';

@Injectable()
export class ResetEffects {
    constructor(private actions$: Actions, private store: Store<fromRoot.State>) { }

    @Effect()
    reset$: Observable<any> = this.actions$
        .ofType(RESET_GAME)
        .withLatestFrom(this.store)
        .switchMap(([ , state]) => [
            new PlayResetAction(),
            new CreateSlots(state.levels.current.answer)
        ]);
}