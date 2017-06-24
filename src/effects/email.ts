import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Platform } from 'ionic-angular';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { EMAIL_SUPPORT } from "../reducer/user";
import { InAppBrowser } from "@ionic-native/in-app-browser";

const email = 'lucamatthewdecaprio@gmail.com';

@Injectable()
export class EmailEffects {
    constructor(private actions$: Actions,
                private platform: Platform,
                private iab: InAppBrowser) { }

    @Effect()
    email: Observable<Action> = this.actions$
        .ofType(EMAIL_SUPPORT)
        .map(toPayload)
        .switchMap(payload => {
            this.platform.ready().then(() => {
                const browser = this.iab.create(`mailto:${ email }`, '_system');
                browser.show();
            });

            return empty();
        });
}