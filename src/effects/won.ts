import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ModalController } from 'ionic-angular';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { USER_WON } from "../reducer/user";
import { WonModalPage } from "../pages/won-modal/won-modal";

@Injectable()
export class WonEffects {
    constructor(private actions$: Actions, private modalCtrl: ModalController) { }

    @Effect()
    won$: Observable<Action> = this.actions$
        .ofType(USER_WON)
        .map(toPayload)
        .switchMap(payload => {
            let modal = this.modalCtrl.create(WonModalPage, { level: payload });
            modal.present();

            return empty();
        });
}