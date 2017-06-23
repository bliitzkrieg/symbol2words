import { Component, Renderer2 } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CustomModal } from "../../misc/custom-modal";

@IonicPage()
@Component({
  selector: 'page-hint-modal',
  templateUrl: 'hint-modal.html',
})
export class HintModalPage extends CustomModal {

  constructor(public renderer: Renderer2,
              public viewCtrl: ViewController) {
      super(renderer, viewCtrl);
  }
}
