import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { PlayNextLevel } from '../../actions/sounds';
import * as fromRoot from '../../reducer';

@IonicPage()
@Component({
  selector: 'page-won-modal',
  templateUrl: 'won-modal.html'
})
export class WonModalPage {

  constructor(private viewCtrl: ViewController, private store: Store<fromRoot.State>) {
  }

  public dismiss(): void {
    this.store.dispatch(new PlayNextLevel());
    this.viewCtrl.dismiss();
  }

  public earnMore(): void {

  }

}
