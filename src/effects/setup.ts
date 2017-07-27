import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Storage } from '@ionic/storage';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INITIALIZE_APP } from '../reducer/user';
import { HideCharacterAction, SetLevelAction } from '../actions/levels';
import { SetUserAction } from '../actions/user';
import * as fromRoot from '../reducer';
import { CreateSlots, RevealCharacterAtIndexAction } from '../actions/answer';

@Injectable()
export class SetupEffects {
    constructor(private actions$: Actions, private storage: Storage, private store: Store<fromRoot.State>) { }

    @Effect()
    setup$: Observable<any> = this.actions$
        .ofType(INITIALIZE_APP)
        .withLatestFrom(this.store)
        .mergeMap(([, state]) => this.storage.get('appData')
            .then(data => {
                if (!data) {
                    this.storage.set('appData', {
                        level: 1,
                        coins: 100,
                        isMuted: false,
                        hidden: 0,
                        revealed: []
                    });

                    return empty();
                }

                const { coins, level, isMuted, hidden, revealed } = data;

                let hiddenActions = [];
                for (let i = 0; i < hidden; i++) {
                    hiddenActions = [...hiddenActions, new HideCharacterAction()];
                }

                const revealActions = revealed.map(index => new RevealCharacterAtIndexAction(index));

                return [
                    new SetLevelAction(level),
                    new CreateSlots(state.levels.levels[level].answer),
                    new SetUserAction({ coins, isMuted }),
                    ...hiddenActions,
                    ...revealActions
                ];
            }))
        .switchMap(data => data);
}