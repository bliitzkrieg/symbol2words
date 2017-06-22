import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { Vibration } from "@ionic-native/vibration";
import * as fromRoot from '../reducer';
import { PLAY_CLICK, PLAY_ERROR, PLAY_MENU } from "../reducer/sounds";
import { Howl } from 'howler';

@Injectable()
export class SoundEffects {

    private click = new Howl({
        src: ['./assets/audio/Multi_wav/UI_multi_16.wav']
    });

    private error = new Howl({
        src: ['./assets/audio/Multi_wav/UI_multi_24.wav']
    });

    private menu = new Howl({
        src: ['./assets/audio/Single_wav/UI_single_11.wav']
    });

    constructor(private actions$: Actions, private vibration: Vibration, private store: Store<fromRoot.State>) { }

    @Effect()
    sounds$: Observable<Action> = this.actions$
        .ofType(PLAY_CLICK, PLAY_ERROR, PLAY_MENU)
        .withLatestFrom(this.store.select(state => state.user))
        .switchMap(([action, user]) => {
            if (user.isMuted) return empty();

            this.vibration.vibrate(50);
            switch(action.type) {
                case PLAY_CLICK:
                    this.click.play();
                    break;
                case PLAY_ERROR:
                    this.error.play();
                    break;
                case PLAY_MENU:
                    this.menu.play();
                    break;
                default:
                    return empty();
            }
            return empty();
        });
}