import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { empty } from 'rxjs/observable/empty';
import * as fromRoot from '../reducer';
import { HIDE_LETTER, RESET_GAME } from '../reducer/levels';
import { TOGGLE_MUTE } from '../reducer/user';
import { REVEAL_SLOT_FINISHED, SolutionSlot } from '../reducer/answer';

@Injectable()
export class PersistEffects {
    constructor(private actions$: Actions, private storage: Storage, private store: Store<fromRoot.State>) { }

    @Effect()
    persist$: Observable<Action> = this.actions$
        .ofType(RESET_GAME, TOGGLE_MUTE, HIDE_LETTER, REVEAL_SLOT_FINISHED)
        .withLatestFrom(this.store)
        .switchMap(([action, state]) => {
            switch (action.type) {
                case RESET_GAME:
                    this.storage.set('appData', {
                        level: 1,
                        coins: state.user.coins,
                        isMuted: state.user.isMuted,
                        hidden: 0,
                        revealed: []
                    });
                    break;
                case HIDE_LETTER:
                    this.storage.set('appData', {
                        level: state.levels.current.level,
                        coins: state.user.coins,
                        isMuted: state.user.isMuted,
                        hidden: state.levels.keyboard.filter(key => key.hidden).length + 1,
                        revealed: this.getRevealed(state.answer.slots)
                    });
                    break;
                case REVEAL_SLOT_FINISHED:
                case TOGGLE_MUTE:
                    this.storage.set('appData', {
                        level: state.levels.current.level,
                        coins: state.user.coins,
                        isMuted: state.user.isMuted,
                        hidden: state.levels.keyboard.filter(key => key.hidden).length,
                        revealed: this.getRevealed(state.answer.slots)
                    });
                    break;
            }

            return empty();
        });

    private getRevealed = (slots: SolutionSlot[]) => slots.filter(slot => slot.isRevealed).map(item => item.id);
}