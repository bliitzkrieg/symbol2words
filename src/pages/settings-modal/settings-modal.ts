import { Component, Renderer2 } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CustomModal } from "../../misc/custom-modal";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducer';
import { PlayMenuAction } from "../../actions/sounds";
import { EmailSupportAction, ToggleMuteAction } from "../../actions/user";
import { UserState } from "../../reducer/user";
import { Observable } from "rxjs/Rx";
import { ResetGamePromptAction } from "../../actions/levels";

@IonicPage()
@Component({
    selector: 'page-settings-modal',
    templateUrl: 'settings-modal.html',
})
export class SettingsModalPage extends CustomModal {
    public user: Observable<UserState>;

    constructor(public renderer: Renderer2,
                public viewCtrl: ViewController,
                private store: Store<fromRoot.State>) {
        super(renderer, viewCtrl);

        this.user = store.select('user');
    }

    public toggleMute(): void {
        this.store.dispatch(new ToggleMuteAction());
    }

    public resetGame(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new ResetGamePromptAction());
    }

    public email(): void {
        this.store.dispatch(new PlayMenuAction());
        this.store.dispatch(new EmailSupportAction());
    }

    public dismiss(): void {
        this.store.dispatch(new PlayMenuAction());
        this.viewCtrl.dismiss();
    }
}
