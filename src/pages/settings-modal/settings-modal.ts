import { Component, Renderer2 } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CustomModal } from "../../misc/custom-modal";

@IonicPage()
@Component({
    selector: 'page-settings-modal',
    templateUrl: 'settings-modal.html',
})
export class SettingsModalPage extends CustomModal {

    constructor(public renderer: Renderer2,
                public viewCtrl: ViewController) {
        super(renderer, viewCtrl);
    }

}
