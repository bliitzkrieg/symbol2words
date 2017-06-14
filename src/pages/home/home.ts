import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { Howl } from 'howler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private howl = new Howl({
    src: ['./assets/audio/click.mp3']
  });

  public stack = [];

  constructor(public navCtrl: NavController, private vibration: Vibration) {

  }

  public doTap(char): void {
    this.vibration.vibrate(5);
    this.howl.play();
    this.stack.push(char);
  }

  public removeChar(char): void {
    this.vibration.vibrate(5);
    this.howl.play();
    this.stack = this.stack.filter(i => i !== char);
  }

}
