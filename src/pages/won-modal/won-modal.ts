import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-won-modal',
  templateUrl: 'won-modal.html',
})
export class WonModalPage {

  constructor(private viewCtrl: ViewController) {
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  public earnMore(): void {

  }

}
