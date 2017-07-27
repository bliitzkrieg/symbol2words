import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ModalController } from 'ionic-angular';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import * as fromRoot from '../reducer';
import { USER_WON } from "../reducer/user";
import { WonModalPage } from "../pages/won-modal/won-modal";
import { ResetAnswerAction, CreateSlots } from "../actions/answer";
import { IncrementLevelAction } from "../actions/levels";

@Injectable()
export class WonEffects {
    constructor(private actions$: Actions,
                private modalCtrl: ModalController,
                private store: Store<fromRoot.State>,
                private storage: Storage) { }

    @Effect()
    won$: Observable<Action> = this.actions$
        .ofType(USER_WON)
        .withLatestFrom(this.store)
        .map(([action, state]) => {
            let modal = this.modalCtrl.create(WonModalPage, { level: action.payload });
            modal.present();

            this.storage.set('appData', {
                level: state.levels.current.level + 1,
                coins: state.user.coins,
                isMuted: state.user.isMuted,
                hidden: 0,
                revealed: []
            });

            return state;
        })
        .debounceTime(300)
        .switchMap((state: fromRoot.State) => {
            const current = state.levels.current.level;
            return [
                new ResetAnswerAction(),
                new IncrementLevelAction(),
                new CreateSlots(state.levels.levels[current + 1].answer)
            ]
        });
}