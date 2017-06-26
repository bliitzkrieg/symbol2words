import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AlertController } from 'ionic-angular';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import * as fromRoot from '../reducer';
import { ResetGameAction, GameResetAction } from "../actions/levels";
import { GAME_RESET, RESET_GAME_PROMPT } from "../reducer/levels";

@Injectable()
export class AlertEffects {
    constructor(private actions$: Actions, private alertCtrl: AlertController, private store: Store<fromRoot.State>) { }

    @Effect()
    alert$: Observable<Action> = this.actions$
        .ofType(RESET_GAME_PROMPT, GAME_RESET)
        .switchMap(({ type }) => {
            switch (type) {
                case RESET_GAME_PROMPT:
                    this.confirmResetGamePrompt();
                    break;
                case GAME_RESET:
                    this.gameReset();
            }

            return empty();
        });

    private confirmResetGamePrompt(): void {
        let confirm = this.alertCtrl.create({
            title: 'Reset Game',
            message: 'Are you sure you want to reset the game? You do not lose your diamonds.',
            buttons: [
                {
                    text: 'No',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.store.dispatch(new ResetGameAction());
                        window.setTimeout(() => {
                            this.store.dispatch(new GameResetAction());
                        }, 100);
                    }
                }
            ]
        });

        confirm.present();
    }

    private gameReset(): void {
        let alert = this.alertCtrl.create({
            title: 'Game Reset',
            subTitle: 'Your game has been reset.',
            buttons: ['Ok']
        });
        alert.present();
    }
}