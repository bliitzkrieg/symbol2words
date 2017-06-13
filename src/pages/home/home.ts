import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController) {

  }

  public doTap(char): void {
    this.howl.play();
    this.stack.push(char);
  }

  public removeChar(char): void {
    this.howl.play();
    this.stack = this.stack.filter(i => i !== char);
  }

}
