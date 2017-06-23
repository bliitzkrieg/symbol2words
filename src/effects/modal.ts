import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ModalController } from 'ionic-angular';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { OPEN_HINTS, OPEN_SETTINGS } from "../reducer/user";
import { SettingsModalPage } from "../pages/settings-modal/settings-modal";
import { HintModalPage } from "../pages/hint-modal/hint-modal";

@Injectable()
export class ModalEffects {
    constructor(private actions$: Actions, private modalCtrl: ModalController) { }

    @Effect()
    modal$: Observable<Action> = this.actions$
        .ofType(OPEN_HINTS, OPEN_SETTINGS)
        .switchMap(({ type }) => {
            let page;
            switch (type) {
                case OPEN_HINTS:
                    page = HintModalPage;
                    break;
                case OPEN_SETTINGS:
                    page = SettingsModalPage;
                    break;
                default:
                    page = SettingsModalPage;
            }
            const modal = this.modalCtrl.create(page, {}, {
                enterAnimation: 'modal-pop-in-enter',
                leaveAnimation: 'modal-pop-out-leave'
            });
            modal.present();

            return empty();
        });
}